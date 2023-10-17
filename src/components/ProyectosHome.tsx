import React, { useEffect } from "react";
import { portfolios } from "@/utils/ProyectsTorender";
import { IconCode, IconArrowRight } from "@tabler/icons-react";
import { animate, inView } from "motion";

const ProyectosHome = ({ isEnglish }: { isEnglish: boolean }) => {
  useEffect(() => {
    inView("#projects", () => {
      animate(
        "#projects",
        { scale: [0, 1], opacity: [0, 1] },
        { delay: 0.2, duration: 1 }
      );
    });
  });
  return (
    <section
      id="projects"
      className=" py-4 lg:py-10 px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[16rem] 4xl:px-[23rem] flex flex-col justify-center h-screen  dark:text-[#eeeeee]"
    >
      <div>
        <h3 className="lg:text-4xl text-3xl font-bold mb-16">
          <span className="text-3xl">{"<"} </span>
          {isEnglish ? "Projects" : "Proyectos"}
          <span className="text-3xl ml-1">{"/>"}</span>
        </h3>
        <div className="flex flex-col justify-between  lg:gap-4">
          <div className="flex flex-row justify-between">
            <p className="text-xl mb-4">
              {isEnglish
                ? "These are my completed projects, I look forward to your feedback!"
                : "Estos son mis proyectos concluidos, ¡espero tu feedback!"}
            </p>
            <p>
              {isEnglish ? (
                <a
                  href="https://github.com/Laoset"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <button className="px-2 py-1 rounded-md bg-[#6D67E4]  text-[#FFFFFF] hover:bg-opacity-80 transition-colors">
                    View More
                  </button>
                </a>
              ) : (
                <a
                  href="https://github.com/Laoset"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <button className="px-2 py-1 rounded-md bg-[#6D67E4]  text-[#FFFFFF] hover:bg-opacity-80 transition-colors">
                    Ver más
                  </button>
                </a>
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-y-9 gap-x-3 3xl:gap-x-6 justify-center">
            {portfolios.map((item) => {
              if (
                item.id === 1 ||
                item.id === 2 ||
                item.id === 3 ||
                item.id === 7 ||
                item.id === 5 ||
                item.id === 6
              ) {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between 2xl:max-w-[350px] max-w-[350px] 3xl:max-w-[400px]  rounded-lg card dark:text-black"
                  >
                    <div className="flex flex-col justify-evenly py-2">
                      <div className="flex flex-row justify-evenly ">
                        <a href={item.code} target="_blank" aria-label="GitHub">
                          <IconCode
                            size={24}
                            className="hover:text-[#6D67E4] transition-colors"
                          />
                        </a>
                        <p className="text-lg font-bold cursor-default">
                          {item.title}
                        </p>
                        <a href={item.href} target="_blank">
                          <IconArrowRight
                            size={24}
                            className="hover:text-[#6D67E4] transition-colors"
                            aria-label="Website"
                          />
                        </a>
                      </div>
                      <div className="px-6 py-4">
                        <p className="text-base cursor-default">
                          {isEnglish ? item.parrafoEng : item.parrafo}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row flex-wrap gap-4 px-6 pt-4 pb-4">
                      {item.tech?.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-200 rounded-full text-sm font-semibold text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          {/* <div className="flex flex-row flex-wrap gap-y-9 gap-x-3 3xl:gap-x-6 justify-center">
            {portfolios.map((item) => {
              if (
                item.id === 1 ||
                item.id === 2 ||
                item.id === 3 ||
                item.id === 7 ||
                item.id === 5 ||
                item.id === 6
              ) {
                return (
                  <div className="flex flex-col justify-between 2xl:max-w-[350px] max-w-[350px] 3xl:max-w-[300px] rounded-lg card dark:text-black">
                    <div className="flex flex-col justify-evenly py-2">
                      <div className="flex flex-row justify-evenly ">
                        <a href={item.code} target="_blank">
                          <IconCode
                            size={24}
                            className="hover:text-[#6D67E4] transition-colors"
                          />
                        </a>
                        <p className="text-lg font-bold cursor-default">
                          {item.title}
                        </p>
                        <a href={item.href} target="_blank">
                          <IconArrowRight
                            size={24}
                            className="hover:text-[#6D67E4] transition-colors"
                          />
                        </a>
                      </div>
                      <div className="px-6 py-4">
                        <p className="text-base cursor-default">
                          {isEnglish ? item.parrafoEng : item.parrafo}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row flex-wrap gap-4 px-6 pt-4 pb-4">
                      {item.tech?.map((tech) => (
                        <span className="px-2 py-1 bg-gray-200 rounded-full text-sm font-semibold text-gray-700 ">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }
            })}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProyectosHome;
