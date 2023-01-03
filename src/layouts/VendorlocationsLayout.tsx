/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddLocation } from '../features/vendor/components/AddLocation';
import { EmptyState } from '../features/vendor/components/EmptState';
import { ViewLocations } from '../features/vendor/components/ViewLocations';
import { VendorService } from '../services/VendorService';
import { getVendorId } from '../utils';
import { getAllLocationsData } from '../features/vendor/vendorSlices/locationSlice';
import { RootState } from '../app/store';

export function VendorlocationsLayout() {
  const dispatch = useDispatch();

  const allLocationsData = useSelector((state: RootState) => state.allLocationsData);
  const isFormOpen = useSelector((state: RootState) => state.toggleForm);

  const getAllLocations = useCallback(() => {
    const vendorService = new VendorService();
    vendorService.listLocations(getVendorId()).then(({ response }) => {
      dispatch(getAllLocationsData(response?.locations));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);

  return (
    <div className="grid h-screen place-items-center">
      {isFormOpen ? (
        <AddLocation />
      ) : allLocationsData?.length ? (
        <ViewLocations />
      ) : (
        <div>
          <EmptyState />
        </div>
      )}
    </div>
  );
}
