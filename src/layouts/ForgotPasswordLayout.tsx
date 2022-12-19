import React from 'react';
import logo from '../assets/dark-logo.svg';
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
        <img src={logo} alt="suforia" />
      </header>
      <div>
        <Wrapper>
          <div className="flex justify-center items-center h-[80vh]">{children}</div>
        </Wrapper>
      </div>
    </section>
  );
}

export default ForgotPasswordLayout;
