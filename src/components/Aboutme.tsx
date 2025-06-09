'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ElementsAboutme } from '@/utils/ElementsNavbar';
import Image from 'next/image';

const Aboutme = () => {
  const t = useTranslations('AboutMe');

  return (
    <motion.section
      id="aboutme"
      className="section flex flex-col h-auto dark:text-[#bbb]"
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="sectionTitle">{t('title')}</h3>
      <article className="flex flex-col justify-between">
        <div className="flex md:flex-row gap-8 justify-between lg:max-h-[233px] mb-4 lg:mb-16">
          <div className="w-2/4 flex flex-col justify-between">
            <p className="text-base">{t('description')}</p>
            <p className="text-base">{t('description2')}</p>
            <p className="text-base ">{t('description3')}</p>
          </div>
          <Image
            src={'/avatar.png'}
            width={250}
            height={250}
            alt="avatarkc"
            className="object-cover p-1 lg:p-1 aspect-square rounded-2xl ring-2 ring-[#BB2649]/70 "
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-[40px] m:gap-16 mt-[40px] lg:mt-0  justify-center">
          {ElementsAboutme.map((el) => {
            return (
              <div
                key={el.id}
                className="text-base  flex flex-col gap-[15px] items-center justify-between"
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
      </article>
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
        <icon.icon className="w-[24px] h-[24px]" />
        <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out text-center">
          {icon.name}
        </div>
      </a>
    );
  } else {
    return (
      <>
        <div className="hover:text-[#BB2649] transition-colors relative group">
          <icon.icon className="w-[24px] h-[24px]" />
          <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out text-center">
            {icon.name}
          </div>
        </div>
      </>
    );
  }
};
export default Aboutme;
