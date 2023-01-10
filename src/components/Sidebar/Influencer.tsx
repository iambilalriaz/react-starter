import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { RxCaretDown, RxCaretRight } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../SVGS/Logo';
import { influencerItems } from './items';
import { selectedSidebarItemSelector } from '../../lib/stateSelectors';
import { setSelectedSidebarItem } from './selectedSidebarItemSlice';

const Influencer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedSidebarItem = useSelector(selectedSidebarItemSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const getCurrentPath = useCallback(() => {
    const path = window.location.pathname;
    const parentPath = influencerItems?.find(
      (item) => item?.path === path || item?.children?.map((i) => i?.path)?.includes(path)
    );
    if (!parentPath?.children?.length) {
      dispatch(setSelectedSidebarItem(parentPath?.label || ''));
    } else {
      const childPath = parentPath?.children?.find((i) => i?.path === path);
      dispatch(setSelectedSidebarItem(childPath?.label || ''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCurrentPath();
  }, [getCurrentPath]);

  return (
    <div>
      <div className="flex justify-center p-8">
        <Logo width={154} height={22} />
      </div>
      <div className="text-grey">
        {influencerItems?.map(({ label, Icon, path, children }) => (
          <Fragment key={label}>
            <button
              className={`my-4 w-[90%] rounded-tr-md rounded-br-md px-4 py-2 ${
                label === selectedSidebarItem ||
                children?.map((item) => item?.label)?.includes(selectedSidebarItem)
                  ? 'border-l-4 border-accent bg-mine-shaft text-white'
                  : 'border-l-4 border-primary'
              }`}
              type="button"
              onClick={() => {
                if (children?.length) {
                  toggleDropdown();
                } else {
                  dispatch(setSelectedSidebarItem(label));
                  navigate(path);
                }
              }}
            >
              <div className="relative flex items-center">
                <div>
                  <Icon
                    color={
                      label === selectedSidebarItem ||
                      children?.map((item) => item?.label)?.includes(selectedSidebarItem)
                        ? '#f5f5f5'
                        : '#818181'
                    }
                  />
                </div>
                <div className="ml-4">{label}</div>
                {label === 'Dashboard' ? (
                  <div className="absolute right-0">
                    {dropdownOpen ? <RxCaretDown /> : <RxCaretRight />}
                  </div>
                ) : null}
              </div>
            </button>
            {dropdownOpen
              ? children?.map((route) => (
                  <button
                    key={route?.label}
                    type="button"
                    className="ml-8 flex items-center text-sm leading-8"
                    onClick={() => {
                      dispatch(setSelectedSidebarItem(route?.label));
                      navigate(route?.path);
                    }}
                  >
                    <p className={`ml-4 ${pathname?.includes(route?.path) ? 'text-white' : ''}`}>
                      {route?.label}
                    </p>
                  </button>
                ))
              : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Influencer;
