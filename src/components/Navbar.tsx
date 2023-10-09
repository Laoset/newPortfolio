import React, { useEffect, useState } from "react";
import { ElementsNavbar } from "@/utils/ElementsNavbar";
import { IconSunFilled, IconMoonFilled, IconWorld } from "@tabler/icons-react";
import { scrollToSection } from "@/utils/ScrollMovement";

const Navbar = ({
  isEnglish,
  handlerLanguage,
}: {
  isEnglish: boolean;
  handlerLanguage: () => void;
}) => {
  const [theme, setTheme] = useState("light");

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

  return (
    <nav className="sticky top-0 flex flex-row justify-between items-center h-[4.75rem] border-b-[1.5px] border-gray-400 z-50 bg-[#fbfcfd] text-lg dark:bg-[#000000] dark:text-[#eeeeee] bg-gradient-conic  from-[#ffffff] to-[#fbfcfd] dark:bg-gradient-conic dark:from-black dark:to-black ">
      <h1 className="hover:animate-pulse hover:text-[#d36e70] transition-colors">
        #KC
      </h1>
      <div className="flex flex-row gap-4">
        {ElementsNavbar.map((item) => (
          <button
            onClick={() => scrollToSection(item.href)}
            key={item.id}
            className="hover-underline-animation"
          >
            {"<"}
            {isEnglish ? item.nameEng : item.name}
            {"/>"}
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-4">
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
    </nav>
  );
};

export default Navbar;
