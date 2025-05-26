import { useTextScramble } from '@/hooks/useTextScramble';
import { ElementNavbar } from '@/utils/ElementsNavbar';
import React from 'react';
import { useTranslations } from 'use-intl';

type TextScrambleProps = {
  element: ElementNavbar;
  callback: (el: string) => void;
};

const TextScramble = ({ callback, element }: TextScrambleProps) => {
  const t = useTranslations('Navbar');
  const { displayText, setIsHovering } = useTextScramble(t(element.name));

  return (
    <button
      onClick={() => callback(element.href)}
      key={element.id}
      className="hover-underline-animation text-base md:text-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="relative inline-block">
        <span className="font-mono">{displayText}</span>
      </span>
    </button>
  );
};

export default TextScramble;
