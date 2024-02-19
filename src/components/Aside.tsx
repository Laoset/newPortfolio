import React from "react";
import { SiLinkedin, SiGithub, SiGmail } from "react-icons/si";

const Aside = ({ isEnglish }: { isEnglish: boolean }) => {
  return (
    <div className="flex flex-row gap-2 ">
      <div className="relative group">
        <a
          href="https://www.linkedin.com/in/kevin-corman-samanamud/"
          className="hover:text-[#BB2649] transition-colors"
          target="_blank"
          aria-label="LinkedIn"
        >
          <SiLinkedin size={30} />
        </a>
        <div className={`absolute hidden bg-gray-800 text-white ${isEnglish ? 'w-36' : 'w-48'} text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out`}>
          {isEnglish ? "Know more about me" : "Conoce un poco mas sobre mi"}
        </div>
      </div>
      <div className="relative group">
        <a
          href="https://github.com/Laoset"
          className="hover:text-[#BB2649] transition-colors"
          target="_blank"
          aria-label="GitHub"
        >
          <SiGithub size={30} />
        </a>
        <div className={`absolute hidden bg-gray-800 text-white ${isEnglish ? 'w-32' : 'w-48'} text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out`}>
          {isEnglish ? "Many projects here" : "Tengo muchos proyectos aqui"} 
        </div>
      </div>
      <div className="relative group">
      <a
        href="mailto:kevin143corman@gmail.com"
        className="hover:text-[#BB2649] transition-colors"
        aria-label="Email"
      >
        <SiGmail size={30} />
      </a>
        <div className={`absolute hidden bg-gray-800 text-white ${isEnglish ? 'w-24' : 'w-48'} text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out`}>
          {isEnglish ? "Contact me" : "Nos comunicamos por email ?"} 
        </div>
      </div>

    </div>
  );
};

export default Aside;
