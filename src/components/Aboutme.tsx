import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { SiMui,SiJavascript,SiTailwindcss,SiJira,SiFigma ,SiRedux,SiReact,SiGithub  } from "react-icons/si";
import { sobremi } from "@/utils/TextAboutme";
import { Aside } from ".";
import { animate, inView } from "motion";
const Aboutme = ({ isEnglish }: { isEnglish: boolean }) => {
const reactAdminImg = "/reactadminlogo.png";

  useEffect(() => {
    inView("#aboutme", () => {
      animate(
        "#aboutme",
        { scale: [0, 1], opacity: [0, 1] },
        { delay: 0.2, duration: 1 }
      );
    });
  });
  return (
    <section
      id="aboutme"
      className="scroll-mt-[4.75rem] px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[16rem] 4xl:px-[23rem] flex flex-col justify-center tall:h-screen h-auto tall:py-0 py-20 dark:text-[#bbb]"
    >
      <div>
        <h3 className="lg:text-4xl text-3xl font-bold m:mb-16 mb-4 dark:text-[#ddd]">
          <span className="text-3xl">{"<"} </span>
          {isEnglish ? "About me" : "Sobre mí"}
          <span className="text-3xl ml-1">{"/>"}</span>
        </h3>
        <div className="flex flex-col justify-between gap-4 m:gap-60 xs:gap-48 sm:gap-28 lg:gap-14 2xl:gap-10">
          {/* INTRODUCCION */}
          <div className="flex flex-col gap-10 justify-between ">
           {isEnglish? 
           <p className="m:text-[21px] m:h-52 h-auto">
              👋 Welcome! I am Alan Kevin Corman Samanamud and, from a very young age, I was fortunate enough to have a personal computer on which I spent hours and hours taking apart piece by piece, trying to understand its functioning, which generated in me a love for <strong className="text-[#BB2649]">technology</strong> that never stopped growing. Life took me on a professional career very far removed from the world of technology, but it gave me many personal skills and satisfaction. Until I discovered the world of <strong  className="text-[#BB2649]">programming</strong>, which I fell in love with from the first moment I coded my first
              <span className="ml-1 p-1 relative bg-[#BB2649] hover:scale-110 transform transition-transform duration-300 inline-block rotate-2 text-white">
                {sobremi?.introEng.highlight}
              </span>
           </p>
            :
            <p className="m:text-[21px] m:h-52 h-auto">
               👋 ¡Bienvenid@s! Soy Alan Kevin Corman Samanamud y desde muy temprana edad, fui afortunado al tener una computadora personal en la que pasaba horas y horas desmontando pieza por pieza, tratando de entender su funcionamiento, lo cual generó en mí un gusto por la <strong className="text-[#BB2649]">tecnología</strong> que nunca dejó de crecer. La vida me llevó por una carrera profesional muy alejada del mundo de la tecnología, pero me brindó muchas habilidades personales y satisfacción. Hasta que descubrí el mundo de la <strong className="text-[#BB2649]">programación</strong>, que me enamoró desde el momento en que programe mi primer
              <span className="ml-1 p-1 relative bg-[#BB2649] hover:scale-110 transform transition-transform duration-300 inline-block rotate-2 text-white">
                {sobremi?.intro.highlight}
              </span>
            </p>
            }
          </div>
          {/* ESTUDIOS */}
          <div className="flex flex-col xl:flex xl:flex-row justify-between m:gap-16 ">
            <div className="flex flex-col gap-2 m:gap-5 md:text-[21px]">
              <p className="text-2xl">{isEnglish ? "Studies" : "Estudios"}</p>
              <ul className="list-disc">
                <li>
                  <p className="font-medium mb-2">
                    Full Stack Web Developer -
                    <span className="text-lg ml-2 font-normal italic">
                      Henry Bootcamp, Argentina -
                    </span>
                    <span className="ml-2 font-normal text-gray-500">2022</span>
                  </p>
                </li>
                <li>
                  <p className="font-medium mb-2">
                    Responsive Web Design -
                    <span className="text-lg ml-2 font-normal italic">
                      freeCodeCamp -
                    </span>
                    <span className="ml-2 font-normal text-gray-500">2022</span>
                  </p>
                </li>
                <li>
                  <p className="font-medium mb-2">
                    {isEnglish ? "PC Technician -" : " Tecnico PC -"}
                    <span className="text-lg ml-2 font-normal italic">
                      Centro de Formación Profesional, Argentina -
                    </span>
                    <span className="ml-2 font-normal text-gray-500">2019</span>
                  </p>
                </li>
                <li>
                  <p className="font-medium mb-2">
                    {isEnglish ? "Computer networks -" : "Redes Informáticas -"}
                    <span className="text-lg ml-2 font-normal italic">
                      EducacionIT , Argentina -
                    </span>
                    <span className="ml-2 font-normal text-gray-500">2018</span>
                  </p>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-around m:gap-0 gap-4">
              <div className="md:text-[21px] flex flex-col md:flex-row items-center md:gap-10 justify-between ">
                <p className="flex flex-row items-center">
                  {isEnglish ? "You can find me at" : "Me podes encontrar en"}
                  <span className="ml-2">
                    <IoIosArrowForward size={25} />
                  </span>
                </p>
                <Aside isEnglish={isEnglish}/>
              </div>
              <div className="md:text-[21px] flex flex-col md:flex-row items-center md:gap-10 justify-between">
              <p className="flex flex-row items-center">
                  {isEnglish ? "I use these tools" : "Utilizo estas herramientas"}
                <span className="ml-2">
                    <IoIosArrowForward size={25} />
                  </span>
                </p>
                <div className="flex flex-row gap-2 justify-between">
                  <div className="relative group">
                    <SiGithub size={30} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      GIT
                    </div>
                  </div>
                  <div className="relative group">
                    <SiJira size={30} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      Jira
                    </div>
                  </div>
                  <div className="relative group">
                    <SiFigma size={30} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      Figma
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:text-[21px] flex flex-col md:flex-row items-center md:gap-10 justify-between">
                <p className="flex flex-row items-center">
                  {isEnglish
                    ? "I use these technologies"
                    : "Manejo estas tecnologias"}
                  <span className="ml-2">
                    <IoIosArrowForward size={25} />
                  </span>
                </p>
                <div className="flex flex-row gap-2 justify-between">
                  <div className="relative group">
                    <SiJavascript size={30} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      JavaScript
                    </div>
                  </div>
                  <div className="relative group">
                    <img src={reactAdminImg} alt="react admin" className="w-10 h-8"/>
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      React Admin
                    </div>
                  </div>
                  <div className="relative group">
                    <SiReact size={30} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      React
                    </div>
                  </div>
                  <div className="relative group">
                    <SiRedux size={30} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      Redux
                    </div>
                  </div>
                  <div className="relative group">
                    <SiMui size={30} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      MaterialUI
                    </div>
                  </div>
                  <div className="relative group">
                    <SiTailwindcss size={30} />
                    <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
                      TailwindCSS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
