/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { AddLocation } from '../features/vendor/components/AddLocation';
// import { LocationCard } from '../features/vendor/components/LocationCard';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grid fixed w-full">
      <div className="navbar bg-primary text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          <a className="btn btn-ghost normal-case text-xl">Suforia</a>
        </div>

        <div className="navbar-end">
          <button
            type="button"
            className="btn"
            onClick={() => {
              localStorage.removeItem('accessToken');
              navigate('/login', { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="grid place-items-center h-screen mb-[50px]">
        <Card>
          <p className="text-lg">Welcome to your dashboard Home page</p>
        </Card>
        {/* <LocationCard /> */}
        <AddLocation />
      </div>
    </div>
  );
}
