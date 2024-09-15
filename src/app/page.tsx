'use client';
import { Footer, Navbar, Aboutme, ProyectosHome, ChatBot } from '@/components';
import { useState } from 'react';
import MainContextAlter from '../components/MainContextAlter';

export default function Home() {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const handlerLanguage = () => {
    setIsEnglish(!isEnglish);
  };
  return (
    <main className='min-h-screen min-w-full flex flex-col dark:from-[#030a14] dark:to-[#161b21] bg-gradient-to-b from-[#f8f7fe] to-[#e0e0e0]'>
      <Navbar handlerLanguage={handlerLanguage} isEnglish={isEnglish} />
      <MainContextAlter isEnglish={isEnglish} />
      <Aboutme isEnglish={isEnglish} />
      <ProyectosHome isEnglish={isEnglish} />
      <Footer isEnglish={isEnglish} />
      <ChatBot isEnglish={isEnglish} />
    </main>
  );
}
