import { Card } from '../../../../components/Card';
import ForgotPasswordLayout from '../../../../layouts/ForgotPasswordLayout';
import CardSubtitle from '../CardSubtitle';
import CardTitle from '../CardTitle';
import OTPInput from './OTPInput';

const digits = [1, 2, 3, 4, 5, 6];
export function OTPCodeCard() {
  return (
    <ForgotPasswordLayout>
      <Card>
        <CardTitle>OTP Code</CardTitle>
        <CardSubtitle>A 6 digit OTP Code has been send to your email given by you</CardSubtitle>
        <div className="flex justify-between">
          {digits?.map((digit) => (
            <div key={digit} className="w-[20px]">
              <OTPInput id={`${digit}`} placeholder="0" />
            </div>
          ))}
        </div>
      </Card>
    </ForgotPasswordLayout>
  );
}
