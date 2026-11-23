import { useState, useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

const CHARACTERS = '!<>-_\\/[]{}—=+*^?#';

export const useTextScramble = (text: string, scrambleSpeed: number = 50) => {
  const [scrambled, setScrambled] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering || prefersReducedMotion()) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setScrambled(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [isHovering, text, scrambleSpeed]);

  const displayText =
    isHovering && !prefersReducedMotion() ? (scrambled ?? text) : text;

  return { displayText, setIsHovering };
};
