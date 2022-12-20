import CheckEmail from '../pages/CheckEmail';
import Home from '../pages/Home';
import LoggingIn from '../pages/LoggingIn';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import RegisterVendor from '../pages/ResgisterVendor';
import { OTPCodeCard } from '../pages/OTPCard';

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/home',
    element: <Home />
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
