'use client';
import React, { useEffect } from 'react';
import { scrollToSection } from '@/utils/ScrollMovement';
import { IconArrowDownSquare } from './icons';
import { useTranslations } from 'next-intl';

const ProjectsCircle = () => {
  const t = useTranslations();
  const separteLettersEnglish = () => {
    let text = document.querySelector('.subContainerEng');
    if (text instanceof HTMLElement) {
      text.innerHTML = text.innerText
        .split('')
        .map(
          (char: any, i: any) =>
            `<span style=" transform: rotate(${i * 8.3}deg)">${char}</span>`
        )
        .join('');
    }
  };
  useEffect(() => {
    separteLettersEnglish();
    separteLettersEnglish();
  }, []);

  return (
    <>
      <div className="containerEng">
        <button
          onClick={() => scrollToSection('projects')}
          className="btAnimation z-10"
        >
          <IconArrowDownSquare
            className="hover:text-[#BB2649] transition-colors w-[40px] h-[40px]"
            aria-label="Scroll"
          />
        </button>
        <div className="subContainerEng">
          <div className="">{t('Hero.animationCircle')}</div>
          <p className=""></p>
        </div>
      </div>
    </>
  );
};

export default ProjectsCircle;
