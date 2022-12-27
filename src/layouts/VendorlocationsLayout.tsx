/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { getOptions, getVendorServiceClient } from '../constants';
import { AddLocation } from '../features/vendor/components/AddLocation';
import { EmptyState } from '../features/vendor/components/EmptState';
import { ILocationProps, ViewLocations } from '../features/vendor/components/ViewLocations';

interface IVendorlocationsLayoutProps {
  vendorId: string;
  toggleForm: boolean;
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleForm: () => void;
  editlocation: () => void;
  selectedLocation: ILocationProps;
}

export function VendorlocationsLayout({
  vendorId,
  toggleForm,
  setToggleForm,
  handleForm,
  editlocation,
  selectedLocation
}: IVendorlocationsLayoutProps) {
  const [allLocationsData, setAllLocationsData] = useState<ILocationProps[]>([]);
  useEffect(() => {
    getVendorServiceClient()
      .listLocations({ vendorId }, getOptions())
      .then(({ response }) => {
        console.log(response?.locations);
        setAllLocationsData(response?.locations);
      })
      .catch((err) => console.log(err));
  }, [vendorId]);
  return (
    <div className="grid h-screen place-items-center">
      {toggleForm ? (
        <div>
          <AddLocation
            allLocationsData={allLocationsData}
            setAllLocationsData={setAllLocationsData}
            vendorId={vendorId}
            setToggleForm={setToggleForm}
            selectedLocation={selectedLocation}
          />
        </div>
      ) : allLocationsData.length ? (
        <ViewLocations
          allLocationsData={allLocationsData}
          setAllLocationsData={setAllLocationsData}
          vendorId={vendorId}
          editlocation={editlocation}
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
