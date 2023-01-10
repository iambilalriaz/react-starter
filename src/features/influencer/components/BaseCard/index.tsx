import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pipe from '../../../../components/SVGS/Pipe';
import Star from '../../../../components/SVGS/Star';
import { isInfluencerSelector } from '../../../../lib/stateSelectors';

const BaseCard = ({ onButtonClick }: { onButtonClick: () => void }) => {
  const isInfluencer = useSelector(isInfluencerSelector);

  const navigate = useNavigate();
  return (
    <div className={`rounded-md ${isInfluencer ? 'bg-eastern-blue' : 'bg-primary'} p-4 text-white`}>
      <div className="flex items-start justify-between">
        <div className="max-w-[55%]">
          <div className="flex">
            <Pipe />
            <p className="ml-3 text-lg font-medium">Influencer</p>
          </div>
          {isInfluencer ? (
            <p className="my-4 ml-5 text-lg">You can open as influencer</p>
          ) : (
            <>
              <p className="my-4 ml-5 text-sm">Convert your account as a influencer</p>
              <p className="ml-5 text-sm text-dark-gray">For Users with 10000+</p>
            </>
          )}
        </div>
        <Star />
      </div>
      <button
        onClick={isInfluencer ? () => navigate('/influencer/dashboard') : onButtonClick}
        type="button"
        className="ml-5 mt-4 rounded bg-white px-4 py-2 font-medium text-base text-primary"
      >
        {isInfluencer ? 'Influencer Dasboard' : 'Become an Influencer'}
      </button>
    </div>
  );
};

export default BaseCard;
