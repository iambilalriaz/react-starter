import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import InvitesTable from '../features/vendor/components/InvitesTable';
import InviteUser from '../features/vendor/components/InviteUser';
import UserLayout from '../layouts/UserLayout';
import { isLoggedIn } from '../router/routes';
import { getVendorPermissions } from '../utils';

const Users = () => {
  const [invitingUser, setInvitingUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/auth/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout vendorPermissions={getVendorPermissions()}>
      <div className="mt-20 mb-4 w-full px-4">
        <Card classes="px-0 py-0">
          {invitingUser ? (
            <InviteUser setInvitingUser={setInvitingUser} />
          ) : (
            <InvitesTable setInvitingUser={setInvitingUser} />
          )}
        </Card>
      </div>
    </UserLayout>
  );
};

export default Users;
