/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';
import { AddLocation } from '../features/vendor/components/AddLocation';
import { EmptyState } from '../features/vendor/components/EmptState';
import { ILocationProps, ViewLocations } from '../features/vendor/components/ViewLocations';
import { VendorService } from '../services/VendorService';

interface IVendorlocationsLayoutProps {
  vendorId: string;
  toggleForm: boolean;
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleForm: () => void;
  // eslint-disable-next-line no-unused-vars
  editLocation: (currentLocation: ILocationProps) => void;
  selectedLocation: ILocationProps;
}

export function VendorlocationsLayout({
  vendorId,
  toggleForm,
  setToggleForm,
  handleForm,
  editLocation,
  selectedLocation
}: IVendorlocationsLayoutProps) {
  const [allLocationsData, setAllLocationsData] = useState<ILocationProps[]>([]);

  const getAllLocations = useCallback(() => {
    const vendorService = new VendorService();
    vendorService.listLocations(vendorId).then(({ response }) => {
      setAllLocationsData(response?.locations);
    });
  }, [vendorId]);

  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);
  return (
    <div className="grid h-screen place-items-center">
      {toggleForm ? (
        <AddLocation
          allLocationsData={allLocationsData}
          setAllLocationsData={setAllLocationsData}
          vendorId={vendorId}
          setToggleForm={setToggleForm}
          selectedLocation={selectedLocation}
        />
      ) : allLocationsData?.length ? (
        <ViewLocations
          allLocationsData={allLocationsData}
          setAllLocationsData={setAllLocationsData}
          vendorId={vendorId}
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
