import locationIcon from '../../../../assets/location.svg';
import { Button } from '../../../../components/Button';
import { ILocationProps } from '../ViewLocations';

export function LocationCard({
  location,
  deleteLocation,
  editlocation,
  handleForm
}: {
  location: ILocationProps;
  deleteLocation: any;
  editlocation: any;
  handleForm: any;
}) {
  // editlocation(location);
  return (
    <div className="mb-12 w-[300px] rounded-md p-4 shadow-5xl">
      <div className="flex flex-col gap-3 ">
        <div className="mb-4 flex gap-2">
          <h3 className="text-xl">vendor Location</h3>
          <img src={locationIcon} alt="location" />
        </div>

        <div>
          <span>Addres 1</span>: <span className="font-bold">{location.address1}</span>
        </div>
        <div>
          <span>Addres 2</span>: <span className="font-bold">{location.address2}</span>
        </div>

        <div>
          <span>Zip</span>: <span className="font-bold">{location.zip}</span>
        </div>
        <div>
          <span>City</span>: <span className="font-bold">{location.city}</span>
        </div>

        <div>
          <span>State</span>: <span className="font-bold">{location.state}</span>
        </div>
        <div>
          <span>Country</span>: <span className="font-bold">{location.country}</span>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <Button onClick={() => deleteLocation(location.id)}>Delete</Button>
        <Button
          onClick={() => {
            editlocation(location);
            handleForm();
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
