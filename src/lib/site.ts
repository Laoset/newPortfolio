export const SITE_URL = 'https://kevincorman.com';

export const locales = ['en', 'es'] as const;

export type SiteLocale = (typeof locales)[number];

export function absoluteLocaleUrl(locale: string) {
  return `${SITE_URL}/${locale}`;
}

export function buildSitemap() {
  const languages = {
    en: absoluteLocaleUrl('en'),
    es: absoluteLocaleUrl('es'),
    'x-default': absoluteLocaleUrl('en')
  };

  return locales.map((locale) => ({
    url: absoluteLocaleUrl(locale),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages
    }
  }));
}

export function buildRobots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alan Kevin Corman Samanamud',
    alternateName: 'Kevin Corman',
    url: SITE_URL,
    image: `${SITE_URL}/avatar.png`,
    jobTitle: 'Software Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Puntospoint'
    },
    birthPlace: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lima',
        addressCountry: 'PE'
      }
    },
    homeLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Buenos Aires',
        addressCountry: 'AR'
      }
    },
    sameAs: [
      'https://www.linkedin.com/in/kevin-corman-samanamud/',
      'https://github.com/Laoset'
    ]
  };
}
