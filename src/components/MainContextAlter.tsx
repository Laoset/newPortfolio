'use client';

import ProjectsCircle from './ProjectsCircle';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

const MainContent = () => {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="main"
      className="section flex flex-col justify-center lg:scroll-mt-[4.75rem] lg:py-28 gap-[50px] 4xl:gap-20 text-black dark:text-[#ffedd5]"
    >
      <div className="flex flex-col text-center mt-[80px]">
        <h1 className="w-full title text-[2.6rem] 364:text-[2.8rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem]">
          <span className="block">
            <span className="text-shadow-pink">K</span>EVIN
            <span className="text-shadow-pink ml-3 lg:ml-10">C</span>ORMAN
          </span>
          <span className="block">{t('Hero.subtitle')}</span>
        </h1>
      </div>
      <motion.div
        className="min-h-[150px] w-full flex justify-center text-[#333333] dark:text-[#ffedd5]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.8 }}
      >
        <ProjectsCircle />
      </motion.div>
    </section>
  );
};

export default MainContent;
