# Portfolio de Kevin Corman

Sitio personal en Next.js (App Router) con español e inglés (`next-intl`), Tailwind y deploy en Vercel. El dominio canónico es [https://kevincorman.com](https://kevincorman.com).

## Correr en local

Hace falta Node.js 22.13 o más nuevo. Vitest 5, que deja `npm audit` en cero, no corre en Node 20.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). La raíz redirige a `/en`. El español está en `/es`.

`GEMINI_API_KEY` solo hace falta para el chatbot. Sin esa variable el resto del sitio funciona y `POST /api/chatbot` responde 503. El modelo por defecto es `gemini-3.5-flash-lite`. Una clave nueva de AI Studio no puede usar `gemini-2.5-flash-lite`.

## Límite del chatbot

El chatbot tiene tres topes en código, y ninguno exige un servicio pago:

- Cada mensaje puede tener hasta 1000 caracteres.
- Cada conversación (una pestaña) puede mandar 8 mensajes. El servidor lo cuenta en una cookie firmada (`kc_chat`). La firma usa `CHAT_LIMIT_SECRET` si existe, y si no, `GEMINI_API_KEY`. Si faltan las dos, ese tope firmado no se aplica y el chat no llama a Gemini.
- Como red de respaldo, si no hay firma ni Redis, queda un contador en memoria del proceso. En Vercel eso no es un límite global.

Opcional, free tier de Upstash Redis, para un contador compartido entre instancias. Si faltan las variables o Redis no responde, el chat sigue con la cookie:

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Creá una base Redis en [Upstash](https://upstash.com) (plan free) y copiá la REST URL y el token. En Vercel: Project → Settings → Environment Variables. No hace falta para que el sitio abra.

Lo que sí conviene configurar en el dashboard, porque un script puede tirar la cookie y volver a empezar: una regla de rate limit del Firewall de Vercel. Está en todos los planes y no se puede declarar en `vercel.json` (ahí solo entran `deny` y `challenge`).

1. Vercel → el proyecto → Firewall → Configure → New Rule.
2. Condición: Request Path equals `/api/chatbot`.
3. Acción: Rate Limit, Fixed Window, 60 segundos, 20 requests, key IP, acción Too Many Requests (429).
4. Review Changes → Publish.

Eso corre en el edge, antes de la función, y no suma un servicio aparte.

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run lint` — ESLint
- `npm run test-commit` — tests (Vitest) una sola vez
- `npm run prettier` — formatea el repo

## Contenido pendiente

El logro de Puntospoint ya está en los mensajes. Los proyectos de Muvinai (SaaS y paquete NPM) no están inventados. La plantilla para sumarlos está en `src/content/pending-projects.ts`. Las capturas de proyectos van en `public/projects/` y se referencian desde `image` en `src/messages/es.json` y `src/messages/en.json`.
