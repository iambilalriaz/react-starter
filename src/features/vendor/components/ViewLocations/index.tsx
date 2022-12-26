/* eslint-disable react/prop-types */
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
  handleForm,
  setFormValues,
  setHandleLocationData
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
        console.log('inside delete location: ', [...allLocationsData]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {allLocationsData?.map((location: ILocationProps) => (
        <LocationCard
          deleteLocation={deleteLocation}
          key={location?.id}
          vendorId={vendorId}
          location={location}
          editlocation={editlocation}
          toggleForm={toggleForm}
          handleForm={handleForm}
          setFormValues={setFormValues}
          setHandleLocationData={setHandleLocationData}
        />
      ))}
    </div>
  );
}
