/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import locationIcon from '../../../../assets/location.svg';
import { Button } from '../../../../components/Button';
import mapImage from '../../../../assets/map.svg';
import { getVendorPermissions } from '../../../../utils';
import { ILocationProps } from '../ViewLocations';

export interface ILocationCardProps {
  location: ILocationProps;
  deleteLocation: (locationId: string) => void;
  editLocation: (location: ILocationProps) => void;
  handleForm: () => void;
}

export function LocationCard({
  location,
  deleteLocation,
  editLocation,
  handleForm
}: ILocationCardProps) {
  return (
    <div className="mb-12  rounded-md shadow-5xl">
      <img src={mapImage} alt="" />
      <div className="p-4">
        <div className="flex items-center ">
          <img src={locationIcon} alt="location" />
          <p className="ml-2 text-accent">
            {location?.address1}, {location?.city}, {location?.state} {location?.zip},{' '}
            {location?.country}
          </p>
        </div>
        {getVendorPermissions()?.includes('admin') ? (
          <div className="mt-6 flex gap-4">
            <Button
              onClick={() => {
                editLocation(location);
                handleForm();
              }}
            >
              Edit
            </Button>
            <Button onClick={() => deleteLocation(location.id)}>Delete</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
