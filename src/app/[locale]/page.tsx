import { Footer, Navbar, Aboutme, ProyectosHome, ChatBot } from '@/components';
import MainContextAlter from '@/components/MainContextAlter';
import WorkingExperience from '@/components/WorkingExperience';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="sectionWrapper overflow-hidden space-y-24">
        <MainContextAlter />
        <Aboutme />
        <WorkingExperience />
        <ProyectosHome />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
