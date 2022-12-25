import locationIcon from '../../../../assets/location.svg';
import { Button } from '../../../../components/Button';
import { ILocationProps } from '../ViewLocations';

export function LocationCard({
  location,
  deleteLocation,
  editlocation,
  handleForm,
  setFormValues,
  setHandleLocationData
}: {
  location: ILocationProps;
  deleteLocation: any;
  editlocation: any;
  handleForm: any;
  setFormValues: any;
  setHandleLocationData: any;
}) {
  return (
    <div className="mb-12 max-w-[700px] rounded-md p-4 shadow-5xl">
      <div className="flex flex-col gap-3 ">
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
      <div className="mt-6 flex gap-4">
        <Button onClick={() => deleteLocation(location.id)}>Delete</Button>
        <Button
          onClick={() => {
            handleForm();
            editlocation(location);
            setHandleLocationData(true);
            setFormValues(location);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
