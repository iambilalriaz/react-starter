import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbLoader } from 'react-icons/tb';
import UserLayout from '../layouts/UserLayout';
import { isLoggedIn } from '../router/routes';
import { getLoggedInUser } from '../utils';
import BaseCard from '../features/influencer/components/BaseCard';
import { InfluencerService } from '../services/InfluencerService';

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [isInfluencer, setInfluencer] = useState(false);
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate('/influencer/register/intro');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/dashboard/${getLoggedInUser()?.role}`);
      if (getLoggedInUser()?.role === 'user') {
        setLoading(true);
        const influencerService = new InfluencerService();
        influencerService
          .getInfluencerProfile()
          .then(() => {
            setInfluencer(true);
            setLoading(false);
          })
          .catch(() => {
            setInfluencer(false);
            setLoading(false);
          });
      }
    } else {
      navigate('/auth/login');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserLayout navText="Dashboard" isInfluencer={isInfluencer}>
      <div className="grid h-screen place-items-center">
        {loading ? (
          <div className="animated-icon flex justify-center">
            <TbLoader size="50" />
          </div>
        ) : (
          <BaseCard isInfluencer={isInfluencer} onButtonClick={onButtonClick} />
        )}
      </div>
    </UserLayout>
  );
}
