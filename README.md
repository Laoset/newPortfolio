# Portfolio de Kevin Corman

Sitio personal en Next.js (App Router) con español e inglés (`next-intl`), Tailwind y deploy en Vercel. El dominio canónico es [https://kevincorman.com](https://kevincorman.com).

## Correr en local

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). La raíz redirige a `/en`. El español está en `/es`.

`GEMINI_API_KEY` solo hace falta para el chatbot. Sin esa variable el resto del sitio funciona y `POST /api/chatbot` responde 503.

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run lint` — ESLint
- `npm run test-commit` — tests (Vitest) una sola vez
- `npm run prettier` — formatea el repo

## Contenido pendiente

Los logros de Puntospoint (`workingKeys: null`) y los proyectos de Muvinai (SaaS y paquete NPM) no están inventados. La plantilla para sumarlos está en `src/content/pending-projects.ts`. Las capturas de proyectos van en `public/projects/` y se referencian desde `image` en `src/messages/es.json` y `src/messages/en.json`.
