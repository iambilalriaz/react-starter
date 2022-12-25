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
  initialValues,
  setFormValues,
  selectedLocation,
  editlocation,
  formValues,
  setHandleLocationData,
  handleLocationData
}: IVendorlocationsLayoutProps) {
  const [allLocationsData, setAllLocationsData] = useState([]);
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
            // addButtonClicked={addButtonClicked}
            // setAddButtonClicked={setAddButtonClicked}
            initialValues={initialValues}
            handleLocationData={handleLocationData}
            setHandleLocationData={setHandleLocationData}
            formValues={formValues}
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
        // addButtonClicked={addButtonClicked}
        setFormValues={setFormValues}
        setHandleLocationData={setHandleLocationData}
      />
    </div>
  );
}
