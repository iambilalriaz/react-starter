import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import { Card } from '../components/Card';
import { isLoggedIn } from '../router/routes';

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard');
    } else {
      navigate('/auth/login');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout>
      <Card>Welcome to dashboard!</Card>
    </UserLayout>
  );
}
