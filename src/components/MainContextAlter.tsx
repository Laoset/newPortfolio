import React, { useEffect } from "react";
import { animate, stagger } from "motion";
import { IconSquareRoundedArrowDownFilled } from "@tabler/icons-react";
import { scrollToSection } from "@/utils/ScrollMovement";

const MainContent = ({ isEnglish }: { isEnglish: boolean }) => {
  useEffect(() => {
    animate(
      "#main",
      { y: [70, 0], opacity: [0, 1] },
      { duration: 1.1, delay: stagger(1) }
    );
  }, []);

  return (
    <section
      id="main"
      className="px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[16rem] 4xl:px-[19rem]  flex flex-col lg:gap-4 4xl:gap-20  h-screen text-black dark:text-[#eeeeee]"
    >
      <div className="flex flex-col lg:items-end  lg:mt-10 2xl:mt-14 4xl:mt-28">
        <h2 className="title  text-[3rem] sm:text-[5rem] lg:text-[6rem] xl:text-[8rem] 2xl:text-[9rem] 4xl:text-[10rem]">
          {isEnglish ? "Hello" : "Hola"}
        </h2>
        <h2 className="title  text-[3rem] sm:text-[5rem] lg:text-[6rem] xl:text-[8rem] 2xl:text-[9rem] 4xl:text-[10rem]">
          {isEnglish ? (
            <>
              <span className="mr-10">I'm</span>
              <span className="text-shadow-pink">K</span>evin
              <span className="text-shadow-pink ml-3 lg:ml-10">C</span>orman
            </>
          ) : (
            <>
              <span className="mr-10">Soy</span>
              <span className="text-shadow-pink">K</span>evin
              <span className="text-shadow-pink ml-3 lg:ml-10">C</span>orman
            </>
          )}
        </h2>
      </div>
      <div className="flex flex-row justify-between mt-14 font-normal">
        <p className="lg:text-[2rem] 2xl:text-[2.5rem] text-[1.5rem] md:text-[2.3rem] w-4/5 font-normal text-[#333333] dark:text-[#eeeeee]">
          <span className="text-[#d36e70] mr-3 font-bold">
            {isEnglish ? "Front End Developer" : "Desarrollador Front End"}
          </span>
          {isEnglish
            ? "that seeks creative solutions to everyday challenges."
            : "que busca soluciones creativas para los desafios diarios."}
        </p>
        <div className="w-20 flex flex-col items-center justify-center gap-1">
          <button onClick={() => scrollToSection("projects")}>
            <IconSquareRoundedArrowDownFilled
              size={40}
              className="hover:text-[#d36e70] transition-colors"
            />
          </button>
          <span className="text-2xl text-[#333333] dark:text-[#eeeeee]">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
