import {
  IconFigma,
  IconGithub,
  IconLinkedin,
  IconNextjs,
  IconReact,
  IconRedux,
  IconTailwindcss,
  IconTypescript,
  IconSlack
} from '@/components/icons';

export type ElementNavbar = {
  id: number;
  name: string;
  href: string;
};

export const ElementsNavbar = [
  {
    id: 1,
    name: '1_name',
    href: 'main'
  },
  {
    id: 2,
    name: '2_name',
    href: 'aboutme'
  },
  // {
  //   id: 3,
  //   name: '3_name',
  //   href: 'workingexperience'
  // },
  {
    id: 4,
    name: '4_name',
    href: 'projects'
  }
];
export const ElementsAboutme = [
  {
    id: 1,
    title: 'extrainfo.title2',
    icons: [
      { name: 'Figma', icon: IconFigma },
      { name: 'Slack', icon: IconSlack }
    ]
  },
  {
    id: 2,
    title: 'extrainfo.title3',
    icons: [
      { name: 'TypeScript', icon: IconTypescript },
      { name: 'NextJS', icon: IconNextjs },
      { name: 'React', icon: IconReact },
      { name: 'Redux', icon: IconRedux },
      { name: 'TailwindCSS', icon: IconTailwindcss }
    ]
  },
  {
    id: 3,
    title: 'extrainfo.title1',
    icons: [
      {
        href: 'https://www.linkedin.com/in/kevin-corman-samanamud/',
        name: 'Linkedin',
        icon: IconLinkedin
      },
      { href: 'https://github.com/Laoset', name: 'Github', icon: IconGithub }
    ]
  }
];
