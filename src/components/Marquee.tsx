import React from "react";
import Marquee from "react-fast-marquee";
import {
  IconBrandRedux,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandFigma,
  IconBrandGit,
} from "@tabler/icons-react";
const MarqueeComponent = () => {
  return (
    <Marquee>
      {/* <div className="flex flex-row gap-2 "> */}
      <div className="relative group">
        <IconBrandTypescript size={40} />
        <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
          TypeScript
        </div>
      </div>
      <div className="relative group">
        <IconBrandReact size={40} />
        <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
          React
        </div>
      </div>
      <div className="relative group">
        <IconBrandRedux size={40} />
        <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
          Redux
        </div>
      </div>
      <div className="relative group">
        <IconBrandTailwind size={40} />
        <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
          TailwindCSS
        </div>
      </div>
      <div className="relative group">
        <IconBrandGit size={40} />
        <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
          GIT
        </div>
      </div>
      <div className="relative group">
        <IconBrandFigma size={40} />
        <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out">
          Figma
        </div>
      </div>
      {/* </div> */}
    </Marquee>
  );
};

export default MarqueeComponent;
