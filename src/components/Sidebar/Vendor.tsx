/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../SVGS/Logo';
import { vendorItems } from './items';
import { getLoggedInUser } from '../../utils';
import { selectedSidebarItemSelector } from '../../lib/stateSelectors';
import { setSelectedSidebarItem } from './selectedSidebarItemSlice';
import { SidebarItemType } from '../../lib/types';

type SidebarProps = {
  vendorPermissions?: string[];
};

const Vendor = ({ vendorPermissions }: SidebarProps) => {
  const [vendorSidebarItems, setVendorSidebarItems] = useState<SidebarItemType[]>([]);
  const selectedSidebarItem = useSelector(selectedSidebarItemSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getSelectedItem = (items: SidebarItemType[]) =>
    items?.length
      ? items?.find((item) => item?.path === window.location.pathname)?.label || ''
      : '';
  useEffect(() => {
    if (getLoggedInUser()?.role === 'vendor') {
      if (!vendorPermissions?.includes('admin')) {
        if (!vendorPermissions?.includes('manage_users')) {
          const items = vendorItems?.filter((item) => item?.label !== 'Users');
          setVendorSidebarItems(items);
          if (items?.length) {
            dispatch(setSelectedSidebarItem(getSelectedItem(items)));
          }
        } else {
          setVendorSidebarItems(vendorItems);
          dispatch(setSelectedSidebarItem(getSelectedItem(vendorItems)));
        }
      } else {
        setVendorSidebarItems(vendorItems);
        dispatch(setSelectedSidebarItem(getSelectedItem(vendorItems)));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorPermissions]);

  return (
    <div>
      <div className="flex justify-center p-8">
        <Logo width={154} height={22} />
      </div>
      <div className="text-grey">
        {vendorSidebarItems?.map(({ label, Icon, path }) => (
          <button
            key={label}
            className={`my-4 w-[90%] rounded-tr-md rounded-br-md px-4 py-2 ${
              label === selectedSidebarItem
                ? 'border-l-4 border-accent bg-mine-shaft text-white'
                : 'border-l-4 border-primary'
            }`}
            type="button"
            onClick={() => {
              dispatch(setSelectedSidebarItem(label));
              navigate(path);
            }}
          >
            <div className="relative flex items-center">
              <div>
                <Icon color={label === selectedSidebarItem ? '#f5f5f5' : '#818181'} />
              </div>
              <div className="ml-4">{label}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Vendor;
