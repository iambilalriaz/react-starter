/* eslint-disable react/prop-types */
import { useEffect } from 'react';
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
export function ViewLocations({
  vendorId,
  setAllLocationsData,
  allLocationsData,
  editlocation,
  toggleForm,
  handleForm
}) {
  const deleteLocation = (locationId) => {
    getVendorServiceClient()
      .deleteLocation(
        {
          locationId,
          vendorId
        },
        getOptions()
      )
      .then((res) => {
        setAllLocationsData(allLocationsData.filter((location) => location.id !== locationId));
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

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
        <LocationCard
          deleteLocation={deleteLocation}
          key={location?.id}
          vendorId={vendorId}
          location={location}
          editlocation={editlocation}
          toggleForm={toggleForm}
          handleForm={handleForm}
        />
      ))}
    </div>
  );
}
