import CheckEmail from '../pages/CheckEmail';
import LoggingIn from '../pages/LoggingIn';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import RegisterVendor from '../pages/ResgisterVendor';
import { OTPCodeCard } from '../pages/OTPCard';
import Locations from '../pages/Locations';
import Users from '../pages/Users';
import AcceptingInvite from '../pages/AcceptingInvite';
import UserDashboard from '../pages/UserDashboard';
import VendorDashboard from '../pages/VendorDashboard';
import RegisterInfluencer from '../pages/Influencer/RegisterInfluencer';
import InfluencerDashboard from '../pages/Influencer/InfluencerDashboard';
import VendorChats from '../pages/VendorChats';

export const isLoggedIn = () => !!localStorage.getItem('accessToken');

export const routes = [
  // auth routes
  {
    path: '/auth',
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/signup',
        element: <SignUp />
      },

      {
        path: '/auth/email',
        element: <CheckEmail />
      },
      {
        path: '/auth/logging-in',
        element: <LoggingIn />
      },
      {
        path: '/auth/otp',
        element: <OTPCodeCard />
      }
    ]
  },

  {
    path: '/',
    element: <UserDashboard />
  },
  {
    path: '/user/dashboard',
    element: <UserDashboard />
  },

  // vendor routes
  {
    path: '/vendor',
    children: [
      {
        path: '/vendor/dashboard',
        element: <VendorDashboard />
      },
      {
        path: '/vendor/locations',
        element: <Locations />
      },
      {
        path: '/vendor/users',
        element: <Users />
      },
      {
        path: '/vendor/invite',
        element: <AcceptingInvite />
      },

      { path: '/vendor/onboarding', element: <RegisterVendor /> },
      { path: '/vendor/chats', element: <VendorChats /> }
    ]
  },

  // influencer routes
  {
    path: '/influencer',
    children: [
      {
        path: '/influencer/dashboard',
        element: <InfluencerDashboard />
      },
      { path: '/influencer/intro', element: <RegisterInfluencer page="Introduction" /> },
      { path: '/influencer/profile', element: <RegisterInfluencer page="Profile" /> },
      {
        path: '/influencer/chats',
        element: <VendorChats />
      }
    ]
  }
];
