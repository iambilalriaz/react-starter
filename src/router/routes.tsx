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

export const isLoggedIn = () => !!localStorage.getItem('accessToken');

export const routes = [
  {
    path: '/',
    element: <UserDashboard />
  },
  {
    path: '/dashboard',
    children: [
      {
        path: '/dashboard/vendor',
        element: <VendorDashboard />
      },
      {
        path: '/dashboard/user',
        element: <UserDashboard />
      }
    ]
  },
  {
    path: '/locations',
    element: <Locations />
  },
  {
    path: '/users',
    element: <Users />
  },
  {
    path: '/vendor/invite',
    element: <AcceptingInvite />
  },
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
  { path: '/vendor/onboarding', element: <RegisterVendor /> },
  {
    path: '/influencer/register',
    children: [
      { path: '/influencer/register/intro', element: <RegisterInfluencer page="Introduction" /> },
      { path: '/influencer/register/profile', element: <RegisterInfluencer page="Profile" /> }
    ]
  }
];
