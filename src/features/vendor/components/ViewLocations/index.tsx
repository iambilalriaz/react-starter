/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { VendorService } from '../../../../services/VendorService';
import { getVendorId } from '../../../../utils';
import { LocationCard } from '../LocationCard';
import { getAllLocationsData } from '../../vendorSlices/locationSlice';

export interface ILocationProps {
  id: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  hoursOfOperation: string[];
}

interface viewLocationsProps {
  handleForm: () => void;
  editLocation: (location: ILocationProps) => void;
}

export function ViewLocations({ editLocation, handleForm }: viewLocationsProps) {
  const dispatch = useDispatch();
  const allLocationsData = useSelector((state: RootState) => state.allLocationsData);

  const deleteLocation = async (locationId: string) => {
    const vendorService = new VendorService();
    vendorService
      .deleteLocation({
        locationId,
        vendorId: getVendorId()
      })
      .then(() => {
        dispatch(
          getAllLocationsData(
            allLocationsData?.filter((location: ILocationProps) => location.id !== locationId)
          )
        );
        // setAllLocationsData(
        //   allLocationsData?.filter((location: ILocationProps) => location.id !== locationId)
        // );
      });
  };

  return (
    <div className="mt-24 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {allLocationsData?.map((location: ILocationProps) => (
        <LocationCard
          deleteLocation={deleteLocation}
          key={location?.id}
          location={location}
          editLocation={editLocation}
          handleForm={handleForm}
        />
      ))}
    </div>
  );
}
