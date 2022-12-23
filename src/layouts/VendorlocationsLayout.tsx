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
  addButtonClicked: boolean;
  setAddButtonClicked: boolean;
}

export function VendorlocationsLayout({
  vendorId,
  toggleForm,
  setToggleForm,
  handleForm,
  addButtonClicked,
  setAddButtonClicked
}: IVendorlocationsLayoutProps) {
  const [allLocationsData, setAllLocationsData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const editlocation = (currentLocation: any) => {
    console.log('selected location', selectedLocation);
    setSelectedLocation(currentLocation);
  };
  console.log('from layout: ', selectedLocation);
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
            addButtonClicked={addButtonClicked}
            setAddButtonClicked={setAddButtonClicked}
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
        addButtonClicked={addButtonClicked}
      />
    </div>
  );
}
