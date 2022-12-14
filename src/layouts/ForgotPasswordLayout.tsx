import React from 'react';
import DarkLogo from '../components/SVGS/DarkLogo';
// import topPattern from '../assets/topPattern.svg';
// import bottomPattern from '../assets/bottomPattern.svg';
import { Wrapper } from '../components/Wrapper';
import AuthHeader from '../features/authentication/components/Header';

interface ILayoutProps {
  children: React.ReactNode;
}
function ForgotPasswordLayout({ children }: ILayoutProps) {
  return (
    <section>
      <div className="fixed w-full top-0 md:hidden">
        <AuthHeader />
      </div>
      <header className="px-[76px] py-[37px]">
        <DarkLogo width="195" height="29" />
      </header>
      <div>
        <Wrapper>
          <div className="flex justify-center items-center h-[80vh]">{children}</div>
        </Wrapper>
      </div>
    </section>

    //     {/* <img src={topPattern} alt="" className="absolute right-0 top-0" />
    //   <img src={bottomPattern} alt="" className="absolute left-0 bottom-0" /> */}
    //
  );
}

export default ForgotPasswordLayout;
