import Tick from '../../../../components/SVGS/Tick';

type StepProps = {
  number: number;
  isCurrent: boolean;
  completed: boolean;
};
const Step = ({ number, completed, isCurrent }: StepProps) => {
  return (
    <div
      className={
        !completed
          ? `z-2 grid h-12 w-12 place-items-center rounded-[50%] border-2 border-primary bg-white ${
              isCurrent ? '' : 'border-dark-gray'
            }`
          : 'mt-1'
      }
    >
      <div
        className={`grid h-9 w-9 place-items-center rounded-[50%] ${
          isCurrent || completed ? 'bg-primary text-white' : 'bg-white text-dark-gray'
        }`}
      >
        {completed ? <Tick /> : number}
      </div>
    </div>
  );
};

export default Step;
