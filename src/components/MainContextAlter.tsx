import React, { useEffect } from "react";
import { animate, stagger } from "motion";
import { IconSquareRoundedArrowDownFilled } from "@tabler/icons-react";
import { scrollToSection } from "@/utils/ScrollMovement";
import { TypeWritter } from ".";

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
      className="scroll-mt-[4.75rem] py-28 3xl:py-0 px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[16rem] 4xl:px-[23rem]  flex flex-col lg:gap-4 4xl:gap-20  h-screen text-black dark:text-[#eeeeee]"
    >
      <div className="flex flex-col lg:items-end text-right lg:mt-10 2xl:mt-14 3xl:mt-32">
        <h2 className="w-full title text-[2.5rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem] xl:text-[7rem] 3xl:text-[7.8rem] 4xl:text-[8rem]">
          {isEnglish ? "Hello" : "Hola"}
        </h2>
        <h2 className="w-full title text-[2.2rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem] xl:text-[7rem] 2xl:text-[7.4rem] 3xl:text-[7.8rem] 4xl:text-[8rem]">
          {isEnglish ? (
            <>
              <span className="sm:mr-10 mr-4">I'm</span>
              <span className="text-shadow-pink">K</span>evin
              <span className="text-shadow-pink ml-3 lg:ml-10">C</span>orman
            </>
          ) : (
            <>
              <span className="sm:mr-10 mr-4">Soy</span>
              <span className="text-shadow-pink">K</span>evin
              <span className="text-shadow-pink ml-3 lg:ml-10">C</span>orman
            </>
          )}
        </h2>
      </div>
      <div className="md:h-32 xs:h-48 h-64 flex flex-col md:flex-row justify-between m:mt-24 mt-40 font-normal">
        <div className="lg:text-[2rem] 2xl:text-[2.5rem] text-lg xs:text-[1.5rem] md:text-[2.3rem] w-4/5 font-normal text-[#333333] dark:text-[#eeeeee] ">
          <TypeWritter isEnglish={isEnglish} />
        </div>
        <div className="w-20 flex flex-col items-center justify-center gap-1 self-center md:self-auto">
          <button onClick={() => scrollToSection("projects")}>
            <IconSquareRoundedArrowDownFilled
              size={40}
              className="hover:text-[#6D67E4] transition-colors"
              aria-label="Scroll"
            />
          </button>
          <span className="sm:text-2xl text-[#333333] dark:text-[#eeeeee]">
            {isEnglish ? "Proyects" : "Proyectos"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
