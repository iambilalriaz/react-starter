import { useState } from 'react';
import { Card } from '../components/Card';
import InvitesTable from '../features/vendor/components/InvitesTable';
import InviteUser from '../features/vendor/components/InviteUser';
import UserLayout from '../layouts/UserLayout';

const Users = () => {
  const [invitingUser, setInvitingUser] = useState(false);

  return (
    <UserLayout>
      <div className="mt-20 w-full px-4">
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
