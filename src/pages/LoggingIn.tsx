import { useEffect, useState } from 'react';
import { TbLoader } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { getAuthServiceClient, getQueryParam } from '../constants';

const LoggingIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  useEffect(() => {
    const authService = getAuthServiceClient();
    authService
      .verifyEmailCode({
        email: getQueryParam('email') || '',
        code: getQueryParam('code') || ''
      })
      .then(({ response }) => {
        const { maskedPhoneNumber, accessToken } = response;
        localStorage.setItem('emailAccessToken', accessToken);
        if (maskedPhoneNumber) {
          navigate(`/auth/otp?phone=${maskedPhoneNumber}`, { replace: true });
        } else {
          navigate('/auth/signup?newUser=true', { replace: true });
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [navigate]);
  return (
    <div className="grid h-screen place-items-center text-center text-xl">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          {error ? null : (
            <div className="animated-icon flex justify-center">
              <TbLoader size="50" />
            </div>
          )}
          <p>{error ? 'Failed to log in' : 'Logging in...'}</p>
        </div>
      </div>
    </div>
  );
};

export default LoggingIn;
