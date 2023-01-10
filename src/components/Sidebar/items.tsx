/* eslint-disable no-unused-vars */
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import Dashboard from '../SVGS/sidebar/Dashboard';
import Locations from '../SVGS/sidebar/Locations';
import Users from '../SVGS/sidebar/Users';

export const vendorItems = [
  {
    label: 'Dashboard',
    Icon: (props: { color: string }) => <Dashboard {...props} />,
    path: '/vendor/dashboard'
  },
  {
    label: 'Locations',
    Icon: (props: { color: string }) => <Locations {...props} />,
    path: '/vendor/locations'
  },
  {
    label: 'Users',
    Icon: (props: { color: string }) => <Users {...props} />,
    path: '/vendor/users'
  },
  {
    label: 'Chats',
    Icon: () => <BsFillChatSquareDotsFill />,
    path: '/vendor/chats'
  }
];
export const userItems = [
  {
    label: 'Dashboard',
    Icon: (props: { color: string }) => <Dashboard {...props} />,
    path: '/user/dashboard'
  }
];
export const influencerItems = [
  {
    label: 'Dashboard',
    path: '/user/dashboard',
    Icon: (props: { color: string }) => <Dashboard {...props} />,
    children: [
      {
        label: 'User',
        path: '/user/dashboard'
      },
      {
        label: 'Influencer',
        path: '/influencer/dashboard'
      }
    ]
  },
  {
    label: 'Chats',
    Icon: (props: { color: string }) => <Dashboard {...props} />,
    path: '/influencer/chats',
    children: []
  }
];
