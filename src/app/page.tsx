"use client";
import {
  Footer,
  Navbar,
  MainContent,
  Aboutme,
  Proyectos,
  ProyectosHome,
} from "@/components";
import { useState } from "react";
import MainContextAlter from "../components/MainContextAlter";
export default function Home() {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const handlerLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <main className="px-[19rem] min-h-screen min-w-full flex flex-col dark:bg-[#000000]">
      <Navbar handlerLanguage={handlerLanguage} isEnglish={isEnglish} />
      <MainContextAlter isEnglish={isEnglish} />
      <Aboutme isEnglish={isEnglish} />
      <ProyectosHome isEnglish={isEnglish} />
      {/* <Proyectos isEnglish={isEnglish} /> */}
      <Footer isEnglish={isEnglish} />
    </main>
  );
}
