import React from "react";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
} from "@tabler/icons-react";
const Aside = () => {
  return (
    <div className="flex flex-row gap-2 ">
      <a
        href="https://www.linkedin.com/in/kevin-corman-samanamud/"
        className="hover:text-[#d36e70] transition-colors"
        target="_blank"
      >
        <IconBrandLinkedin size={40} />
      </a>
      <a
        href="https://github.com/Laoset"
        className="hover:text-[#d36e70] transition-colors"
        target="_blank"
      >
        <IconBrandGithub size={40} />
      </a>
      <a
        href="mailto:kevin143corman@gmail.com"
        className="hover:text-[#d36e70] transition-colors"
      >
        <IconMail size={40} />
      </a>
    </div>
  );
};

export default Aside;
