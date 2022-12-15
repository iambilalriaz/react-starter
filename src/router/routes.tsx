import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

export const routes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/code',
    element: <ForgotPassword />
  }
];
