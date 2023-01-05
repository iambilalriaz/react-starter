import { Card } from '../../components/Card';
import introImg from '../../assets/intro_img.png';
import { Button } from '../../components/Button';

const IntroPage = ({ moveToNextPage }: { moveToNextPage: () => void }) => {
  return (
    <div>
      <p className="border-l-4 border-accent pl-2">Welcome to Suforia Creator Sign up.</p>
      <Card classes="p-5 mt-5">
        <p className="font-medium text-base">Introduction</p>
        <p>
          Suforia which is a combination of Super and Euphoria was bcreated to enable everyone to
          benefit form their networks and earn both passive and actine income. Please take a few
          minutes to help us get a better understanding of you and your interests as well as your
          social presence. This will allow us to match you with the best campaigns and
          opportunities.
        </p>
      </Card>
      <Card classes="mt-6 py-5 px-6">
        <p className="border-l-4 border-accent pl-2">How it all Works?</p>
        <img alt="introduction" className="mt-6" src={introImg} loading="lazy" />
      </Card>
      <div className="mt-10 flex justify-end">
        <Button classes="w-24" onClick={moveToNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default IntroPage;
