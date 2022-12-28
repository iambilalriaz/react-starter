import React from 'react';
import logo from '../assets/dark-logo.svg';
import { Wrapper } from '../components/Wrapper';
import AuthHeader from '../features/authentication/components/Header';

interface ILayoutProps {
  children: React.ReactNode;
}
function OTPLayout({ children }: ILayoutProps) {
  return (
    <section>
      <div className="fixed top-0 w-full md:hidden">
        <AuthHeader />
      </div>
      <header className="fixed top-0 px-[76px] py-[37px]">
        <img src={logo} alt="suforia" />
      </header>
      <div>
        <Wrapper>
          <div className="flex h-screen items-center justify-center">{children}</div>
        </Wrapper>
      </div>
    </section>
  );
}

export default OTPLayout;
