/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';
import { AddLocation } from '../features/vendor/components/AddLocation';
import { EmptyState } from '../features/vendor/components/EmptState';
import { ILocationProps, ViewLocations } from '../features/vendor/components/ViewLocations';
import { VendorService } from '../services/VendorService';
import { getVendorId } from '../utils';

interface IVendorlocationsLayoutProps {
  toggleForm: boolean;
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleForm: () => void;
  // eslint-disable-next-line no-unused-vars
  editLocation: (currentLocation: ILocationProps) => void;
  selectedLocation: ILocationProps;
}

export function VendorlocationsLayout({
  toggleForm,
  setToggleForm,
  handleForm,
  editLocation,
  selectedLocation
}: IVendorlocationsLayoutProps) {
  const [allLocationsData, setAllLocationsData] = useState<ILocationProps[]>([]);

  const getAllLocations = useCallback(() => {
    const vendorService = new VendorService();
    vendorService.listLocations(getVendorId()).then(({ response }) => {
      setAllLocationsData(response?.locations);
    });
  }, []);

  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);
  return (
    <div className="grid place-items-center">
      {toggleForm ? (
        <AddLocation
          setAllLocationsData={setAllLocationsData}
          setToggleForm={setToggleForm}
          selectedLocation={selectedLocation}
        />
      ) : allLocationsData?.length ? (
        <ViewLocations
          allLocationsData={allLocationsData}
          setAllLocationsData={setAllLocationsData}
          editLocation={editLocation}
          handleForm={handleForm}
        />
      ) : (
        <div>
          <EmptyState />
        </div>
      )}
    </div>
  );
}
