import { SVGProps } from 'react';

const IconReactAdmin = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <rect
        x='2'
        y='2'
        width='20'
        height='20'
        rx='4'
        ry='4'
        fill='none'
        stroke='currentColor'
      />

      <text
        x='12'
        y='16.5'
        fontSize='11'
        fontWeight='bold'
        fill='currentColor'
        textAnchor='middle'
        stroke='none'
      >
        Ra
      </text>
    </svg>
  );
};

export default IconReactAdmin;
