import { useEffect, useState } from 'react';
import { TbLoader } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../components/Wrapper';
import { ILocationProps } from '../features/vendor/components/ViewLocations';
import UserLayout from '../layouts/UserLayout';
import { VendorlocationsLayout } from '../layouts/VendorlocationsLayout';
import { isLoggedIn } from '../router/routes';
import { VendorService } from '../services/VendorService';

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
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(initialLocationData);
  const [vendorId, setVendorId] = useState('');
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
          setVendorId(response?.vendors?.[0]?.id);
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
      <div className="">
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
              vendorId={vendorId}
              handleForm={handleForm}
              editLocation={editLocation}
              selectedLocation={selectedLocation}
            />
          )}
        </Wrapper>
      </div>
    </UserLayout>
  );
};

export default Locations;
