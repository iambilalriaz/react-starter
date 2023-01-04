/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { VendorService } from '../../../../services/VendorService';
import { getVendorId } from '../../../../utils';
import { EmptyState } from '../EmptState';
import { LocationCard } from '../LocationCard';
import { getAllLocationsData } from '../../vendorSlices/locationSlice';
import { ILocationInterface } from '../../../../lib/types';

export function ViewLocations() {
  const dispatch = useDispatch();

  const allLocationsData = useSelector((state: RootState) => state.allLocationsData);

  const deleteLocation = async (locationId: string) => {
    const vendorService = new VendorService();
    vendorService
      .deleteLocation({
        locationId,
        vendorId: getVendorId()
      })
      .then(() => {
        vendorService.listLocations(getVendorId()).then(({ response }) => {
          dispatch(getAllLocationsData(response.locations));
        });
      });
  };

  return (
    <div className="mt-24 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {allLocationsData?.map((location: ILocationInterface) => (
        <LocationCard deleteLocation={deleteLocation} key={location?.id} location={location} />
      ))}
    </div>
  );
}
