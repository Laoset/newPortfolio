import React,{useEffect} from 'react'
import { IconSquareRoundedArrowDownFilled } from "@tabler/icons-react";
import { scrollToSection } from "@/utils/ScrollMovement";

const ProjectsCircle = ({ isEnglish }: { isEnglish: boolean }) => {
  const separteLetters = () => {
    let text = document.querySelector(".subContainer");
    if (text instanceof HTMLElement) {
        text.innerHTML = text.innerText.split('').map((char:any, i:any) => `<span style="transform: rotate(${i * 8.3}deg)">${char}</span>`).join('');
    } 
  }
  const separteLettersEnglish = () => {
    let text = document.querySelector(".subContainerEng");
    if (text instanceof HTMLElement) {
        text.innerHTML = text.innerText.split('').map((char:any, i:any) => `<span style=" transform: rotate(${i * 8.3}deg)">${char}</span>`).join('');
    } 
  }
  useEffect(() => {
    if(isEnglish){
      console.log('ingles')
      separteLettersEnglish();
      separteLettersEnglish();
    }else{
      console.log('no ingles')
      separteLetters();
      separteLetters();

    }
  },[isEnglish])
  return (
    <>
    {isEnglish&& 
      <div className="containerEng">
        <button onClick={() => scrollToSection("projects")} className="btAnimation z-10">
          <IconSquareRoundedArrowDownFilled
            size={40}
            className="hover:text-[#BB2649] transition-colors"
            aria-label="Scroll"
          />
        </button>
        <div className="subContainerEng">
          <div className="">My - projects - #KC®️</div>
          <p className=""></p>
        </div>
    </div>}
   {isEnglish === false &&
    <div className="container">
      <button onClick={() => scrollToSection("projects")} className="btAnimation z-10">
        <IconSquareRoundedArrowDownFilled
          size={40}
          className="hover:text-[#BB2649] transition-colors"
          aria-label="Scroll"
        />
      </button>
      <div className="subContainer">
        <div className="">Mis - proyectos - #KC®️</div>
        <p className=""></p>
      </div>
    </div>
   }
    </>
  )
}

export default ProjectsCircle