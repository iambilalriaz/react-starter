import { useEffect, useState } from 'react';
import { TbLoader } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../components/Button';
import { Wrapper } from '../components/Wrapper';
import { ILocationProps } from '../features/vendor/components/ViewLocations';
import UserLayout from '../layouts/UserLayout';
import { VendorlocationsLayout } from '../layouts/VendorlocationsLayout';
import { isLoggedIn } from '../router/routes';
import { VendorService } from '../services/VendorService';
import { getVendorId } from '../features/vendor/vendorSlices/vendorIdSlice';

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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(initialLocationData);
  const [toggleForm, setToggleForm] = useState(false);

  const navigate = useNavigate();

  const getAllVendors = () => {
    const vendorService = new VendorService();
    vendorService
      .listVendors()
      .then(({ response }) => {
        setLoading(false);
        if (!response?.vendors?.length) {
          // register first vendor
          navigate(`/auth/business?referrer=${window.location.href}`);
        } else {
          dispatch(getVendorId(response?.vendors?.[0]?.id));
        }
      })
      .catch(() => setLoading(false));
  };
  const editLocation = (currentLocation: ILocationProps) => {
    setSelectedLocation(currentLocation);
  };

  const handleForm = () => {
    setToggleForm((prev) => !prev);
  };
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/auth/login');
    } else {
      getAllVendors();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserLayout>
      <>
        {!toggleForm ? (
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
          {loading ? (
            <div>
              <div className="animated-icon flex justify-center">
                <TbLoader size="50" />
              </div>
            </div>
          ) : (
            <VendorlocationsLayout
              setToggleForm={setToggleForm}
              toggleForm={toggleForm}
              handleForm={handleForm}
              editLocation={editLocation}
              selectedLocation={selectedLocation}
            />
          )}
        </Wrapper>
      </>
    </UserLayout>
  );
};

export default Locations;
