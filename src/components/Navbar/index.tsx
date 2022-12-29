import { useLocation } from 'react-router-dom';
import { getSelectedItem } from '../../utils';

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="navbar fixed top-0 w-[80%] justify-between bg-white px-6 font-semibold text-primary shadow-bottom">
      <p className="text-xl">{getSelectedItem(pathname)}</p>
    </div>
  );
};

export default Navbar;
