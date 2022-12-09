import ForgotPasswordLayout from '../../../../layouts/ForgotPasswordLayout';
import OTPInput from './OTPInput';

const digits = [1, 2, 3, 4, 5, 6];
export function OTPCodeCard() {
  return (
    <ForgotPasswordLayout>
      <>
        <p className="text-[24px] bold-[500] text-center text-primary leading-[36px]">OTP Code</p>
        <p className="text-[16px] bold-[400] text-center text-accent leading-[24px]">
          A 6 digit OTP Code has been send to your email given by you
        </p>
        <div className="flex justify-between">
          {digits?.map((digit) => (
            <div key={digit} className="w-[20px]">
              <OTPInput id={`${digit}`} placeholder="0" />
            </div>
          ))}
        </div>
      </>
    </ForgotPasswordLayout>
  );
}
