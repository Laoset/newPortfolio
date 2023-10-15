import React from "react";
import Typewriter from "typewriter-effect";

// const frases = [
//   "Forjando soluciones impactantes desde líneas de código como Desarrollador Front End",
//   "Desarrollador Front End que busca soluciones creativas para los desafios diarios",
// ];

const TypeWritter: React.FC = () => {
  return (
    <div>
      <Typewriter
        options={{
          strings: [
            'Forjando soluciones impactantes desde líneas de código como <span style="color: #A13032; font-weight: bold; margin-right: 12px;"> Desarrollador Front End</span>',
            '<span style="color: #A13032; font-weight: bold; margin-right: 12px;">Desarrollador Front End</span>que busca soluciones creativas para los desafios diarios',
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 20,
          delay: 20,
        }}
      />
    </div>
  );
};

export default TypeWritter;
