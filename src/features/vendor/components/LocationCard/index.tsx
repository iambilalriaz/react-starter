/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import locationIcon from '../../../../assets/location.svg';
import { Button } from '../../../../components/Button';
import { ILocationInterface } from '../../../../lib/types';
import { getSelectedLocation } from '../../vendorSlices/selectedLocationSlice';
import { toggleForm } from '../../vendorSlices/formHandleSlice';

export interface ILocationCardProps {
  location: ILocationInterface;
  deleteLocation: (locationId: string) => void;
}

export function LocationCard({ location, deleteLocation }: ILocationCardProps) {
  const dispatch = useDispatch();
  const isFormOpen = useSelector((state: RootState) => state.toggleForm);

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
      <div className="mt-6 flex gap-4">
        <Button
          onClick={() => {
            dispatch(getSelectedLocation(location));
            dispatch(toggleForm(!isFormOpen));
          }}
        >
          Edit
        </Button>
        <Button onClick={() => deleteLocation(location.id)}>Delete</Button>
      </div>
    </div>
  );
}
