import locationIcon from '../../../../assets/location.svg';
import { Button } from '../../../../components/Button';
import { getOptions, getVendorServiceClient } from '../../../../constants';
// import { Button } from '../../../../components/Button';
import { ILocationProps } from '../ViewLocations';

export function LocationCard({
  location,
  vendorId
}: {
  location: ILocationProps;
  vendorId: string;
}) {
  console.log('location card: ', location, vendorId);

  const deleteLocation = () => {
    getVendorServiceClient()
      .deleteLocation(
        {
          locationId: location.id,
          vendorId
        },
        getOptions()
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="mb-12 max-w-[700px] rounded-md shadow-5xl">
      <div className="flex flex-col gap-3 p-4">
        <div>
          <img src={locationIcon} alt="location" />
        </div>
        <div>
          <span className="font-bold">addres 1</span>: {location.address1}
        </div>
        <div>
          <span className="font-bold">addres 2</span>: {location.address2}
        </div>
        <div>
          <span className="font-bold">zip</span>: {location.zip}
        </div>
        <div>
          <span className="font-bold">city</span>: {location.city}
        </div>
        <div>
          <span className="font-bold">state</span>: {location.state}
        </div>
        <div>
          <span className="font-bold">country</span>: {location.country}
        </div>
      </div>
      <Button onClick={deleteLocation}>Delete Location</Button>
    </div>
  );
}
