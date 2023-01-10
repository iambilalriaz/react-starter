/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { AddLocation } from '../features/vendor/components/AddLocation';
import { EmptyState } from '../features/vendor/components/EmptState';
import { ViewLocations } from '../features/vendor/components/ViewLocations';
import { VendorService } from '../services/VendorService';
import { getVendorId, getVendorPermissions } from '../utils';
import { getAllLocationsData } from '../features/vendor/vendorSlices/locationSlice';
import { getSelectedLocation } from '../features/vendor/vendorSlices/selectedLocationSlice';
import { toggleForm } from '../features/vendor/vendorSlices/formHandleSlice';
import { allLocationsDataSelector, isFormOpenSelector } from '../lib/stateSelectors';

export const initialLocationData = {
  id: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  state: '',
  zip: '',
  hoursOfOperation: ['']
};

export function VendorlocationsLayout() {
  const dispatch = useDispatch();

  const allLocationsData = useSelector(allLocationsDataSelector);
  const isFormOpen = useSelector(isFormOpenSelector);

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
    <div className="mt-4 w-full">
      <Card>
        <div className={`flex items-center justify-${isFormOpen ? 'end' : 'between'} pb-2`}>
          {!isFormOpen ? <p className="text-lg font-medium text-primary">My Locations</p> : ''}
          {getVendorPermissions()?.includes('admin') && !isFormOpen ? (
            <Button
              onClick={() => {
                dispatch(getSelectedLocation(initialLocationData));
                dispatch(toggleForm(!isFormOpen));
              }}
            >
              Add New Location
            </Button>
          ) : (
            ''
          )}
        </div>
        <div className="">
          {isFormOpen ? (
            <AddLocation />
          ) : allLocationsData?.length ? (
            <ViewLocations />
          ) : (
            <div className="pb-16">
              <EmptyState />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
