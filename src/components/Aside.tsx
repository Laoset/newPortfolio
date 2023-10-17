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
        className="hover:text-[#6D67E4] transition-colors"
        target="_blank"
        aria-label="LinkedIn"
      >
        <IconBrandLinkedin size={40} />
      </a>
      <a
        href="https://github.com/Laoset"
        className="hover:text-[#6D67E4] transition-colors"
        target="_blank"
        aria-label="GitHub"
      >
        <IconBrandGithub size={40} />
      </a>
      <a
        href="mailto:kevin143corman@gmail.com"
        className="hover:text-[#6D67E4] transition-colors"
        aria-label="Email"
      >
        <IconMail size={40} />
      </a>
    </div>
  );
};

export default Aside;
