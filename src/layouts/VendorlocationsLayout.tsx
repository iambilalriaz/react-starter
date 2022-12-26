/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { AddLocation } from '../features/vendor/components/AddLocation';
import { ViewLocations } from '../features/vendor/components/ViewLocations';

interface IVendorlocationsLayoutProps {
  vendorId: string;
  toggleForm: boolean;
  setToggleForm: boolean;
  handleForm: () => void;
}

export function VendorlocationsLayout({
  vendorId,
  toggleForm,
  setToggleForm,
  handleForm,
  editlocation,
  selectedLocation
}: IVendorlocationsLayoutProps) {
  const [allLocationsData, setAllLocationsData] = useState([]);

  return (
    <div>
      {toggleForm ? (
        <div className="fixed">
          <AddLocation
            allLocationsData={allLocationsData}
            setAllLocationsData={setAllLocationsData}
            vendorId={vendorId}
            setToggleForm={setToggleForm}
            selectedLocation={selectedLocation}
          />
        </div>
      ) : (
        ''
      )}
      <ViewLocations
        allLocationsData={allLocationsData}
        setAllLocationsData={setAllLocationsData}
        vendorId={vendorId}
        editlocation={editlocation}
        toggleForm={toggleForm}
        handleForm={handleForm}
      />
    </div>
  );
}
