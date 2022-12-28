import { Link } from 'react-router-dom';
import Logo from '../SVGS/Logo';
import { items } from './items';

type SidebarProps = {
  selectedItem: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedItem: (item: string) => void;
};

const Sidebar = ({ selectedItem, setSelectedItem }: SidebarProps) => {
  return (
    <div className="h-screen bg-primary text-white">
      <div className="flex justify-center p-8">
        <Logo width={154} height={22} />
      </div>
      <div className="text-grey">
        {items?.map(({ label, Icon }) => (
          <button
            key={label}
            className={`my-4 w-[90%] cursor-pointer rounded-tr-md rounded-br-md px-4 py-2 ${
              label === selectedItem
                ? 'border-l-4 border-accent bg-mine-shaft text-white'
                : 'border-l-4 border-primary'
            }`}
            type="button"
            onClick={() => setSelectedItem(label)}
          >
            <Link to={`/${label.toLowerCase()}`} className="flex items-center">
              <div>
                <Icon color={label === selectedItem ? '#f5f5f5' : '#818181'} />
              </div>
              <div className="ml-4">{label}</div>
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
