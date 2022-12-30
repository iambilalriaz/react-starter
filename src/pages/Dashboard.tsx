import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import { Card } from '../components/Card';
import { isLoggedIn } from '../router/routes';
import { VendorService } from '../services/VendorService';

export default function Dashboard() {
  const navigate = useNavigate();
  const getAllVendors = () => {
    const vendorService = new VendorService();
    vendorService.listVendors().then(({ response }) => {
      if (!response?.vendors?.length) {
        // register first vendor
        navigate(`/auth/business?referrer=${window.location.href}`);
      } else {
        localStorage.setItem('vendorId', response?.vendors?.[0]?.id);
      }
    });
  };
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard');
      getAllVendors();
    } else {
      navigate('/auth/login');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout>
      <div className="grid h-screen place-items-center">
        <Card>Welcome to dashboard!</Card>
      </div>
    </UserLayout>
  );
}
