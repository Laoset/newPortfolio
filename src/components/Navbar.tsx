import React, { useEffect, useState } from "react";
import { ElementsNavbar } from "@/utils/ElementsNavbar";
import {
  IconSunFilled,
  IconMoonFilled,
  IconWorld,
  IconMenu,
} from "@tabler/icons-react";
import { scrollToSection } from "@/utils/ScrollMovement";

const Navbar = ({
  isEnglish,
  handlerLanguage,
}: {
  isEnglish: boolean;
  handlerLanguage: () => void;
}) => {
  const [theme, setTheme] = useState<string>("light");
  const [modal, setModal] = useState<boolean>(false);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handlerTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const handlerMoveAndCloseModal = (item: any) => {
    setModal(!modal);
    scrollToSection(item);
  };
  return (
    <nav
      className={
        modal
          ? ""
          : "px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[16rem] 4xl:px-[19rem]"
      }
    >
      <div className="sticky top-0 flex flex-row justify-between items-center h-[4.75rem] border-b-[1.5px] border-gray-400 z-50 bg-[#fbfcfd] text-lg font-medium dark:bg-[#000000] dark:text-[#eeeeee] bg-gradient-conic  from-[#ffffff] to-[#fbfcfd] dark:bg-gradient-conic dark:from-black dark:to-black">
        <h1 className="xs:block hidden hover:animate-pulse hover:text-[#d36e70] transition-colors">
          #KC
        </h1>
        <div className="flex flex-row gap-4 ">
          {ElementsNavbar.map((item) => (
            <button
              onClick={() => scrollToSection(item.href)}
              key={item.id}
              className="hover-underline-animation text-base md:text-lg"
            >
              {"<"}
              {isEnglish ? item.nameEng : item.name}
              {"/>"}
            </button>
          ))}
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="xs:hidden">
            <IconMenu onClick={() => setModal(!modal)} />
          </div>
          {modal ? (
            <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-black gap-4">
              <p
                className="absolute top-4 right-4 text-xl text-white"
                onClick={() => setModal(!modal)}
              >
                X
              </p>
              {ElementsNavbar.map((item) => (
                <button
                  onClick={() => handlerMoveAndCloseModal(item.href)}
                  key={item.id}
                  className="hover-underline-animation text-lg text-white"
                >
                  {"<"}
                  {isEnglish ? item.nameEng : item.name}
                  {"/>"}
                </button>
              ))}
            </ul>
          ) : null}
          <div className="hidden xs:block">
            {theme === "light" ? (
              <button>
                <IconMoonFilled
                  className="hover:rotate-12  duration-300"
                  onClick={handlerTheme}
                />
              </button>
            ) : (
              <button>
                <IconSunFilled
                  className="hover:rotate-12  duration-300"
                  onClick={handlerTheme}
                />
              </button>
            )}
            <button>
              <IconWorld
                className="hover:rotate-12  duration-300"
                onClick={handlerLanguage}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
