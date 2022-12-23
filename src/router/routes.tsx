import { Navigate } from 'react-router-dom';
import CheckEmail from '../pages/CheckEmail';
import Home from '../pages/Home';
import LoggingIn from '../pages/LoggingIn';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import RegisterVendor from '../pages/ResgisterVendor';
import { OTPCodeCard } from '../pages/OTPCard';

const isLoggedIn = !!localStorage.getItem('accessToken');
export const routes = [
  {
    path: '/',
    element: isLoggedIn ? <Home /> : <Navigate to="/auth/login" />
  },
  {
    path: '/home',
    element: isLoggedIn ? <Home /> : <Navigate to="/auth/login" />
  },
  {
    path: '/auth',
    children: [
      {
        path: '/auth/login',
        element: !isLoggedIn ? <Login /> : <Navigate to="/home" />
      },
      {
        path: '/auth/signup',
        element: <SignUp />
      },

      {
        path: '/auth/email',
        element: !isLoggedIn ? <CheckEmail /> : <Navigate to="/home" />
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
        element: isLoggedIn ? <RegisterVendor /> : <Navigate to="/auth/login" />
      }
    ]
  }
];
