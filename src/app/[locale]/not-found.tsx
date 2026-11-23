'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import es from '@/messages/es.json';
import en from '@/messages/en.json';

export default function NotFound() {
  const pathname = usePathname() ?? '';
  const locale = pathname.startsWith('/es') ? 'es' : 'en';
  const copy = locale === 'es' ? es.NotFound : en.NotFound;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="title text-[2.5rem] text-shadow-pink sm:text-[4rem]">
        {copy.title}
      </h1>
      <Link
        href={`/${locale}`}
        className="text-lg underline-offset-4 hover:underline"
      >
        {copy.back}
      </Link>
    </main>
  );
}
