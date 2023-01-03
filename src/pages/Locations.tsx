import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Wrapper } from '../components/Wrapper';
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
  const [toggleForm, setToggleForm] = useState(false);

  const navigate = useNavigate();

  const editLocation = (currentLocation: ILocationProps) => {
    setSelectedLocation(currentLocation);
  };

  const handleForm = () => {
    setToggleForm((prev) => !prev);
  };
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/auth/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserLayout vendorPermissions={getVendorPermissions()}>
      <>
        {getVendorPermissions()?.includes('admin') ? (
          <div className="fixed right-6 top-2">
            <Button
              type="button"
              classes="w-full"
              size="lg"
              onClick={() => {
                setSelectedLocation(initialLocationData);
                handleForm();
              }}
            >
              + Add
            </Button>
          </div>
        ) : (
          ''
        )}
        <Wrapper>
          <VendorlocationsLayout
            setToggleForm={setToggleForm}
            toggleForm={toggleForm}
            handleForm={handleForm}
            editLocation={editLocation}
            selectedLocation={selectedLocation}
          />
        </Wrapper>
      </>
    </UserLayout>
  );
};

export default Locations;
