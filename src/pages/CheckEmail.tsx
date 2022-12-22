import { getQueryParam } from '../constants';

const CheckEmail = () => {
  const isError = getQueryParam('isError');
  return (
    <div className="h-screen grid place-items-center text-xl text-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">{isError ? 'Failed to send email' : 'Check your email'}</div>
      </div>
    </div>
  );
};

export default CheckEmail;
