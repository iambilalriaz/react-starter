/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { VendorService } from '../../../../services/VendorService';
import { LocationCard } from '../LocationCard';

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
  vendorId: string;
  handleForm: () => void;
  editLocation: (location: ILocationProps) => void;
  setAllLocationsData: React.Dispatch<React.SetStateAction<ILocationProps[]>>;
  allLocationsData: ILocationProps[];
}

export function ViewLocations({
  vendorId,
  setAllLocationsData,
  allLocationsData,
  editLocation,
  handleForm
}: viewLocationsProps) {
  const deleteLocation = async (locationId: string) => {
    const vendorService = new VendorService();
    vendorService
      .deleteLocation({
        locationId,
        vendorId
      })
      .then(() => {
        setAllLocationsData(
          allLocationsData?.filter((location: ILocationProps) => location.id !== locationId)
        );
      });
  };

  return (
    <div className="1 mt-24  grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
