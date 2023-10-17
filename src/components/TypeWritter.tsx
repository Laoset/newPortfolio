import React from "react";
import Typewriter from "typewriter-effect";

const TypeWritter = ({ isEnglish }: { isEnglish: boolean }) => {
  return (
    <div>
      {isEnglish ? (
        <Typewriter
          options={{
            strings: [
              'Creating effective solutions from lines of code as a <span style="color: #6D67E4; font-weight: bold; margin-right: 12px;"> Front End Developer</span>',
              '<span style="color: #6D67E4; font-weight: bold; margin-right: 12px;">Front End Developer</span>seeking creative solutions to everyday challenges',
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 20,
            delay: 20,
          }}
        />
      ) : (
        <Typewriter
          options={{
            strings: [
              'Creando soluciones eficaces desde líneas de código como <span style="color: #6D67E4; font-weight: bold; margin-right: 12px;"> Desarrollador Front End</span>',
              '<span style="color: #6D67E4; font-weight: bold; margin-right: 12px;">Desarrollador Front End</span>que busca soluciones creativas para los desafios diarios',
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 20,
            delay: 20,
          }}
        />
      )}
    </div>
  );
};

export default TypeWritter;
