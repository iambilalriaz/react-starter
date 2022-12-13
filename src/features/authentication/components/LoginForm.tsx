import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import Input from '../../../components/Input';
import Facebook from '../../../components/SVGS/Facebook';
import Linkedin from '../../../components/SVGS/Linkedin';
import Qrcode from '../../../components/SVGS/Qrcode';
import { CardDivider } from './CardDivider';

export default function LoginForm() {
  return (
    <Card>
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
      <div className="flex justify-end mt-[10px] mb-[6px]">
        <Link to="/forgot-password" className="underline font-medium text-sm text-black">
          Forgot your password?
        </Link>
      </div>
      <div>
        <CardDivider />
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
          <Link to="/signup" className="text-primary">
            Create Account
          </Link>
        </p>
      </div>
    </Card>
  );
}
