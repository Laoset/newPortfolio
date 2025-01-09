'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ElementsAboutme } from '@/utils/ElementsNavbar';

const Aboutme = () => {
  const t = useTranslations('AboutMe');

  return (
    <motion.section
      id="aboutme"
      className="section flex flex-col h-auto dark:text-[#bbb] mt-[80px] lg:mt-[160px]"
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="lg:text-4xl text-3xl font-bold mb-4 lg:mb-16 dark:text-[#ddd]">
        <span className="text-3xl">{'<'} </span>
        {t('title')}
        <span className="text-3xl ml-1">{'/>'}</span>
      </h3>
      <div className="flex flex-col justify-between">
        {/* INTRODUCCION */}
        <div className="flex flex-col gap-10 justify-between lg:max-h-[233px] mb-4 lg:mb-16">
          <p className="text-[18px] m:text-[20px] h-auto leading-[32px]">
            {t.rich('description', {
              strong: (chunks) => (
                <strong className="text-[#BB2649]">{chunks}</strong>
              ),
              highlight: (chunks) => (
                <span className="ml-1 p-1 relative bg-[#BB2649] hover:scale-110 transform transition-transform duration-300 inline-block rotate-2 text-white">
                  {chunks}
                </span>
              )
            })}
          </p>
        </div>
        {/* ESTUDIOS */}
        <div className="flex flex-col lg:flex-row gap-[40px] m:gap-16 mt-[40px] lg:mt-0  justify-center">
          {ElementsAboutme.map((el) => {
            return (
              <div
                key={el.id}
                className="text-[18px] m:text-xl flex flex-col gap-[15px] items-center justify-between"
              >
                <p className="flex flex-row items-center">{t(el.title)}</p>
                <div className="flex flex-row gap-[10px] justify-between">
                  {el.icons.map((Icon, index) => (
                    <IconComponent key={index} icon={Icon} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
const IconComponent = ({ icon }: { icon: any }) => {
  if (icon.href) {
    return (
      <a
        href={icon.href}
        className="hover:text-[#BB2649] transition-colors relative group"
        target="_blank"
        aria-label="redirects"
      >
        <icon.icon className="w-[28px] h-[28px]" />
        <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out text-center">
          {icon.name}
        </div>
      </a>
    );
  } else {
    return (
      <>
        <div className="hover:text-[#BB2649] transition-colors relative group">
          <icon.icon className="w-[28px] h-[28px]" />
          <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out text-center">
            {icon.name}
          </div>
        </div>
      </>
    );
  }
};
export default Aboutme;
