import { Footer, Navbar, Aboutme, ProyectosHome, ChatBot } from '@/components';
import MainContextAlter from '../../components/MainContextAlter';
import WorkingExperience from '@/components/WorkingExperience';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="sectionWrapper overflow-hidden">
        <MainContextAlter />
        <Aboutme />
        <WorkingExperience />
        <ProyectosHome />
        <ChatBot />
      </main>
      <Footer />
    </>
  );
}
