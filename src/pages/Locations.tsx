import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
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
      <div className="mt-20 mb-4 w-full px-4">
        <Card classes="px-0 py-0">
          <div className="flex items-center justify-between pb-2">
            <p className="text-lg font-medium text-primary" />
            {getVendorPermissions()?.includes('admin') ? (
              <div>
                <Button
                  type="button"
                  classes="w-full mb-4"
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
          </div>
          <Wrapper>
            <VendorlocationsLayout
              setToggleForm={setToggleForm}
              toggleForm={toggleForm}
              handleForm={handleForm}
              editLocation={editLocation}
              selectedLocation={selectedLocation}
            />
          </Wrapper>
        </Card>
      </div>
    </UserLayout>
  );
};

export default Locations;
