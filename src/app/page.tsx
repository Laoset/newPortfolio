"use client";
import { Footer, Navbar, Aboutme, ProyectosHome } from "@/components";
import { useEffect, useState } from "react";
import MainContextAlter from "../components/MainContextAlter";

export default function Home() {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const handlerLanguage = () => {
    setIsEnglish(!isEnglish);
  };
  const separteLetters = () => {
    let text = document.querySelector(".subContainer p");
    if (text instanceof HTMLElement) {
        text.innerHTML = text.innerText.split('').map((char:any, i:any) => `<span style="transform: rotate(${i * 8.3}deg)">${char}</span>`).join('');
    } 
  }
  useEffect(() => {
    separteLetters();
    
  },[])
  return (
    <main className="min-h-screen min-w-full flex flex-col dark:bg-[#272325]">
      <Navbar handlerLanguage={handlerLanguage} isEnglish={isEnglish} />
      <MainContextAlter isEnglish={isEnglish} />
      <Aboutme isEnglish={isEnglish} />
      <ProyectosHome isEnglish={isEnglish} />
      <Footer isEnglish={isEnglish} />
    </main>
  );
}
