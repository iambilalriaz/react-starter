import React from 'react';
import DarkLogo from '../components/SVGS/DarkLogo';
import topPattern from '../assets/topPattern.svg';
import bottomPattern from '../assets/bottomPattern.svg';
import { Wrapper } from '../components/Wrapper';

interface ILayoutProps {
  children: React.ReactNode;
}
function ForgotPasswordLayout({ children }: ILayoutProps) {
  return (
    <div className="bg-neutral h-screen">
      <div className="py-[37px] px-[76px]">
        <DarkLogo />
      </div>

      <img src={topPattern} alt="" className="absolute right-0 top-0" />
      <img src={bottomPattern} alt="" className="absolute left-0 bottom-0" />
      <div className="grid place-items-center">
        <Wrapper>{children}</Wrapper>
      </div>
    </div>
  );
}

export default ForgotPasswordLayout;
