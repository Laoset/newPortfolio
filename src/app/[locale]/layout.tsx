import '../globals.css';
import type { Metadata } from 'next';
import { Poppins, IBM_Plex_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const poppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono'
});

export const metadata: Metadata = {
  title: 'Alan Kevin Corman Samanamud',
  description:
    'Portfolio of Alan Kevin Corman Samanamud, Frontend Developer from Argentina, Buenos Aires'
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { locale } = await params;

  const isValidLocale = routing.locales.includes(locale as any);
  if (!isValidLocale) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${poppinsFont.className} min-h-screen min-w-full flex flex-col dark:from-[#030a14] dark:to-[#161b21] bg-gradient-to-b from-[#f8f7fe] to-[#e0e0e0] ${ibmPlexMono.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
