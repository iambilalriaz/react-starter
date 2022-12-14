import { Link } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import DarkLogo from '../../../../components/SVGS/DarkLogo';
import Menu from '../../../../components/SVGS/Menu';

const AuthHeader = () => {
  return (
    <div className="bg-white shadow-bottom sticky top-0 flex items-center">
      <div className="border-r border-primary p-4">
        <Menu />
      </div>
      <div className="w-full flex justify-between items-center px-4 py-2.5">
        <div>
          <DarkLogo width="99" height="14" />
        </div>
        <div>
          <Link to="/signup" className="text-xs text-primary mr-3">
            Sign Up
          </Link>
          <Button>
            <Link to="/login" className="text-white text-xs font-medium">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
