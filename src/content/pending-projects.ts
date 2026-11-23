export type PendingProject = {
  id: string;
  title: string;
  description: string;
  link: string;
  github: string;
  npm: string;
  tech: string[];
  image: string;
  source: string;
  missing: string[];
};

/**
 * No se renderiza.
 *
 * La experiencia en Muvinai menciona un SaaS de personal/eventos y una
 * librería de TypeScript publicada en NPM. En el repo no hay nombre, URL
 * ni paquete verificables, así que quedan vacíos a propósito.
 *
 * Para publicarlos:
 * 1. Completar el objeto (sin inventar la URL).
 * 2. Copiar una card a `Projects.cards` en `src/messages/es.json` y `en.json`.
 *    Forma: { title, description, link, github, tech, image }.
 * 3. Guardar la captura en `public/projects/<archivo>.png` y usar esa ruta
 *    en `image` (o `null` si no hay imagen).
 */
export const pendingMuvinaiProjects: PendingProject[] = [
  {
    id: 'muvinai-events-saas',
    title: '',
    description: '',
    link: '',
    github: '',
    npm: '',
    tech: [],
    image: '',
    source:
      'Experiencia Muvinai: SaaS para gestionar personal y eventos desde un backoffice.',
    missing: [
      'Nombre del producto',
      'Descripción corta en español y en inglés',
      'URL pública, o aclarar que es privado',
      'Repositorio',
      'Stack verificado',
      'Captura en public/projects/'
    ]
  },
  {
    id: 'muvinai-schedule-npm',
    title: '',
    description: '',
    link: '',
    github: '',
    npm: '',
    tech: [],
    image: '',
    source:
      'Experiencia Muvinai: librería TypeScript de horarios y eventos, publicada en NPM.',
    missing: [
      'Nombre del paquete en npm',
      'URL de npmjs.com',
      'Repositorio',
      'Descripción corta en español y en inglés',
      'Stack además de TypeScript, si corresponde',
      'Captura, o dejar image en null'
    ]
  }
];
