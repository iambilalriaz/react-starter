/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { AddLocation } from '../features/vendor/components/AddLocation';
import { EmptyState } from '../features/vendor/components/EmptState';
import { ILocationProps, ViewLocations } from '../features/vendor/components/ViewLocations';
import { VendorService } from '../services/VendorService';
import { getVendorId, getVendorPermissions } from '../utils';

interface IVendorlocationsLayoutProps {
  // eslint-disable-next-line no-unused-vars
  editLocation: (currentLocation: ILocationProps) => void;
  selectedLocation: ILocationProps;
  onAddButtonClick: () => void;
}

export function VendorlocationsLayout({
  editLocation,
  selectedLocation,
  onAddButtonClick
}: IVendorlocationsLayoutProps) {
  const [allLocationsData, setAllLocationsData] = useState<ILocationProps[]>([]);
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  const getAllLocations = useCallback(() => {
    const vendorService = new VendorService();
    vendorService.listLocations(getVendorId()).then(({ response }) => {
      setAllLocationsData(response?.locations);
    });
  }, []);

  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);
  return (
    <div className="mt-4 w-full">
      <Card>
        <div className={`flex items-center justify-${isAddingLocation ? 'end' : 'between'} pb-2`}>
          {!isAddingLocation ? (
            <p className="text-lg font-medium text-primary">My Locations</p>
          ) : (
            ''
          )}
          {getVendorPermissions()?.includes('admin') && !isAddingLocation ? (
            <Button
              onClick={() => {
                setIsAddingLocation(true);
                onAddButtonClick();
              }}
            >
              Add New Location
            </Button>
          ) : (
            ''
          )}
        </div>
        <div className="">
          {isAddingLocation ? (
            <AddLocation
              setAllLocationsData={setAllLocationsData}
              selectedLocation={selectedLocation}
              setIsAddingLocation={setIsAddingLocation}
            />
          ) : allLocationsData?.length ? (
            <ViewLocations
              allLocationsData={allLocationsData}
              setAllLocationsData={setAllLocationsData}
              editLocation={editLocation}
              setIsAddingLocation={setIsAddingLocation}
            />
          ) : (
            <div>
              <EmptyState />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
