/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { RxCaretDown, RxCaretRight } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import Logo from '../SVGS/Logo';
import Logout from '../SVGS/sidebar/Logout';
import { influencerItems, userItems, vendorItems } from './items';
import { getLoggedInUser, isInfluencer, isVendor } from '../../utils';
import { Switch } from '../SVGS/sidebar/Switch';
import { VendorService } from '../../services/VendorService';
import User from './User';
import Vendor from './Vendor';
import Influencer from './Influencer';
import { isInfluencerSelector } from '../../lib/stateSelectors';

type VendorSidebarProps = {
  vendorPermissions?: string[];
};

const Sidebar = ({ vendorPermissions }: VendorSidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogout = () => {
    localStorage.clear();
    navigate('/auth/login', { replace: true });
  };

  const updateUserRole = () => {
    const switchedRole = !isVendor() ? 'vendor' : 'user';
    navigate(`/${switchedRole}/dashboard`);
  };

  const onSwitch = async () => {
    if (!isVendor()) {
      const vendorService = new VendorService();
      const { response } = await vendorService.listVendors();
      if (response?.vendors?.length) {
        updateUserRole();
      } else {
        navigate(`/vendor/onboarding?referrer=${window.location.href}`);
      }
    } else {
      updateUserRole();
      localStorage.removeItem('influencerId');
    }
  };

  return (
    <div className="fixed left-0 flex h-screen w-[20%] flex-col justify-between bg-primary text-white">
      {!isVendor() ? (
        isInfluencer() ? (
          <Influencer />
        ) : (
          <User />
        )
      ) : isVendor() ? (
        <Vendor vendorPermissions={vendorPermissions} />
      ) : null}
      <div className="my-12">
        <button className="flex items-center px-4 py-8" type="button" onClick={onSwitch}>
          <div>
            <Switch />
          </div>
          <div className="ml-4">Switch to {!isVendor() ? 'vendor' : isVendor() ? 'user' : ''}</div>
        </button>
        <button className="block px-4 py-2" type="button" onClick={onLogout}>
          <Link to="/auth/login" className="flex items-center">
            <div>
              <Logout />
            </div>
            <div className="ml-4">Logout</div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
