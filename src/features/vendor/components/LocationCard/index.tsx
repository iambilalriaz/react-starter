/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import locationIcon from '../../../../assets/location.svg';
import { Button } from '../../../../components/Button';
import { ILocationInterface } from '../../../../lib/types';
import { getSelectedLocation } from '../../vendorSlices/selectedLocationSlice';
import { toggleForm } from '../../vendorSlices/formHandleSlice';
import mapImage from '../../../../assets/map.svg';
import { getVendorPermissions } from '../../../../utils';
import { isFormOpenSelector } from '../../../../lib/stateSelectors';

export interface ILocationCardProps {
  location: ILocationInterface;
  deleteLocation: (locationId: string) => void;
}

export function LocationCard({ location, deleteLocation }: ILocationCardProps) {
  const dispatch = useDispatch();
  const isFormOpen = useSelector(isFormOpenSelector);

  return (
    <div className="mb-12  rounded-md shadow-5xl">
      <img loading="lazy" src={mapImage} alt="" />
      <div className="p-4">
        <div className="flex items-center ">
          <img loading="lazy" src={locationIcon} alt="location" />
          <p className="ml-2 text-accent">
            {location?.address1}, {location?.city}, {location?.state} {location?.zip},{' '}
            {location?.country}
          </p>
        </div>
        {getVendorPermissions()?.includes('admin') ? (
          <div className="mt-6 flex justify-end gap-4">
            <Button
              classes="min-w-[5rem]"
              onClick={() => {
                dispatch(getSelectedLocation(location));
                dispatch(toggleForm(!isFormOpen));
              }}
            >
              Edit
            </Button>
            <Button
              classes="min-w-[5rem]"
              variant="secondary"
              onClick={() => deleteLocation(location.id)}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
