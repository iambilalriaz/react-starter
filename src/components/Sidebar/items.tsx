import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import Dashboard from '../SVGS/sidebar/Dashboard';
import Locations from '../SVGS/sidebar/Locations';
import Users from '../SVGS/sidebar/Users';

export const vendorItems = [
  {
    label: 'Dashboard',
    Icon: (props: { color: string }) => <Dashboard {...props} />
  },
  {
    label: 'Locations',
    Icon: (props: { color: string }) => <Locations {...props} />
  },
  {
    label: 'Users',
    Icon: (props: { color: string }) => <Users {...props} />
  },
  {
    label: 'Chats',
    Icon: () => <BsFillChatSquareDotsFill />
  }
];
export const userItems = vendorItems?.filter((item) => item?.label === 'Dashboard');
