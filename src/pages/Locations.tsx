import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/Button';
import { Wrapper } from '../components/Wrapper';
import UserLayout from '../layouts/UserLayout';
import { VendorlocationsLayout } from '../layouts/VendorlocationsLayout';
import { isLoggedIn } from '../router/routes';
import { getSelectedLocation } from '../features/vendor/vendorSlices/selectedLocationSlice';
import { RootState } from '../app/store';
import { toggleForm } from '../features/vendor/vendorSlices/formHandleSlice';

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
  const isFormOpen = useSelector((state: RootState) => state.toggleForm);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserLayout>
      <>
        {!isFormOpen ? (
          <div className="fixed right-6 top-2">
            <Button
              type="button"
              classes="w-full"
              size="lg"
              onClick={() => {
                dispatch(getSelectedLocation(initialLocationData));
                dispatch(toggleForm(!isFormOpen));
              }}
            >
              + Add
            </Button>
          </div>
        ) : (
          ''
        )}
        <Wrapper>
          <VendorlocationsLayout />
        </Wrapper>
      </>
    </UserLayout>
  );
};

export default Locations;
