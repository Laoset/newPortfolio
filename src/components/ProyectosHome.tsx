'use client';
import React from 'react';
import { IconCode, IconArrowRight, IconGithub } from './icons';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type projectsType = {
  title: string;
  description: string;
  link: string;
  github: string;
  tech: string[];
};
const ProyectosHome = () => {
  const t = useTranslations('Projects');
  const projects = t.raw('cards');

  return (
    <motion.section
      id="projects"
      className="section h-auto flex flex-col justify-center dark:text-[#bbb] mt-[80px] lg:mt-[160px]"
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="lg:text-4xl text-3xl font-bold mb-4 lg:mb-16 dark:text-[#ddd]">
        {t('title')}
      </h3>
      <div className="flex flex-col justify-between lg:gap-4">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4 lg:mb-16">
          <p className="text-[18px] m:text-xl mb-[40px] lg:mb-0">
            {t('description')}
          </p>
          <a
            href="https://github.com/Laoset"
            target="_blank"
            aria-label="GitHub"
            className="hidden lg:block px-2 py-[6px] rounded-md bg-[#BB2649] text-[#FFFFFF] hover:bg-opacity-80 transition-colors text-[18px] w-auto max-w-[115px]"
          >
            {t('button')}
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-9 gap-x-3 3xl:gap-x-6 justify-center justify-items-center">
          {projects.map((item: projectsType, index: number) => {
            return (
              <motion.div
                key={index}
                className="relative flex flex-col justify-between lg:h-[200px] 2xl:max-w-[350px] max-w-full 3xl:max-w-[400px] rounded-lg card dark:bg-[#e7e6ece0] cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <a
                  href={item.link}
                  target="_blank"
                  className="h-full w-full flex flex-col lg:justify-evenly py-6 lg:py-0 px-6"
                >
                  <p className="text-lg font-medium dark:text-black">
                    {item.title}
                  </p>
                  <p className="text-base lg:text-lg font-normal dark:text-gray-700 ">
                    {item.description}
                  </p>
                </a>
                <a href={item.github} target="_blank" aria-label="GitHub">
                  <IconGithub className="absolute top-5 lg:top-8 right-3 hover:text-black text-gray-600 transition-colors w-[24px] h-[24px]" />
                </a>
              </motion.div>
            );
          })}
        </div>
        <a
          href="https://github.com/Laoset"
          target="_blank"
          aria-label="GitHub"
          className="lg:hidden self-center mt-[2.25rem] px-2 py-[6px] rounded-md bg-[#BB2649] text-[#FFFFFF] hover:bg-opacity-80 transition-colors text-[18px] w-auto max-w-[115px]"
        >
          {t('button')}
        </a>
      </div>
    </motion.section>
  );
};

export default ProyectosHome;
