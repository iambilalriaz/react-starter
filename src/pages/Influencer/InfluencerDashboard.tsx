import { Card } from '../../components/Card';
import UserLayout from '../../layouts/UserLayout';

const InfluencerDashboard = () => {
  return (
    <UserLayout isInfluencer navText="Influencer Dashboard">
      <div className="grid h-screen place-items-center">
        <Card>Welcome to influencer dashboard!</Card>
      </div>
    </UserLayout>
  );
};

export default InfluencerDashboard;
