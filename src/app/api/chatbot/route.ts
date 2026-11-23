import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import ES_DATA from '../../../messages/es.json';
import EN_DATA from '../../../messages/en.json';
import {
  consumeRateLimit,
  nextChatUsage,
  RATE_LIMIT_MAX_MESSAGES,
  RATE_LIMIT_WINDOW_MS,
  sanitizeConversationId,
  validateChatMessage,
  type RateRecord
} from '@/lib/chat-guard';
import { openUsage, sealUsage } from '@/lib/chat-seal';
import { consumeSharedWindow } from '@/lib/chat-upstash';

/**
 * The Map is only a fallback when there is no signing secret and no Upstash.
 * It does not survive across serverless isolates. The signed cookie does,
 * and an optional Upstash counter does too. A Vercel Firewall rate-limit
 * rule is still the limit a client cannot skip by dropping cookies.
 */
const rateLimitMap = new Map<string, RateRecord>();

const USAGE_COOKIE = 'kc_chat';

function portfolioContext(locale: 'en' | 'es') {
  const data = locale === 'en' ? EN_DATA : ES_DATA;

  return JSON.stringify({
    about: data.AboutMe,
    experience: data.Experience,
    projects: data.Projects.cards.map((card) => ({
      title: card.title,
      description: card.description,
      link: card.link,
      tech: card.tech
    })),
    assistant: {
      intro: data.Chatbot.intro,
      personal: data.Chatbot.personal,
      contact: data.Chatbot.contact,
      contact2: data.Chatbot.contact2,
      skills: data.Chatbot.skills,
      experience: data.Chatbot.experience
    }
  });
}

function clientIp(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}

function withUsageCookie(
  response: NextResponse,
  sealedUsage: string | null,
  req: NextRequest
) {
  if (!sealedUsage) return response;
  const secure =
    req.nextUrl.protocol === 'https:' ||
    req.headers.get('x-forwarded-proto') === 'https';
  response.cookies.set(USAGE_COOKIE, sealedUsage, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
    secure
  });
  return response;
}

export async function POST(req: NextRequest) {
  let body: { message?: unknown; locale?: unknown; conversationId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_message' }, { status: 400 });
  }

  const validation = validateChatMessage(body.message);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const ip = clientIp(req);
  const shared = await consumeSharedWindow({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    key: `chat:${ip}`,
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX_MESSAGES
  });
  if (shared === 'deny') {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
  }

  const secret = process.env.CHAT_LIMIT_SECRET || process.env.GEMINI_API_KEY;
  let sealedUsage: string | null = null;
  if (secret) {
    const current = openUsage(
      req.cookies.get(USAGE_COOKIE)?.value ?? '',
      secret
    );
    const decision = nextChatUsage(
      current,
      sanitizeConversationId(body.conversationId),
      Date.now()
    );
    if (!decision.ok) {
      return NextResponse.json(
        {
          error:
            decision.reason === 'conversation' ? 'conversation' : 'rate_limit'
        },
        { status: 429 }
      );
    }
    sealedUsage = sealUsage(decision.usage, secret);
  } else if (shared !== 'allow') {
    const allowed = consumeRateLimit(rateLimitMap, ip, Date.now());
    if (!allowed) {
      return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const missing = NextResponse.json(
      { error: 'unconfigured' },
      { status: 503 }
    );
    return withUsageCookie(missing, sealedUsage, req);
  }

  const currentLocale = body.locale === 'en' ? 'en' : 'es';

  try {
    const client = new GoogleGenAI({ apiKey });
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      config: {
        systemInstruction: {
          parts: [
            {
              text: `
                You are a virtual assistant for Kevin Corman's portfolio.
                CONTEXT:
                ${portfolioContext(currentLocale)}
                RULES:
                1. Answer ONLY based on the context.
                2. If a field is missing, say you don't have that information.
                3. Do not invent an email address, phone number, or project URL.
                4. Contact channels in the context are LinkedIn and GitHub only.
                5. Respond in ${currentLocale === 'es' ? 'Spanish' : 'English'}.
              `
            }
          ]
        }
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: validation.value }]
        }
      ]
    });

    const responseText =
      response.text ||
      (currentLocale === 'es'
        ? 'Lo siento, no pude generar una respuesta.'
        : 'Sorry, I could not generate a response.');

    return withUsageCookie(
      NextResponse.json({ response: responseText }),
      sealedUsage,
      req
    );
  } catch {
    console.error('Chatbot request failed');
    return withUsageCookie(
      NextResponse.json({ error: 'upstream' }, { status: 500 }),
      sealedUsage,
      req
    );
  }
}
