import React from "react";
import { IconHeartCode } from "@tabler/icons-react";
const Footer = ({ isEnglish }: { isEnglish: boolean }) => {
  return (
    <footer
      id="footer"
      className="pt-20 lg:pt-4 px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[16rem] 4xl:px-[19rem]  flex flex-col justify-center items-center dark:text-[#eeeeee]"
    >
      <div className="text-lg flex flex-col justify-center items-center gap-4">
        <p>
          {isEnglish
            ? "Thank you for coming here, here is my CV so you can learn more about me."
            : "Gracias por llegar hasta aquí, te dejo mi CV para que conozcas más sobre mí."}
        </p>
        {isEnglish ? (
          <>
            <button className="w-44 p-2 rounded-md bg-[#A13032]  text-[#FFFFFF] hover:bg-opacity-80 transition-colors">
              Download Resume
            </button>
          </>
        ) : (
          <>
            <button className="w-40 p-2 rounded-md bg-[#A13032]  text-[#FFFFFF] hover:bg-opacity-80 transition-colors">
              Descargar CV
            </button>
          </>
        )}
      </div>
      <div className="flex flex-row gap-2 mt-10 mb-5  ">
        <p>{isEnglish ? "- Made with" : "- Hecho con"}</p>
        <span>
          <IconHeartCode color="#FF0000" />
        </span>
        <p>
          {isEnglish
            ? "by Alan Kevin Corman Samanamud-"
            : "por Alan Kevin Corman Samanamud-"}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
