import React, { useEffect, useState } from "react";
import { animate, stagger } from "motion";
import ProjectsCircle from "./ProjectsCircle";
const MainContent = ({ isEnglish }: { isEnglish: boolean }) => {
  const [shouldRenderCircle, setShouldRenderCircle] = useState(false);
  
  useEffect(() => {
    animate(
      "#main",
      { y: [70, 0], opacity: [0, 1] },
      { duration: 1.1, delay: stagger(1) }
    );
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldRenderCircle(true);
    }, 1000);
   
    return () => clearTimeout(timeoutId);
  }, []); 

  const renderCircle = () => {
    return <ProjectsCircle isEnglish={isEnglish} />;
  };

  return (
    <section
      id="main"
      className="scroll-mt-[4.75rem] py-0 3xl:pt-28 px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[16rem] 4xl:px-[23rem]  flex flex-col lg:gap-4 4xl:gap-20 tall:h-screen h-auto text-black dark:text-[#ffedd5] "
    >
      <div className="flex flex-col text-center lg:mt-10 2xl:mt-14 3xl:mt-32">
        <h2 className="w-full title text-[2.5rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem] xl:text-[7rem] 2xl:text-[6.5rem] 3xl:text-[7rem] 4xl:text-[8rem]">
          <span className="text-shadow-pink">K</span>EVIN
          <span className="text-shadow-pink ml-3 lg:ml-10">C</span>ORMAN
        </h2>
        <h2 className="w-full title text-[2.2rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem] xl:text-[7rem] 2xl:text-[6.5rem] 3xl:text-[7rem] 4xl:text-[8rem]">
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
      <div className="h-[150px] mt-0 w-full flex justify-center text-[#333333] dark:text-[#ffedd5]">
      {shouldRenderCircle && renderCircle()}
      </div>
    </section>
  );
};

export default MainContent;
