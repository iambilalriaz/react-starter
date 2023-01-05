import { Card } from '../components/Card';
import UserLayout from '../layouts/UserLayout';
import { getVendorPermissions } from '../utils';

const VendorChats = () => {
  return (
    <UserLayout navText="Chats" vendorPermissions={getVendorPermissions()}>
      <div className="mt-20 mb-4 flex w-full gap-4 px-4">
        <div className="w-[70%]">
          <Card>Hello</Card>
        </div>
        <div className="w-[30%]">
          <Card>Hello</Card>
        </div>
      </div>
    </UserLayout>
  );
};

export default VendorChats;
