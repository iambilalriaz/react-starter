/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddLocation } from '../features/vendor/components/AddLocation';
import { EmptyState } from '../features/vendor/components/EmptState';
import { ViewLocations } from '../features/vendor/components/ViewLocations';
import { VendorService } from '../services/VendorService';
import { getVendorId } from '../utils';
import { getAllLocationsData } from '../features/vendor/vendorSlices/locationSlice';
import { RootState } from '../app/store';

interface IVendorlocationsLayoutProps {
  toggleForm: boolean;
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleForm: () => void;
  // eslint-disable-next-line no-unused-vars
  // editLocation: (currentLocation: ILocationProps) => void;
  // selectedLocation: ILocationProps;
}

export function VendorlocationsLayout({
  toggleForm,
  setToggleForm,
  handleForm
}: // editLocation,
// selectedLocation
IVendorlocationsLayoutProps) {
  const dispatch = useDispatch();
  const allLocationsData = useSelector((state: RootState) => state.allLocationsData);

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
      {toggleForm ? (
        <AddLocation setToggleForm={setToggleForm} />
      ) : allLocationsData?.length ? (
        <ViewLocations handleForm={handleForm} />
      ) : (
        <div>
          <EmptyState />
        </div>
      )}
    </div>
  );
}
