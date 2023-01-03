import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import { Card } from '../components/Card';
import { isLoggedIn } from '../router/routes';
import { VendorService } from '../services/VendorService';
import { getVendorPermissions } from '../utils';

export default function VendorDashboard() {
  const [vendorPermissions, setVendorPermissions] = useState<string[]>([]);
  const navigate = useNavigate();
  const getAllVendors = () => {
    const vendorService = new VendorService();
    vendorService.listVendors().then(({ response }) => {
      if (!response?.vendors?.length) {
        navigate('/dashboard/user');
      } else {
        vendorService
          .getVendorPermissions(response?.vendors?.[0]?.id)
          .then(({ response: { permissions } }) => {
            setVendorPermissions(permissions);
            localStorage.setItem('permissions', JSON.stringify(permissions));
          });
        localStorage.setItem('vendorId', response?.vendors?.[0]?.id);
      }
    });
  };
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard/vendor');
      getAllVendors();
      setVendorPermissions(getVendorPermissions());
    } else {
      navigate('/auth/login');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout vendorPermissions={vendorPermissions}>
      <div className="grid h-screen place-items-center">
        <Card>Welcome to vendor dashboard!</Card>
      </div>
    </UserLayout>
  );
}
