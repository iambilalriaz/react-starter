import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import { Card } from '../components/Card';
import { isLoggedIn } from '../router/routes';
import { getLoggedInUser } from '../utils';

export default function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/dashboard/${getLoggedInUser()?.role}`);
    } else {
      navigate('/auth/login');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout>
      <div className="grid h-screen place-items-center">
        <Card>Welcome to user dashboard!</Card>
      </div>
    </UserLayout>
  );
}
