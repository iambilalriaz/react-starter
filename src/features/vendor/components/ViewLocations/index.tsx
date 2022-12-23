/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// import { Button } from '../../../../components/Button';
import { getOptions, getVendorServiceClient } from '../../../../constants';
// import { AddLocation } from '../AddLocation';
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
export function ViewLocations({ vendorId }) {
  const [allLocationsData, setAllLocationsData] = useState([]);
  useEffect(() => {
    getVendorServiceClient()
      // eslint-disable-next-line object-shorthand
      .listLocations({ vendorId }, getOptions())
      .then(({ response }) => {
        setAllLocationsData(response?.locations);
        // console.log(response.locations);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grid gap-5 border border-red-400 md:grid-cols-3">
      {allLocationsData?.map((location: ILocationProps) => (
        <LocationCard key={location?.id} vendorId={vendorId} location={location} />
      ))}
    </div>
  );
}
