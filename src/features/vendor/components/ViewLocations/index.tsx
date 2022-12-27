/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { getOptions, getVendorServiceClient } from '../../../../constants';
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
  editlocation: (location: ILocationProps) => void;
  setAllLocationsData: React.Dispatch<React.SetStateAction<ILocationProps[]>>;
  allLocationsData: ILocationProps[];
}

export function ViewLocations({
  vendorId,
  setAllLocationsData,
  allLocationsData,
  editlocation,
  handleForm
}: viewLocationsProps) {
  const deleteLocation = (locationId: string) => {
    getVendorServiceClient()
      .deleteLocation(
        {
          locationId,
          vendorId
        },
        getOptions()
      )
      .then(() => {
        setAllLocationsData(
          allLocationsData.filter((location: ILocationProps) => location.id !== locationId)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {allLocationsData?.map((location: ILocationProps) => (
        <LocationCard
          deleteLocation={deleteLocation}
          key={location?.id}
          location={location}
          editlocation={editlocation}
          handleForm={handleForm}
        />
      ))}
    </div>
  );
}
