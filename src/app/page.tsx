"use client";
import { Footer, Navbar, Aboutme, ProyectosHome, ChatBot } from "@/components";
import { useState } from "react";
import MainContextAlter from "../components/MainContextAlter";

export default function Home() {
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const handlerLanguage = () => {
    setIsEnglish(!isEnglish);
  };
  return (
    <>
      <Navbar handlerLanguage={handlerLanguage} isEnglish={isEnglish} />
      <main>
        <MainContextAlter isEnglish={isEnglish} />
        <Aboutme isEnglish={isEnglish} />
        <ProyectosHome isEnglish={isEnglish} />
        <ChatBot isEnglish={isEnglish} />
      </main>
      <Footer isEnglish={isEnglish} />
    </>
  );
}
