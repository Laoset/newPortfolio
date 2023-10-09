import React, { useEffect, useState } from "react";

const frases = [
  "Accesibilidad y minimalismo",
  "React/Redux my first love",
  "TypeScript fan",
];

const TypeWritter: React.FC = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [charIndex, setCharIndex] = useState<number>(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (charIndex < frases[currentPhraseIndex].length) {
        setCurrentText(
          (prevText) => prevText + frases[currentPhraseIndex].charAt(charIndex)
        );
        setCharIndex(charIndex + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCharIndex(0);
          setCurrentText("");
          setCurrentPhraseIndex((currentPhraseIndex + 1) % frases.length);
        }, 1000); // Cambia de frase después de 1 segundo
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  }, [charIndex, currentPhraseIndex]);

  return (
    <div>
      <p>{currentText}</p>
    </div>
  );
};

export default TypeWritter;
