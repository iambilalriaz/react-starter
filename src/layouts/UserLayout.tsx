import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const UserLayout = ({
  vendorPermissions,
  children,
  navText
}: {
  vendorPermissions?: string[];
  children: JSX.Element;
  navText: string;
}) => {
  return (
    <div className="flex">
      <div className="w-[20%]">
        <Sidebar vendorPermissions={vendorPermissions} />
      </div>
      <div className="w-[80%]">
        <Navbar navText={navText} />
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
