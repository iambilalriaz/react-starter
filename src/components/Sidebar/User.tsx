/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCheckingInfluencer } from '../../features/influencer/influencerSlices/checkingInfluencerSlice';
import { setIsInfluencer } from '../../features/influencer/influencerSlices/isInfluencerSlice';
import { selectedSidebarItemSelector } from '../../lib/stateSelectors';
import { SidebarItemType } from '../../lib/types';
import { InfluencerService } from '../../services/InfluencerService';
import { getInfluencerId, getLoggedInUser, getSelectedItem } from '../../utils';
import Logo from '../SVGS/Logo';
import { userItems } from './items';
import { setSelectedSidebarItem } from './selectedSidebarItemSlice';

const User = () => {
  const selectedSidebarItem = useSelector(selectedSidebarItemSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setSelectedSidebarItem(getSelectedItem(userItems)));
    if (getLoggedInUser()?.role === 'user') {
      const influencerService = new InfluencerService();
      influencerService
        .getInfluencerProfile()
        .then(({ response }) => {
          dispatch(setIsInfluencer(true));
          dispatch(setCheckingInfluencer(false));
          if (!getInfluencerId()) {
            localStorage.setItem('influencerId', response?.id);
          }
        })
        .catch(() => {
          dispatch(setIsInfluencer(false));
          dispatch(setCheckingInfluencer(false));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-center p-8">
        <Logo width={154} height={22} />
      </div>
      <div className="text-grey">
        {userItems?.map(({ label, Icon, path }) => (
          <button
            key={label}
            className={`my-4 w-[90%] rounded-tr-md rounded-br-md px-4 py-2 ${
              label === selectedSidebarItem
                ? 'border-l-4 border-accent bg-mine-shaft text-white'
                : 'border-l-4 border-primary'
            }`}
            type="button"
            onClick={() => navigate(path)}
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

export default User;
