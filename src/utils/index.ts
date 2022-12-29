import moment from 'moment';
import { AuthService } from '../services/AuthService';

export const getAccessToken = async () => {
  const expiryTime = localStorage.getItem('expiryTime');

  if (moment(expiryTime).isAfter(moment())) {
    return localStorage.getItem('accessToken');
  }
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const authService = new AuthService();
  const { response } = await authService.refreshToken(refreshToken);
  localStorage.setItem('accessToken', response?.accessToken);
  localStorage.setItem('refreshToken', response?.refreshToken);
  localStorage.setItem('expiryTime', `${moment().add(25, 'minute')}`);
  return response?.accessToken;
};

export const getSelectedItem = (pathname: string) => {
  const selectedItem = pathname.slice(1);
  return `${selectedItem?.[0]?.toUpperCase()}${selectedItem.slice(1)}`;
};

export const getVendorId = () => localStorage?.getItem('vendorId') || '';
export const getLoggedInUser = () => localStorage?.getItem('user') || null;
