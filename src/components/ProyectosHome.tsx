'use client';
import React from 'react';
import { IconGithub } from './icons';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type ProjectCard = {
  title: string;
  description: string;
  link: string;
  github: string | null;
  tech: string[];
  image: string | null;
};

const ProyectosHome = () => {
  const t = useTranslations('Projects');
  const projects = t.raw('cards') as ProjectCard[];
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="projects"
      className="section scroll-mt-36 h-auto flex flex-col justify-center dark:text-[#bbb]"
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.5 }}
    >
      <h2 className="sectionTitle">{t('title')}</h2>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4 lg:mb-10">
          <p className="text-base mb-[40px] lg:mb-0">{t('description')}</p>
          <a
            href="https://github.com/Laoset"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden lg:block px-2 py-[6px] rounded-md bg-[#BB2649] text-[#FFFFFF] hover:bg-opacity-80 transition-colors text-base w-auto max-w-[115px]"
          >
            {t('button')}
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((item) => {
            return (
              <motion.article
                key={item.title}
                className="relative flex h-full w-full flex-col overflow-hidden rounded-lg card dark:bg-[#e7e6ece0]"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.6 }}
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-video w-full bg-gradient-to-br from-[#1c1a27] via-[#2a1d2a] to-[#BB2649]/80">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 28rem, 100vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <h3 className="px-6 pt-5 text-lg font-medium text-black">
                    {item.title}
                  </h3>
                </a>
                {item.github ? (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub: ${item.title}`}
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-1 text-gray-700 transition-colors hover:text-black"
                  >
                    <IconGithub
                      aria-hidden="true"
                      className="h-[24px] w-[24px]"
                    />
                  </a>
                ) : null}
                <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-2">
                  <p className="text-base font-normal text-gray-700">
                    {item.description}
                  </p>
                  {item.tech?.length ? (
                    <ul className="mt-auto flex flex-wrap gap-2">
                      {item.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
        <a
          href="https://github.com/Laoset"
          target="_blank"
          rel="noopener noreferrer"
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
