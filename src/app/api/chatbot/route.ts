import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import ES_DATA from '../../../messages/es.json';
import EN_DATA from '../../../messages/en.json';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is missing');
}

const client = new GoogleGenAI({ apiKey });

// --- SISTEMA DE RATE LIMIT SIMPLIFICADO ---
// Almacena: IP -> { count: número de mensajes, lastMessage: fecha }
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// Configuración
const WINDOW_SIZE = 10 * 60 * 1000; // 10 minutos (en milisegundos)
const MAX_MESSAGES = 15; // Máximo de mensajes permitidos por ventana de 10 min

export async function POST(req: NextRequest) {
  try {
    // 1. OBTENER IP DEL USUARIO
    // En Vercel/Next.js, la IP real suele estar en 'x-forwarded-for'
    const ip = req.headers.get('x-forwarded-for') || 'ip-desconocida';

    const now = Date.now();
    const userRecord = rateLimitMap.get(ip);

    if (userRecord) {
      if (now - userRecord.lastReset > WINDOW_SIZE) {
        userRecord.count = 1;
        userRecord.lastReset = now;
      } else {
        userRecord.count++;

        if (userRecord.count > MAX_MESSAGES) {
          return NextResponse.json(
            {
              response:
                '⛔ You reached the maximum number of messages allowed. Please try again later.'
            },
            { status: 429 } // 429 = Too Many Requests
          );
        }
      }
    } else {
      // Usuario nuevo, lo registramos
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    }

    const { message, locale } = await req.json();

    const currentLocale = locale === 'en' ? 'en' : 'es';
    const data = currentLocale === 'en' ? EN_DATA : ES_DATA;
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      config: {
        systemInstruction: {
          parts: [
            {
              text: `
                You are a virtual assistant for Kevin Corman's portfolio.
                CONTEXT:
                About: ${data.AboutMe} 
                Projects: ${data.Projects}
                Skills: ${data.Experience} 
                Experience: ${data.Experience}
                RULES:
                1. Answer ONLY based on the context.
                2. Respond in ${currentLocale === 'es' ? 'Spanish' : 'English'}.
              `
            }
          ]
        }
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ]
    });

    const responseText =
      response.text || 'Lo siento, no pude generar una respuesta.';

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}
