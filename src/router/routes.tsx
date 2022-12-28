import CheckEmail from '../pages/CheckEmail';
import Dashboard from '../pages/Dashboard';
import LoggingIn from '../pages/LoggingIn';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import RegisterVendor from '../pages/ResgisterVendor';
import { OTPCodeCard } from '../pages/OTPCard';
import Locations from '../pages/Locations';
import Staff from '../pages/Staff';

export const isLoggedIn = () => !!localStorage.getItem('accessToken');

export const routes = [
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/locations',
    element: <Locations />
  },
  {
    path: '/staff',
    element: <Staff />
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
      },
      {
        path: '/auth/business',
        element: <RegisterVendor />
      }
    ]
  }
];
