import { useState } from 'react';
import ForgotPasswordCard from '../features/authentication/components/ForgotPassword/ForgotPasswordCard';
import { OTPCodeCard } from '../features/authentication/components/ForgotPassword/OTPCodeCard';
import ResetPasswordCard from '../features/authentication/components/ForgotPassword/ResetPasswordCard';
import ForgotPasswordLayout from '../layouts/ForgotPasswordLayout';

export default function ForgotPassword() {
  const [activePageIdx, setActivePageIdx] = useState(1);
  let ActiveComponent: JSX.Element | string = '';
  if (activePageIdx === 0)
    ActiveComponent = <ForgotPasswordCard setActivePageIdx={setActivePageIdx} />;
  else if (activePageIdx === 1)
    ActiveComponent = <OTPCodeCard setActivePageIdx={setActivePageIdx} />;
  else if (activePageIdx === 2)
    ActiveComponent = <ResetPasswordCard setActivePageIdx={setActivePageIdx} />;
  return <ForgotPasswordLayout>{ActiveComponent}</ForgotPasswordLayout>;
}
