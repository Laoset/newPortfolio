import '../globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { IBM_Plex_Mono, Onest } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale
} from 'next-intl/server';
import { SITE_URL, buildPersonJsonLd } from '@/lib/site';

const onestFont = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
  preload: true
});

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var dark=t?t==='dark':true;document.documentElement.classList.toggle('dark',dark);}catch(e){document.documentElement.classList.add('dark');}})();`;

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const path = `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: path,
      languages: {
        en: '/en',
        es: '/es',
        'x-default': '/en'
      }
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: path,
      siteName: 'Kevin Corman',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_AR'],
      type: 'website',
      images: [
        {
          url: '/avatar.png',
          width: 250,
          height: 250,
          alt: t('imageAlt')
        }
      ]
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
      images: ['/avatar.png']
    },
    robots: {
      index: true,
      follow: true
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [{ url: '/favicon.ico' }],
      apple: [{ url: '/android-chrome-192x192.png', sizes: '192x192' }]
    }
  };
}

export default async function RootLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const personJsonLd = buildPersonJsonLd();

  return (
    <html
      lang={locale}
      className="dark"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={`${onestFont.className} min-h-screen min-w-full flex flex-col dark:from-[#030a14] dark:to-[#161b21] bg-gradient-to-b from-[#f8f7fe] to-[#e0e0e0] ${ibmPlexMono.variable}`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c')
          }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
