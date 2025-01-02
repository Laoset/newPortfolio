import { IconDiscord, IconFigma, IconGithub, IconGmail, IconLinkedin, IconNextjs, IconReact, IconReactAdmin, IconRedux, IconTailwindcss, IconTypescript } from "@/components/icons";

export type ElementNavbar =
{
  id:number,
  name:string,
  href:string
}

export const ElementsNavbar = [
  {
    id: 1,
    name: "1_name",
    href: "main",
  },
  {
    id: 2,
    name: "2_name",
    href: "aboutme",
  },
  {
    id: 3,
    name: "3_name",
    href: "projects",
  },
];
export const ElementsAboutme = [
  {
    id: 1,
    title: 'extrainfo.title2',
    icons:[
      {name:"Figma", icon:IconFigma},      
      {name:'Discord',icon:IconDiscord},
      {name:"Github", icon:IconGithub},
    ]
  },
  {
    id: 2,
    title: 'extrainfo.title3',
    icons:[
      {name:"TypeScript", icon:IconTypescript},
      {name:'NextJS',icon:IconNextjs},
      {name:'React',icon:IconReact},
      {name:'Redux',icon:IconRedux},
      {name:'TailwindCSS',icon:IconTailwindcss},
      {name:'React Admin',icon:IconReactAdmin},
    ]
  },
  {
    id: 3,
    title: 'extrainfo.title1',
    icons:[
      {href:'https://www.linkedin.com/in/kevin-corman-samanamud/',name:"Linkedin", icon:IconLinkedin},
      {href:'https://github.com/Laoset',name:"Github", icon:IconGithub},
      {href:'mailto:kevin143corman@gmail.com',name:"Gmail", icon:IconGmail},
    ]
  },
];