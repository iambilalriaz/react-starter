import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILocationProps } from '../features/vendor/components/ViewLocations';
import UserLayout from '../layouts/UserLayout';
import { VendorlocationsLayout } from '../layouts/VendorlocationsLayout';
import { isLoggedIn } from '../router/routes';
import { getVendorPermissions } from '../utils';

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
const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocationData);

  const navigate = useNavigate();

  const editLocation = (currentLocation: ILocationProps) => {
    setSelectedLocation(currentLocation);
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/auth/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onAddButtonClick = () => {
    setSelectedLocation(initialLocationData);
  };
  return (
    <UserLayout vendorPermissions={getVendorPermissions()}>
      <div className="mt-20 w-full px-4">
        <VendorlocationsLayout
          editLocation={editLocation}
          selectedLocation={selectedLocation}
          onAddButtonClick={onAddButtonClick}
        />
      </div>
    </UserLayout>
  );
};

export default Locations;
