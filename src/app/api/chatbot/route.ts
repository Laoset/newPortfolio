import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import ES_DATA from '../../../messages/es.json';
import EN_DATA from '../../../messages/en.json';
import {
  consumeRateLimit,
  validateChatMessage,
  type RateRecord
} from '@/lib/chat-guard';

/**
 * The counter lives in module memory. On Vercel each isolate has its own Map,
 * so this is a best-effort guard, not a global limit. A shared store would
 * need an external service. A no-cost alternative is a Vercel Firewall rule
 * on POST /api/chatbot, configured in the project dashboard.
 */
const rateLimitMap = new Map<string, RateRecord>();

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

export async function POST(req: NextRequest) {
  let body: { message?: unknown; locale?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_message' }, { status: 400 });
  }

  const validation = validateChatMessage(body.message);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const allowed = consumeRateLimit(rateLimitMap, clientIp(req), Date.now());
  if (!allowed) {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'unconfigured' }, { status: 503 });
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

    return NextResponse.json({ response: responseText });
  } catch {
    console.error('Chatbot request failed');
    return NextResponse.json({ error: 'upstream' }, { status: 500 });
  }
}
