/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { VendorService } from '../../../../services/VendorService';
import { getVendorId } from '../../../../utils';
import { EmptyState } from '../EmptState';
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
  editLocation: (location: ILocationProps) => void;
  setAllLocationsData: React.Dispatch<React.SetStateAction<ILocationProps[]>>;
  allLocationsData: ILocationProps[];
  setIsAddingLocation: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ViewLocations({
  setAllLocationsData,
  allLocationsData,
  editLocation,
  setIsAddingLocation
}: viewLocationsProps) {
  const deleteLocation = async (locationId: string) => {
    const vendorService = new VendorService();
    vendorService
      .deleteLocation({
        locationId,
        vendorId: getVendorId()
      })
      .then(() => {
        setAllLocationsData(
          allLocationsData?.filter((location: ILocationProps) => location.id !== locationId)
        );
      });
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {allLocationsData?.length ? (
        allLocationsData?.map((location: ILocationProps) => (
          <LocationCard
            deleteLocation={deleteLocation}
            key={location?.id}
            location={location}
            editLocation={editLocation}
            setIsAddingLocation={setIsAddingLocation}
          />
        ))
      ) : (
        <div className="pb-16">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
