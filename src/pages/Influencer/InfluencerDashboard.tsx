import { TbLoader } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { Card } from '../../components/Card';
import UserLayout from '../../layouts/UserLayout';
import { checkingInfluencerSelector } from '../../lib/stateSelectors';

const InfluencerDashboard = () => {
  const checkingInfluencer = useSelector(checkingInfluencerSelector);

  return (
    <UserLayout navText="Influencer Dashboard">
      <div className="grid h-screen place-items-center">
        {checkingInfluencer ? (
          <div className="animated-icon flex justify-center">
            <TbLoader size="50" />
          </div>
        ) : (
          <Card>Welcome to influencer dashboard!</Card>
        )}
      </div>
    </UserLayout>
  );
};

export default InfluencerDashboard;
