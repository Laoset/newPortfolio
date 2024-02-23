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
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("dark");
  const [modal, setModal] = useState<boolean>(false);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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

  // Handle de navbar sticky
  const handleScroll = () => {
    if (window.scrollY > 30) {
      // Ajusta este valor según tus necesidades
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  return (
    <nav
      className={
        modal
          ? ""
          : "px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[10rem] 4xl:px-[20rem] sticky top-0 z-10 "
      }
    >
      <div
        className={`px-4 h-[64px]  ${
          isScroll
            ? "insideNav bg-[#ffffff] dark:bg-[#f8f7fe] dark:text-black "
            : "insideNavNoScroll bg-[#f8f7fe]  dark:bg-[#1c1a27] dark:text-[#ffffff] "
        } h-[4.75rem] flex flex-row justify-between items-center  z-50  text-lg font-medium  `}
      >
        <button onClick={() => scrollTo(0,0)}>
          <h1 className="xs:block hidden hover:animate-pulse hover:text-[#BB2649] transition-colors">
            #KC
          </h1>
        </button>
        <div className="flex flex-row gap-4 ">
          {ElementsNavbar.map((item) => (
            <button
              onClick={() => scrollToSection(item.href)}
              key={item.id}
              className="hover-underline-animation text-base md:text-lg"
            >
              {"< "}
              {isEnglish ? item.nameEng : item.name}
              {" />"}
            </button>
          ))}
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="xs:hidden">
            <IconMenu onClick={() => setModal(!modal)} />
          </div>
          {modal ? (
            <ul className="z-10 flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-black gap-4">
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
                  aria-label="Dark mode"
                />
              </button>
            ) : (
              <button>
                <IconSunFilled
                  className="hover:rotate-12  duration-300"
                  onClick={handlerTheme}
                  aria-label="Light mode"
                />
              </button>
            )}
            <button>
              <IconWorld
                className="hover:rotate-12  duration-300"
                onClick={handlerLanguage}
                aria-label="Language"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
