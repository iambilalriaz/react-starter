import LoginForm from '../features/authentication/components/LoginForm';
import AuthLayout from '../layouts/AuthLayout';

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
