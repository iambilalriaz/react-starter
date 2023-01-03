import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../components/Button';
import { Wrapper } from '../components/Wrapper';
import UserLayout from '../layouts/UserLayout';
import { VendorlocationsLayout } from '../layouts/VendorlocationsLayout';
import { isLoggedIn } from '../router/routes';
import { getSelectedLocation } from '../features/vendor/vendorSlices/selectedLocationSlice';

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

  const [toggleForm, setToggleForm] = useState(false);

  const navigate = useNavigate();

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
    <UserLayout>
      <>
        {!toggleForm ? (
          <div className="fixed right-6 top-2">
            <Button
              type="button"
              classes="w-full"
              size="lg"
              onClick={() => {
                dispatch(getSelectedLocation(initialLocationData));
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
          />
        </Wrapper>
      </>
    </UserLayout>
  );
};

export default Locations;
