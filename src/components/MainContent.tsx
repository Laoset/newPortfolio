import React from "react";
import { Aside, TypeWritter } from ".";

const MainContent = ({ isEnglish }: { isEnglish: boolean }) => {
  return (
    <section className="flex flex-col items-center h-screen gap-2">
      <div className="flex flex-col items-center justify-center gap-6 mt-56 ">
        <h2 className="text-8xl font-bold">KEVIN</h2>
        <h2 className="text-8xl font-bold">FRONT END DEVELOPER</h2>

        <div className="h-8 mb-5 text-xl">
          <TypeWritter />
        </div>
      </div>
      <button className="text-lg px-4 py-2 rounded-md bg-[#1C1CFF] text-[#FFFFFF] hover:bg-opacity-80 transition-opacity">
        Proyectos
      </button>
    </section>
  );
};

export default MainContent;
