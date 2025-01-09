import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in the environment variables');
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function getPortfolioContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const content = {
      about: $('#aboutme').text(),
      projects: $('#projects').text(),
      skills: $('#skills').text(),
      experience: $('#experience').text()
    };

    return `
        Información del Portfolio:
        
        Sobre mí:
        ${content.about}
        
        Proyectos:
        ${content.projects}
        
        Habilidades:
        ${content.skills}
        
        Experiencia:
        ${content.experience}
      `;
  } catch (error) {
    console.error('Error al obtener el contenido del portfolio:', error);
    return '';
  }
}
export async function POST(req: NextRequest) {
  try {
    const { message, locale } = await req.json();
    const portfolioUrl = `https://kevincorman.vercel.app/${locale}`;
    const portfolioContent = await getPortfolioContent(portfolioUrl);
    const prompt = `
      You are a virtual assistant specialized EXCLUSIVELY in providing information about the following portfolio.
      
      CONTEXT OF THE PORTFOLIO:
      ${portfolioContent}

      STRICT INSTRUCTIONS:
      1. you may ONLY answer questions related to the portfolio information provided above.
      2. If the question is not portfolio related:
         - If it is a greeting like "Hello", "Hi", "How are you?" in English or "Hola", "¿Qué tal?" in Spanish, respond politely in the same language.
         - Otherwise, answer ONLY: ${
           locale === 'es'
             ? '“Lo siento, solo puedo responder preguntas sobre el portafolio del autor. ¿Te gustaría saber algo específico sobre sus proyectos o habilidades?”'
             : "“Sorry, I can only answer questions about the author's portfolio. Would you like to know anything specific about their projects or skills?”"
         }
      3. Respond ONLY in the language of the question: ${
        locale === 'es' ? 'Spanish' : 'English'
      }
      4. You should not make up information that is not in the context provided.
      5. If you are asked about a specific project that is not in the portfolio, indicate that this project is not part of the current portfolio.
      6. Keep your answers focused exclusively on the projects, skills and technologies mentioned in the context.

      Question: "${message}"

      Respond to the above question in a friendly, detailed, and accurate manner. Keep your answers short and avoid repeating the user's words: 
    `;

    const result = await model.generateContent(prompt);
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    return NextResponse.json({ error: 'Error al procesar la solicitud.' });
  }
}
