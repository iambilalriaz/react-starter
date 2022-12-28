import { useLocation } from 'react-router-dom';
import { getSelectedItem } from '../../utils';
import { Button } from '../Button';

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="navbar fixed top-0 w-[80%] justify-between bg-white px-6 font-semibold text-primary shadow-bottom">
      <p className="text-xl">{getSelectedItem(pathname)}</p>
      <div className="w-24">
        <Button type="button" classes="w-full" size="lg">
          Add
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
