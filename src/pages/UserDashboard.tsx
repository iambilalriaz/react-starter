import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TbLoader } from 'react-icons/tb';
import UserLayout from '../layouts/UserLayout';
import { isLoggedIn } from '../router/routes';
import { isVendor } from '../utils';
import BaseCard from '../features/influencer/components/BaseCard';
import { checkingInfluencerSelector } from '../lib/stateSelectors';

export default function UserDashboard() {
  const checkingInfluencer = useSelector(checkingInfluencerSelector);

  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate('/influencer/intro');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/${isVendor() ? 'vendor' : 'user'}/dashboard`);
    } else {
      navigate('/auth/login');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout navText="Dashboard">
      <div className="grid h-screen place-items-center">
        {checkingInfluencer ? (
          <div className="animated-icon flex justify-center">
            <TbLoader size="50" />
          </div>
        ) : (
          <BaseCard onButtonClick={onButtonClick} />
        )}
      </div>
    </UserLayout>
  );
}
