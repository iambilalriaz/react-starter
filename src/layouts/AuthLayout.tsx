// import IntlTelInput from 'react-intl-tel-input';
import React from 'react';
import AuthHeader from '../features/authentication/components/Header';
import logo from '../assets/header-logo.svg';

// import 'react-intl-tel-input/dist/main.css';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="sticky top-0 md:hidden">
        <AuthHeader />
      </div>
      {/* md:h-screen */}
      <div className="mx-auto flex w-[90%] flex-col gap-4  md:w-full md:flex-row md:place-content-center">
        <div className="mt-[10px] rounded bg-black p-8 text-white md:mt-0 md:w-[50%] md:rounded-none">
          <div className="md:ml-[100px]">
            <header className="mb-[239px] mt-[76px] hidden  md:block">
              <img src={logo} alt="Suforia" />
            </header>
            <h1 className="font-semibold text-base text-neutral md:mb-[18px] md:text-2xl">
              Welcome to Suforia
            </h1>
            <p className="max-w-[40ch] text-xs text-dark-gray md:text-lg">
              Suforia is a state-of-the-art technology platform connecting influencers, brands and
              agencies all over the world.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 md:w-[50%]">
          <div className=" mx-auto w-full  md:max-w-[583px] ">{children}</div>
          {/* do not remove this */}
          {/* <IntlTelInput inputClassName="input inputBox input-bordered" separateDialCode format /> */}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
