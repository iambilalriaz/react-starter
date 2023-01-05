import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterStepsCount from '../../features/influencer/components/RegisterStepsCount';
import UserLayout from '../../layouts/UserLayout';
import IntroPage from './IntroPage';
import ProfilePage from './ProfilePage';

const pages = [
  { number: 1, label: 'Introduction' },
  { number: 2, label: 'Profile' }
];

const RegisterInfluencer = ({ page }: { page: string }) => {
  const [currentPage, setCurrentPage] = useState(pages?.find((pg) => pg?.label === page));
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentPage(pages?.find((pg) => pg?.label === page));
  }, [page]);
  const moveToNextPage = useCallback(() => {
    if (currentPage?.number === 1) {
      navigate('/influencer/register/profile');
    } else {
      navigate('/dashboard/user');
    }
  }, [currentPage?.number, navigate]);
  return (
    <UserLayout navText="Become an Influencer">
      <div className="p-4">
        <div className="mt-24 flex justify-center">
          <RegisterStepsCount currentPage={currentPage?.number || 1} pages={pages} />
        </div>
        <div className="mt-14">
          {page === 'Introduction' ? (
            <IntroPage moveToNextPage={moveToNextPage} />
          ) : page === 'Profile' ? (
            <ProfilePage moveToNextPage={moveToNextPage} />
          ) : (
            ''
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default RegisterInfluencer;
