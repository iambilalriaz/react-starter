/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from '../components/Button';

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
            <div className="flex gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="text-base ">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-base">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="text-base">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="(480) 555-0103"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-base">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="bill.sanders@example.com"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="text-base">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="******"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-base">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="******"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
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
            {/*  */}
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
                  <svg
                    width="14"
                    height="24"
                    viewBox="0 0 14 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.3345 13.2014L12.9882 9.04769H8.89872V6.3534C8.89872 5.21677 9.46894 4.10816 11.3006 4.10816H13.161V0.571914C13.161 0.571914 11.4734 0.29126 9.86061 0.29126C6.49113 0.29126 4.29082 2.28108 4.29082 5.8819V9.04769H0.546875V13.2014H4.29082V23.2432C5.04246 23.3583 5.81143 23.4172 6.59477 23.4172C7.37812 23.4172 8.14708 23.3583 8.89872 23.2432V13.2014H12.3345Z"
                      fill="#1A1A1A"
                    />
                  </svg>
                </div>
              </a>
              <a href="/">
                <div className="rounded-full w-[50px] border-[#c6c9cf] grid place-content-center h-[50px] border">
                  <svg
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.95399 2.89782C4.95399 4.09252 3.91846 5.06102 2.64106 5.06102C1.36366 5.06102 0.328125 4.09252 0.328125 2.89782C0.328125 1.70312 1.36366 0.734619 2.64106 0.734619C3.91846 0.734619 4.95399 1.70312 4.95399 2.89782Z"
                      fill="#1A1A1A"
                    />
                    <path d="M0.644424 6.65106H4.59816V18.6319H0.644424V6.65106Z" fill="#1A1A1A" />
                    <path
                      d="M10.9637 6.65106H7.00994V18.6319H10.9637C10.9637 18.6319 10.9637 14.8601 10.9637 12.5019C10.9637 11.0864 11.447 9.66475 13.3754 9.66475C15.5549 9.66475 15.5417 11.5171 15.5316 12.9522C15.5183 14.828 15.55 16.7422 15.55 18.6319H19.5037V12.3087C19.4703 8.27112 18.4182 6.41071 14.9569 6.41071C12.9014 6.41071 11.6273 7.34389 10.9637 8.18817V6.65106Z"
                      fill="#1A1A1A"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
