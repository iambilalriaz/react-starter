import ForgotPasswordCard from '../features/authentication/components/ForgotPassword/ForgotPasswordCard';
import { OTPCodeCard } from '../features/authentication/components/ForgotPassword/OTPCodeCard';
import ResetPasswordCard from '../features/authentication/components/ForgotPassword/ResetPasswordCard';

function ForgotPassword() {
  return (
    <>
      <OTPCodeCard />
      <ResetPasswordCard />
      <ForgotPasswordCard />
    </>
  );
}

export default ForgotPassword;
