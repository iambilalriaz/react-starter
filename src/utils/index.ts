import moment from 'moment';
import { SidebarItemType } from '../lib/types';
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

export const getVendorId = () => localStorage?.getItem('vendorId') || '';
export const getInfluencerId = () => localStorage?.getItem('influencerId') || '';
export const getLoggedInUser = () => JSON.parse(localStorage?.getItem('user')) || null;
export const getVendorPermissions = () => JSON.parse(localStorage.getItem('permissions'));
export const getSelectedItem = (items: SidebarItemType[]) =>
  items?.length ? items?.find((item) => item?.path === window.location.pathname)?.label || '' : '';

export const influencerId = 'ysGSs361qDH6kWc6hcVi';
export const vendorId = '2tv6VtI0Jc5jDirEJVMV';
