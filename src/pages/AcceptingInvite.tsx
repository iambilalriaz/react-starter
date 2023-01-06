import { useEffect, useState } from 'react';
import { TbLoader } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { getQueryParam } from '../constants';
import { isLoggedIn } from '../router/routes';
import { VendorService } from '../services/VendorService';
import { getLoggedInUser } from '../utils';

const AcceptingInvite = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const inviteCode = getQueryParam('inviteCode') || '';

    if (!isLoggedIn()) {
      localStorage.setItem('inviteCode', inviteCode);
      navigate('/auth/login');
    } else {
      const vendorService = new VendorService();
      vendorService
        .acceptInvite(inviteCode)
        .then(() => {
          setError(false);
          const user = getLoggedInUser();
          localStorage.setItem('user', JSON.stringify({ ...user, role: 'vendor' }));
          navigate('/vendor/dashboard');
        })
        .catch(() => {
          setError(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grid h-screen place-items-center text-center text-xl">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          {error ? null : (
            <div className="animated-icon flex justify-center">
              <TbLoader size="50" />
            </div>
          )}
          <p>{error ? 'Failed to accept invite.' : 'Accepting Invite...'}</p>
        </div>
      </div>
    </div>
  );
};

export default AcceptingInvite;
