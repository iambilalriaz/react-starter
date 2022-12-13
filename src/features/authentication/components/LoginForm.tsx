import { Button } from '../../../components/Button';
import Input from '../../../components/Input';
import Facebook from '../../../components/SVGS/Facebook';
import Linkedin from '../../../components/SVGS/Linkedin';
import Qrcode from '../../../components/SVGS/Qrcode';

export default function LoginForm() {
  return (
    <div>
      <div className="flex flex-col mb-11 gap-[15px] items-center justify-center">
        <h2 className="md:text-2xl text-lg">Log In</h2>
        <p className="text-accent md:text-base text-lg">Log In to continue to suforia</p>
      </div>

      {/* inputs */}

      <div className="grid gap-x-4">
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="bill.sanders@example.com"
          field="b"
        />
        <Input label="Password" type="password" id="password" placeholder="******" field="b" />
      </div>
      {/* <div className="form-control mt-8 mb-7">
        <label htmlFor="agree" className="label cursor-pointer justify-start gap-2">
          <input type="checkbox" className="checkbox" id="agree" />
          <span className="text-base text-accent">
            By signing up you are agree to suforia terms of services
          </span>
        </label>
      </div> */}

      <div>
        <p className="text-center mb-5 text-accent">Or continue with</p>
        <div className="flex justify-center gap-6 mb-[30px]">
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
          <a href="/">
            <div className="rounded-full w-[50px] border-[#c6c9cf] grid place-content-center h-[50px] border">
              <Qrcode />
            </div>
          </a>
        </div>
      </div>
      <Button size="lg">Log In</Button>
      <div className="mt-8 mb-[42px]">
        <p className="text-accent font-medium text-center text-sm">
          Don’t have an account!{' '}
          <a href="/" className="text-primary">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
