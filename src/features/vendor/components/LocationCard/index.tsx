/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import locationIcon from '../../../../assets/location.svg';
import { Button } from '../../../../components/Button';
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
    <div className="mb-12 w-[300px] rounded-md p-4 shadow-5xl">
      <div className="flex flex-col gap-3 ">
        <div className="mb-4 flex gap-2">
          <img src={locationIcon} alt="location" />
          <h3 className="text-xl font-medium">Vendor Location</h3>
        </div>

        <div>
          <span>Addres 1</span>: <span className="font-bold">{location.address1}</span>
        </div>
        <div>
          <span>Addres 2</span>: <span className="font-bold">{location.address2}</span>
        </div>

        <div>
          <span>Zip</span>: <span className="font-bold">{location.zip}</span>
        </div>
        <div>
          <span>City</span>: <span className="font-bold">{location.city}</span>
        </div>

        <div>
          <span>State</span>: <span className="font-bold">{location.state}</span>
        </div>
        <div>
          <span>Country</span>: <span className="font-bold">{location.country}</span>
        </div>
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
  );
}
