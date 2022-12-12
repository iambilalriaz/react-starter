import { RouteObject } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: Login()
  },
  {
    path: '/login',
    element: Login()
  },
  {
    path: '/signup',
    element: SignUp()
  },
  {
    path: '/forgot-password',
    element: ForgotPassword()
  }
];
