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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const initialValues = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    hoursOfOperation: ['9', '5'],
    vendorId: ''
  };
  const [vendorId, setVendorId] = useState('');
  const [toggleForm, setToggleForm] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedLocation, setSelectedLocation] = useState();
  const [handleLocationData, setHandleLocationData] = useState(false);

  const editlocation = (currentLocation: any) => {
    console.log('selected location', selectedLocation);
    setSelectedLocation(currentLocation);
  };

  const handleForm = () => {
    setAddButtonClicked(true);
    setToggleForm((prev) => !prev);
  };

  console.log('firsttogg', toggleForm);
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/auth/login');
    } else {
      getVendorServiceClient()
        .listVendors({}, getOptions())
        .then(({ response }) => {
          setLoading(false);
          if (!response?.vendors?.length) {
            // register first vendor
            navigate(`/auth/business?referrer=${window.location.href}`);
          } else {
            setVendorId(response?.vendors[0]?.id);
            console.log('first', response?.vendors[0]?.id);
          }
        })
        .catch(() => setLoading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grid w-full">
      <div className="navbar bg-primary text-white">
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
              handleForm();
              setHandleLocationData(false);
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
            <>
              <p className="text-lg">Welcome to your dashboard Home page</p>
              <VendorlocationsLayout
                addButtonClicked={addButtonClicked}
                setToggleForm={setToggleForm}
                toggleForm={toggleForm}
                vendorId={vendorId}
                handleForm={handleForm}
                setAddButtonClicked={setAddButtonClicked}
                setFormValues={setFormValues}
                formValues={formValues}
                editlocation={editlocation}
                selectedLocation={selectedLocation}
                handleLocationData={handleLocationData}
                setHandleLocationData={setHandleLocationData}
              />
            </>
          )}
        </Wrapper>
      </div>
    </div>
  );
}
