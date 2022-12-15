// import IntlTelInput from 'react-intl-tel-input';
import React from 'react';
// import Logo from '../components/SVGS/Logo';
import AuthHeader from '../features/authentication/components/Header';
import logo from '../assets/header-logo.svg';

import 'react-intl-tel-input/dist/main.css';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="sticky top-0 md:hidden">
        <AuthHeader />
      </div>
      <div className="flex gap-4 flex-col w-[90%] md:w-full mx-auto md:flex-row md:h-screen md:place-content-center">
        <div className="md:w-[50%] rounded md:rounded-none bg-black mt-[10px] md:mt-0 p-8 text-white">
          <div className="md:ml-[100px]">
            <header className="mb-[239px] hidden md:block  mt-[76px]">
              <img src={logo} alt="Suforia" />
            </header>
            <h1 className="md:text-2xl font-semibold md:mb-[18px] text-base text-neutral">
              Welcome to Suforia
            </h1>
            <p className="text-dark-gray md:text-lg text-xs max-w-[40ch]">
              Suforia is a state-of-the-art technology platform connecting influencers, brands and
              agencies all over the world.
            </p>
          </div>
        </div>
        <div className="flex gap-4 flex-col md:w-[50%] justify-center">
          <div className=" mx-auto w-full  md:max-w-[583px] ">{children}</div>
          {/* do not remove this */}
          {/* <IntlTelInput inputClassName="input inputBox input-bordered" separateDialCode format /> */}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
