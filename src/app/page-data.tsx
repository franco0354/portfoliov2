import { HomeIcon, Rocket, Contact2, User, Clock, Github, Linkedin, Facebook } from "lucide-react";
import { SVGProps } from 'react';
export const DATA = {
  navbar: [
    { href: "#Home", icon: HomeIcon, label: "Home" },
    { href: "#About", icon: User, label: "About" },
    { href: "#Project", icon: Rocket, label: "Project" },
    { href: "#Timeline", icon: Clock, label: "Timeline" },
    { href: "#Contact", icon: Contact2, label: "Contact" },
  ],
  socials: [
    { href: "https://github.com/franco0354/", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/franco-gregorio-1ba17a277/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.facebook.com/franco.0354", icon: Facebook, label: "Facebook" },
  ],
};

export const MouseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={26}
      height={31}
      fill='none'
      {...props}
    >
      <g clipPath='url(#a)'>
        <path
          fill={'#363434'}
          fillRule='evenodd'
          stroke={'#fff'}
          strokeLinecap='square'
          strokeWidth={2}
          d='M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z'
          clipRule='evenodd'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill={'#363434'} d='M0 0h26v31H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

