import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getSelectedItem } from '../utils';

const UserLayout = ({
  vendorPermissions,
  children,
  navText
}: {
  vendorPermissions?: string[];
  children: JSX.Element;
  navText: string;
}) => {
  const { pathname } = useLocation();
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  useEffect(() => {
    setSelectedItem(
      getSelectedItem(pathname)?.includes('Dashboard') ? 'Dashboard' : getSelectedItem(pathname)
    );
  }, [pathname]);
  return (
    <div className="flex">
      <div className="w-[20%]">
        <Sidebar
          vendorPermissions={vendorPermissions}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>
      <div className="w-[80%]">
        <Navbar navText={navText} />
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
