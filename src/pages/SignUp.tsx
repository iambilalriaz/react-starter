/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from '../components/Button';
import Input from '../components/Input';
import Facebook from '../components/SVGS/Facebook';
import Linkedin from '../components/SVGS/Linkedin';

import { fields } from '../data/fields';

export default function SignUp() {
  return (
    <main>
      <div className="flex h-screen place-content-center">
        <div className="w-[50%] bg-black text-white">
          <h1>Welcome to Suforia</h1>
          <p>
            Suforia is a state-of-the-art technology platform connecting influencers, brands and
            agencies all over the world.
          </p>
        </div>
        <div className="flex gap-4 flex-col w-[50%] justify-center">
          <div className="border mx-auto max-w-[583px] rounded-xl p-8 shadow-4xl">
            <div className="flex flex-col mb-11 items-center justify-center">
              <h2 className="text-2xl">Create Account</h2>
              <p className="text-accent">Get started with Suforia</p>
            </div>
            {/* inputs */}
            <div className="grid md:grid-cols-2 gap-x-4">
              {fields.map((field) => (
                <Input
                  key={field.fid}
                  label={field.label}
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
            <div className="form-control mt-8 mb-7">
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" checked className="checkbox" />
                <span className="text-base text-accent">
                  By signing up you are agree to suforia terms of services
                </span>
              </label>
            </div>
            <Button size="lg">Sign Up</Button>
            {/* footer */}
            <div className="mt-8 mb-[42px]">
              <p className="text-accent text-center text-sm">
                Already have an account!{' '}
                <a href="/" className="text-primary">
                  Log In
                </a>
              </p>
            </div>
            {/* social */}
            <p className="text-center mb-5">Or continue with</p>
            <div className="flex justify-center gap-6">
              <a href="/">
                <div className="rounded-full w-[50px] border-[#c6c9cf] grid place-content-center h-[50px] border">
                  <Facebook />
                </div>
              </a>
              <a href="/">
                <div className="rounded-full w-[50px] border-[#c6c9cf] grid place-content-center h-[50px] border">
                  <Linkedin />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
