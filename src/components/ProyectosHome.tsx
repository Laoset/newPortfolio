import React from "react";
import { portfolios } from "@/utils/ProyectsTorender";
import {
  IconCode,
  IconArrowRight,
  IconArrowBigRight,
} from "@tabler/icons-react";

const ProyectosHome = ({ isEnglish }: { isEnglish: boolean }) => {
  return (
    <section
      id="projects"
      className="flex flex-col justify-center h-screen dark:text-[#eeeeee]"
    >
      <div>
        <h3 className="text-4xl font-bold mb-16">
          <span className="text-3xl">{"<"} </span>
          {isEnglish ? "Projects" : "Proyectos"}
          <span className="text-3xl ml-1">{"/>"}</span>
        </h3>
        <div className="flex flex-col justify-between gap-10 ">
          <div className="flex flex-row justify-between">
            <p className="text-xl mb-4">
              {isEnglish
                ? "These are my completed projects, I look forward to your feedback!"
                : "Estos son mis proyectos concluidos, ¡espero tu feedback!"}
            </p>
            <p>
              {isEnglish ? (
                <a href="https://github.com/Laoset" target="_blank">
                  <button className="px-2 py-1 rounded-md bg-[#d36e70]  text-[#FFFFFF] hover:bg-opacity-80 transition-colors">
                    View More
                  </button>
                </a>
              ) : (
                <a href="https://github.com/Laoset" target="_blank">
                  <button className="px-2 py-1 rounded-md bg-[#d36e70]  text-[#FFFFFF] hover:bg-opacity-80 transition-colors">
                    Ver más
                  </button>
                </a>
              )}
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-10 w-full h-auto justify-center">
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
                  <div className="card dark:text-black">
                    <div className="flex flex-col justify-evenly py-2">
                      <div className="flex flex-row justify-evenly">
                        <a href={item.code} target="_blank">
                          <IconCode
                            size={24}
                            className="hover:text-[#d36e70] transition-colors"
                          />
                        </a>
                        <p className="text-lg font-bold cursor-default">
                          {item.title}
                        </p>
                        <a href={item.href} target="_blank">
                          <IconArrowRight
                            size={24}
                            className="hover:text-[#d36e70] transition-colors"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProyectosHome;
