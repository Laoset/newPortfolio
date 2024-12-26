'use client';
import React from 'react';
import { IconCode, IconArrowRight } from './icons';
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
      id='projects'
      className='section h-auto flex flex-col justify-center dark:text-[#bbb] mt-[80px] lg:mt-[160px]'
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className='lg:text-4xl text-3xl font-boldmb-4 lg:mb-16 dark:text-[#ddd]'>
        <span className='text-3xl'>{'<'} </span>
        {t('title')}
        <span className='text-3xl ml-1'>{'/>'}</span>
      </h3>
      <div className='flex flex-col justify-between lg:gap-4'>
        <div className='flex flex-col lg:flex-row justify-between items-center mb-4 lg:mb-16'>
          <p className='text-[18px] m:text-xl mb-[40px] lg:mb-0'>
            {t('description')}
          </p>
          <a
            href='https://github.com/Laoset'
            target='_blank'
            aria-label='GitHub'
            className='hidden lg:block px-2 py-[6px] rounded-md bg-[#BB2649] text-[#FFFFFF] hover:bg-opacity-80 transition-colors text-[18px] w-auto max-w-[115px]'
          >
            {t('button')}
          </a>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-y-9 gap-x-3 3xl:gap-x-6 justify-center'>
          {projects.map((item: projectsType, index: number) => {
            return (
              <motion.div
                key={index}
                className='relative flex flex-col justify-between 2xl:max-w-[350px] max-w-[350px] 3xl:max-w-[400px]  rounded-lg card dark:bg-[#e7e6ece0]'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className='flex flex-col justify-evenly py-2'>
                  <div className='flex flex-row justify-evenly '>
                    <a href={item.github} target='_blank' aria-label='GitHub'>
                      <IconCode className='hover:text-[#c3c3df] text-[#BB2649] transition-colors w-[24px] h-[24px]' />
                    </a>
                    <p className='text-lg font-medium cursor-default dark:text-black'>
                      {item.title}
                    </p>
                    <a href={item.link} target='_blank'>
                      <IconArrowRight
                        className='hover:text-[#c3c3df] text-[#BB2649] transition-colors w-[24px] h-[24px]'
                        aria-label='Website'
                      />
                    </a>
                  </div>
                  <div className='px-6 py-4'>
                    <p className='text-base lg:text-lg font-normal cursor-default dark:text-black'>
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className='flex flex-row flex-wrap gap-4 px-6 pt-4 pb-4'>
                  {item.tech?.map((tech: string, index: number) => (
                    <span
                      key={`tech-${index}`}
                      className='px-2 py-1 bg-gray-200 rounded-full text-sm font-medium text-black cursor-default'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        <a
          href='https://github.com/Laoset'
          target='_blank'
          aria-label='GitHub'
          className='lg:hidden self-center mt-[2.25rem] px-2 py-[6px] rounded-md bg-[#BB2649] text-[#FFFFFF] hover:bg-opacity-80 transition-colors text-[18px] w-auto max-w-[115px]'
        >
          {t('button')}
        </a>
      </div>
    </motion.section>
  );
};

export default ProyectosHome;
