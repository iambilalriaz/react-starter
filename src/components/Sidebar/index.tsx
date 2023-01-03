/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../SVGS/Logo';
import Logout from '../SVGS/sidebar/Logout';
import { userItems, vendorItems } from './items';
import { getLoggedInUser } from '../../utils';
import { Switch } from '../SVGS/sidebar/Switch';
import { VendorService } from '../../services/VendorService';

type SidebarProps = {
  selectedItem: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedItem: (item: string) => void;
  vendorPermissions: string[];
};

type ItemType = {
  label: string;
  Icon: (props: { color: string }) => JSX.Element;
};
const Sidebar = ({ vendorPermissions, selectedItem, setSelectedItem }: SidebarProps) => {
  const [vendorSidebarItems, setVendorSidebarItems] = useState<ItemType[]>([]);
  const [currentRole, setCurrentRole] = useState(getLoggedInUser()?.role);

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/auth/login', { replace: true });
  };
  const onSwitch = () => {
    setCurrentRole((prevRole: string) => (prevRole === 'user' ? 'vendor' : 'user'));
    const switchedRole = currentRole === 'user' ? 'vendor' : currentRole === 'vendor' ? 'user' : '';
    const updatedUser = {
      ...getLoggedInUser(),
      role: switchedRole
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate(`/dashboard/${switchedRole}`);
  };
  useEffect(() => {
    if (currentRole === 'vendor') {
      if (!vendorPermissions?.includes('admin')) {
        if (!vendorPermissions?.includes('manage_users')) {
          setVendorSidebarItems(vendorItems?.filter((item) => item?.label !== 'Users'));
        } else {
          setVendorSidebarItems(
            vendorItems?.filter((item) => ['Dashboard', 'Users']?.includes(item?.label))
          );
        }
      } else {
        setVendorSidebarItems(vendorItems);
      }
    }
  }, [currentRole, vendorPermissions]);

  return (
    <div className="fixed left-0 flex h-screen w-[20%] flex-col justify-between bg-primary text-white">
      <div>
        <div className="flex justify-center p-8">
          <Logo width={154} height={22} />
        </div>
        <div className="text-grey">
          {(currentRole === 'vendor'
            ? vendorSidebarItems
            : currentRole === 'user'
            ? userItems
            : []
          )?.map(({ label, Icon }) => (
            <button
              key={label}
              className={`my-4 w-[90%] rounded-tr-md rounded-br-md px-4 py-2 ${
                label === selectedItem
                  ? 'border-l-4 border-accent bg-mine-shaft text-white'
                  : 'border-l-4 border-primary'
              }`}
              type="button"
              onClick={() => {
                setSelectedItem(label);
                if (label === 'Dashboard') {
                  navigate(`/${label?.toLowerCase()}/${currentRole}`);
                } else {
                  navigate(`/${label?.toLowerCase()}`);
                }
              }}
            >
              <div className="flex items-center">
                <div>
                  <Icon color={label === selectedItem ? '#f5f5f5' : '#818181'} />
                </div>
                <div className="ml-4">{label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="my-12">
        <button className="flex items-center px-4 py-8" type="button" onClick={onSwitch}>
          <div>
            <Switch />
          </div>
          <div className="ml-4">
            Switch to{' '}
            {getLoggedInUser()?.role === 'user'
              ? 'vendor'
              : getLoggedInUser()?.role === 'vendor'
              ? 'user'
              : ''}
          </div>
        </button>
        <button className="block px-4 py-2" type="button" onClick={onLogout}>
          <Link to="/auth/login" className="flex items-center">
            <div>
              <Logout />
            </div>
            <div className="ml-4">Logout</div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
