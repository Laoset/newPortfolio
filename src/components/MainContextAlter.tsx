'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectsCircle from './ProjectsCircle';
import { useTranslations } from 'next-intl';

const MainContent = () => {
  const [shouldRenderCircle, setShouldRenderCircle] = useState(false);
  const t = useTranslations();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldRenderCircle(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const renderCircle = () => {
    return <ProjectsCircle />;
  };

  return (
    <motion.section
      id='main'
      className='section flex flex-col justify-center lg:scroll-mt-[4.75rem] lg:py-28 3xl:py-0 gap-[50px]  4xl:gap-20 h-screen text-black dark:text-[#ffedd5]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className='flex flex-col text-center mt-[80px]'>
        <h2 className='w-full title text-[2.6rem] 364:text-[2.8rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem] xl:text-[7rem] 2xl:text-[6.5rem] 3xl:text-[7rem] 4xl:text-[8rem]'>
          <span className='text-shadow-pink'>K</span>EVIN
          <span className='text-shadow-pink ml-3 lg:ml-10'>C</span>ORMAN
        </h2>
        <h2 className='w-full title text-[2.6rem] 364:text-[2.8rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.8rem] m:text-[5.5rem] lg:text-[5rem] xl:text-[7rem] 2xl:text-[6.5rem] 3xl:text-[7rem] 4xl:text-[8rem]'>
          {t('Hero.subtitle')}
        </h2>
      </div>
      <motion.div
        className='min-h-[150px] w-full flex justify-center text-[#333333] dark:text-[#ffedd5]'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        {shouldRenderCircle && renderCircle()}
      </motion.div>
    </motion.section>
  );
};

export default MainContent;
