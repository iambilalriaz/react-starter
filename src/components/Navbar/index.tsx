import { useLocation } from 'react-router-dom';
import { getLoggedInUser, getSelectedItem, getVendorPermissions } from '../../utils';
import profileImg from '../../assets/profile.png';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="z-100 navbar fixed top-0 w-[80%] justify-between bg-white px-6 font-semibold text-primary shadow-bottom">
      <p className="text-xl">
        {getSelectedItem(pathname)?.includes('Dashboard') ? 'Dashboard' : getSelectedItem(pathname)}
      </p>
      <div
        className={`text-md ${
          pathname === '/locations' && getVendorPermissions()?.includes('admin') ? 'mr-24' : ''
        }`}
      >
        <img src={profileImg} width={30} alt="" />
        <span className="ml-2 text-sm font-normal text-accent">{getLoggedInUser()?.email}</span>
      </div>
    </div>
  );
};

export default Navbar;
