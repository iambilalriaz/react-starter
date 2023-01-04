import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import { VendorlocationsLayout } from '../layouts/VendorlocationsLayout';
import { isLoggedIn } from '../router/routes';
import { getVendorPermissions } from '../utils';

const Locations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserLayout vendorPermissions={getVendorPermissions()}>
      <div className="mt-20 w-full px-4">
        <VendorlocationsLayout />
      </div>
    </UserLayout>
  );
};

export default Locations;
