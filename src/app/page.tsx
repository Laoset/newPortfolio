"use client";
import { Footer, Navbar, Aboutme, ProyectosHome } from "@/components";
import { useState } from "react";
import MainContextAlter from "../components/MainContextAlter";

export default function Home() {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const handlerLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <main className="min-h-screen min-w-full flex flex-col dark:bg-[#1c1a27]">
      <Navbar handlerLanguage={handlerLanguage} isEnglish={isEnglish} />
      <MainContextAlter isEnglish={isEnglish} />
      <Aboutme isEnglish={isEnglish} />
      <ProyectosHome isEnglish={isEnglish} />
      <Footer isEnglish={isEnglish} />
    </main>
  );
}
