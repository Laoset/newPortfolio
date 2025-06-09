'use client';
import React from 'react';
import { IconHeartCode, IconLinkedin } from './icons';
import { useTranslations } from 'next-intl';
const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer
      id="footer"
      className="sectionwrapper pt-[80px] lg:mt-[0px] px-[2rem] lg:px-[8rem] 2xl:px-[12rem] 3xl:px-[16rem] 4xl:px-[23rem]  flex flex-col justify-center items-center dark:text-[#bbb]"
    >
      <div className="section flex flex-col justify-center items-center">
        <div className="text-base flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-2">
          <p>{t('title')}</p>
          <a
            href={'https://www.linkedin.com/in/kevin-corman-samanamud/'}
            className="hover:text-[#BB2649] transition-colors relative group"
            target="_blank"
            aria-label="redirects"
          >
            <IconLinkedin className="w-[24px] h-[24px]" />
            <div className="absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 -top-10 left-1/2 transform -translate-x-1/2 group-hover:block cursor-none transition-opacity duration-1000 ease-in-out text-center">
              Linkedin
            </div>
          </a>
        </div>
        <div className="flex flex-row gap-2 mt-10 mb-5 h-auto items-center text-base">
          <p>{'<'}</p>
          <p>{t('letter')}</p>
          <IconHeartCode color="#BB2649" />
          <a
            className="hidden lg:block "
            href="https://github.com/Laoset"
            target="_blank"
          >
            <p>{t('letter2')}</p>
          </a>
          <a
            className="lg:hidden"
            href="https://github.com/Laoset"
            target="_blank"
          >
            <p>{t('letter2Mobile')}</p>
          </a>
          <p>{'/>'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
