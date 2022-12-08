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
          <div className="border mx-auto max-w-[583px] p-8 shadow-lg">
            <div className="flex flex-col items-center justify-center">
              <h2>Create Account</h2>
              <p>Get started with Suforia</p>
            </div>
            <div className="flex">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <span className="label-text">Last Name</span>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="flex">
              <div className="form-control">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  placeholder="(480) 555-0103"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  placeholder="bill.sanders@example.com"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="flex">
              <div className="form-control">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  placeholder="******"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  placeholder="******"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" checked className="checkbox" />
                <span className="label-text">
                  By signing up you are agree to suforia terms of services
                </span>
              </label>
            </div>
            <Button size="lg">Sign Up</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
