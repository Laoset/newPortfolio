import React from "react";
import {
  IconBrandRedux,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandFigma,
  IconBrandGit,
  IconArrowRight,
} from "@tabler/icons-react";
import { sobremi } from "@/utils/TextAboutme";
import { Aside, MarqueeComponent } from ".";
const Aboutme = ({ isEnglish }: { isEnglish: boolean }) => {
  return (
    <section
      id="aboutme"
      className="flex flex-col justify-center h-screen dark:text-[#eeeeee]"
    >
      <div>
        <h3 className="text-4xl font-bold mb-16">
          <span className="text-3xl">{"<"} </span>
          {isEnglish ? "About me" : "Sobre mí"}
          <span className="text-3xl ml-1">{"/>"}</span>
        </h3>
        <div className="flex flex-col justify-between gap-10">
          {/* INTRODUCCION */}
          <div className="flex flex-col gap-10 justify-between ">
            <p className="text-xl h-52">
              {isEnglish ? sobremi?.introEng : sobremi?.intro}
            </p>
          </div>
          {/* ESTUDIOS Y TRABAJO */}
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col gap-5 text-xl">
              <h3>{isEnglish ? "Studies" : "Estudios"}</h3>
              <ul className="list-disc">
                <li>
                  <p className="font-semibold mb-2">
                    Full Stack Web Developer -
                    <span className="text-lg ml-2 font-normal italic">
                      Henry Bootcamp, Argentina -
                    </span>
                    <span className="ml-2 font-normal text-gray-500">2022</span>
                  </p>
                </li>
                <li>
                  <p className="font-semibold mb-2">
                    Responsive Web Design -
                    <span className="text-lg ml-2 font-normal italic">
                      freeCodeCamp -
                    </span>
                    <span className="ml-2 font-normal text-gray-500">2022</span>
                  </p>
                </li>
                <li>
                  <p className="font-semibold mb-2">
                    {isEnglish ? "PC Technician -" : " Tecnico PC -"}
                    <span className="text-lg ml-2 font-normal italic">
                      Centro de Formación Profesional, Argentina -
                    </span>
                    <span className="ml-2 font-normal text-gray-500">2019</span>
                  </p>
                </li>
                <li>
                  <p className="font-semibold mb-2">
                    {isEnglish ? "Computer networks -" : "Redes Informáticas -"}
                    <span className="text-lg ml-2 font-normal italic">
                      EducacionIT , Argentina -
                    </span>
                    <span className="ml-2 font-normal text-gray-500">2018</span>
                  </p>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-around">
              <div className="text-xl flex flex-row items-center gap-10 justify-between ">
                <p className="flex flex-row items-center">
                  {isEnglish ? "You can find me at" : "Me podes encontrar en"}
                  <span className="ml-2">
                    <IconArrowRight size={25} />
                  </span>
                </p>
                <Aside />
              </div>
              <div className="text-xl flex flex-row items-center gap-10">
                <p className="flex flex-row items-center">
                  {isEnglish
                    ? "I use these technologies"
                    : "Manejo estas tecnologias"}
                  <span className="ml-2">
                    <IconArrowRight size={25} />
                  </span>
                </p>
                <div className="flex flex-row gap-2 justify-between">
                  <div className="relative group">
                    <IconBrandTypescript size={40} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      TypeScript
                    </div>
                  </div>
                  <div className="relative group">
                    <IconBrandReact size={40} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      React
                    </div>
                  </div>
                  <div className="relative group">
                    <IconBrandRedux size={40} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      Redux
                    </div>
                  </div>
                  <div className="relative group">
                    <IconBrandTailwind size={40} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      TailwindCSS
                    </div>
                  </div>
                  <div className="relative group">
                    <IconBrandGit size={40} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      GIT
                    </div>
                  </div>
                  <div className="relative group">
                    <IconBrandFigma size={40} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      Figma
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* CONTACT ICONS */}
        </div>
      </div>
    </section>
  );
};

export default Aboutme;