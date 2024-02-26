"use client";
import { Footer, Navbar, Aboutme, ProyectosHome, ChatBot } from "@/components";
import { useEffect, useState } from "react";
import MainContextAlter from "../components/MainContextAlter";

export default function Home() {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const handlerLanguage = () => {
    setIsEnglish(!isEnglish);
  };
  return (
    <main className="min-h-screen min-w-full flex flex-col dark:bg-[#272325]">
      <Navbar handlerLanguage={handlerLanguage} isEnglish={isEnglish} />
      <MainContextAlter isEnglish={isEnglish} />
      <Aboutme isEnglish={isEnglish} />
      <ProyectosHome isEnglish={isEnglish} />
      <Footer isEnglish={isEnglish} />
      <ChatBot isEnglish={isEnglish} />
    </main>
  );
}
