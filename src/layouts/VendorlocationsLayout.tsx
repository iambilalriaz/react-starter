/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { getOptions, getVendorServiceClient } from '../constants';
// import { AddLocation } from '../features/vendor/components/AddLocation';
import { ViewLocations } from '../features/vendor/components/ViewLocations';

export function VendorlocationsLayout() {
  const [vendorID, setVendorID] = useState('');
  const getCurrentVendorID = () => {
    useEffect(() => {
      getVendorServiceClient()
        .listVendors({}, getOptions())
        .then(({ response }) => {
          setVendorID(response?.vendors[0]?.id);
          console.log(vendorID);
        })
        .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return vendorID;
  };
  const vendorId = getCurrentVendorID();
  return (
    <div>
      <h2>Vendor locations</h2>
      <ViewLocations vendorId={vendorId} />
      {/* <AddLocation vendorId={vendorId} /> */}
    </div>
  );
}
