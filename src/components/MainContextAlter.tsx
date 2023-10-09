import React from "react";
import { Aside, TypeWritter } from ".";
import { IconSquareRoundedArrowDownFilled } from "@tabler/icons-react";
import { scrollToSection } from "@/utils/ScrollMovement";

const MainContent = ({ isEnglish }: { isEnglish: boolean }) => {
  return (
    <section
      id="main"
      className="flex flex-col gap-20 h-screen text-black dark:text-[#eeeeee]"
    >
      <div className="flex flex-col items-end mt-28">
        <h2 className="title">{isEnglish ? "Hello" : "Hola"}</h2>
        <h2 className="title">
          {isEnglish ? (
            <>
              I'm <span className="text-shadow-pink">K</span>evin Corman
            </>
          ) : (
            <>
              Soy <span className="text-shadow-pink">K</span>evin Corman
            </>
          )}
        </h2>
      </div>
      <div className="flex flex-row justify-between mt-16 font-normal">
        <p className="text-[2.5rem] w-4/5 font-normal text-[#333333]">
          <span className="text-[#d36e70] mr-3 font-bold">
            {isEnglish ? "Front End Developer" : "Desarrollador Front End"}
          </span>
          {isEnglish
            ? "who constantyle seeking out innovative solutions to everyday problems."
            : "que constantemente busca soluciones innovadoras para los problemas diarios."}
        </p>
        <div className="w-20 flex flex-col items-center justify-center gap-1">
          <button onClick={() => scrollToSection("projects")}>
            <IconSquareRoundedArrowDownFilled
              size={40}
              className="hover:text-[#d36e70] transition-colors"
            />
          </button>
          <span className="text-2xl text-[#333333]">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
