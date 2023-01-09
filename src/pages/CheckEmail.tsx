import { getQueryParam } from '../utils';

const CheckEmail = () => {
  const isError = getQueryParam('isError');
  return (
    <div className="grid h-screen place-items-center text-center text-xl">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">{isError ? 'Failed to send email' : 'Check your email'}</div>
      </div>
    </div>
  );
};

export default CheckEmail;
