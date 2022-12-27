/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbLoader } from 'react-icons/tb';
import { VendorlocationsLayout } from '../layouts/VendorlocationsLayout';
import { getOptions, getVendorServiceClient } from '../constants';
import { Wrapper } from '../components/Wrapper';
import { isLoggedIn } from '../router/routes';
import { ILocationProps } from '../features/vendor/components/ViewLocations';

const initialLocationData = {
  id: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  state: '',
  zip: '',
  hoursOfOperation: ['']
};
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(initialLocationData);
  const [vendorId, setVendorId] = useState('');
  const [toggleForm, setToggleForm] = useState(false);
  const vendorService = getVendorServiceClient();

  const navigate = useNavigate();

  const getAllVendors = async () => {
    const options = await getOptions();
    vendorService
      .listVendors({}, options)
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
    <div className="grid w-full">
      <div className="navbar sticky top-0 bg-primary text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <a className="btn-ghost btn text-xl normal-case">Suforia</a>
        </div>

        <div className="navbar-end flex gap-8">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setSelectedLocation(initialLocationData);
              handleForm();
            }}
          >
            add location
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              localStorage.removeItem('accessToken');
              navigate('/auth/login', { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </div>
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
    </div>
  );
}
