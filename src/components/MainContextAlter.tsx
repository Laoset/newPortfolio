import React, { useEffect, useState } from "react";
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
      className="scroll-mt-[4.75rem] py-28 3xl:py-0 px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[16rem] 4xl:px-[23rem]  flex flex-col lg:gap-4 4xl:gap-20 tall:h-screen h-auto text-black dark:text-[#ffedd5] "
    >
      <div className="flex flex-col text-center lg:mt-10 2xl:mt-14 3xl:mt-32">
        <h2 className="w-full title text-[2.5rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem] xl:text-[7rem] 3xl:text-[7.8rem] 4xl:text-[8rem]">
          <span className="text-shadow-pink">K</span>EVIN
          <span className="text-shadow-pink ml-3 lg:ml-10">C</span>ORMAN
        </h2>
        <h2 className="w-full title text-[2.2rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem] xl:text-[7rem] 2xl:text-[7.4rem] 3xl:text-[7.8rem] 4xl:text-[8rem]">
          {isEnglish ? (
            <>
              WEB DEVELOPER
            </>
          ) : (
            <>
              DESARROLLADOR WEB
            </>
          )}
        </h2>
      </div>
      <div className="md:h-32 xs:h-48 h-64 flex flex-col md:flex-row justify-between m:mt-24 mt-40 font-normal">
        <div className="lg:text-3xl 2xl:text-4xl text-lg xs:text-2xl md:text-4xl w-4/5 font-normal text-[#333333] dark:text-[#ffedd5]">
          {/* <TypeWritter isEnglish={isEnglish} /> */}
            {/* <div className="container">
            <div className="subContainer">
              <div className="hidden">{isEnglish ? 'Projects':'Proyectos'}</div>
              <p className=""></p>
            </div>
          </div> */}
        </div>
        <div className="w-20 flex flex-col items-center justify-center gap-1 self-center md:self-auto">
          <button onClick={() => scrollToSection("projects")}>
            <IconSquareRoundedArrowDownFilled
              size={40}
              className="hover:text-[#BB2649] transition-colors"
              aria-label="Scroll"
            />
          </button>
          <span className="sm:text-2xl text-[#333333] dark:text-[#ffedd5]">
            {isEnglish ? "Proyects" : "Proyectos"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
