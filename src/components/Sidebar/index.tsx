import { Link, useNavigate } from 'react-router-dom';
import Logo from '../SVGS/Logo';
import Logout from '../SVGS/sidebar/Logout';
import { items } from './items';

type SidebarProps = {
  selectedItem: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedItem: (item: string) => void;
};

const Sidebar = ({ selectedItem, setSelectedItem }: SidebarProps) => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate('/auth/login', { replace: true });
  };
  return (
    <div className="fixed left-0 flex h-screen w-[20%] flex-col justify-between bg-primary text-white">
      <div>
        <div className="flex justify-center p-8">
          <Logo width={154} height={22} />
        </div>
        <div className="text-grey">
          {items?.map(({ label, Icon }) => (
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
                navigate(`/${label?.toLowerCase()}`);
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
        <button className="px-4 py-2" type="button" onClick={onLogout}>
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
