import SignupForm from '../features/authentication/components/SignupForm';
import AuthLayout from '../layouts/AuthLayout';

export default function SignUp() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
