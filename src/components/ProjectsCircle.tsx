'use client';
import React, { useEffect } from 'react';
import { scrollToSection } from '@/utils/ScrollMovement';
import { IconArrowDownSquare } from './icons';
import { useTranslations } from 'next-intl';

const ProjectsCircle = () => {
  const t = useTranslations();

  useEffect(() => {
    const text = document.querySelector('.subContainerEng');
    if (!(text instanceof HTMLElement)) return;

    text.innerHTML = text.innerText
      .split('')
      .map(
        (char, index) =>
          `<span style=" transform: rotate(${index * 8.3}deg)">${char}</span>`
      )
      .join('');
  }, []);

  return (
    <div className="containerEng">
      <button
        type="button"
        onClick={() => scrollToSection('projects')}
        className="btAnimation z-10"
        aria-label={t('Hero.scrollToProjects')}
      >
        <IconArrowDownSquare
          aria-hidden="true"
          className="hover:text-[#BB2649] transition-colors w-[40px] h-[40px]"
        />
      </button>
      <div className="subContainerEng" aria-hidden="true">
        <div>{t('Hero.animationCircle')}</div>
      </div>
    </div>
  );
};

export default ProjectsCircle;
