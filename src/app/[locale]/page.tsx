import { Footer, Navbar, Aboutme, ProyectosHome, ChatBot } from '@/components';
import MainContextAlter from '../../components/MainContextAlter';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='sectionWrapper overflow-hidden'>
        <MainContextAlter />
        <Aboutme />
        <ProyectosHome />
        <ChatBot />
      </main>
      <Footer />
    </>
  );
}
