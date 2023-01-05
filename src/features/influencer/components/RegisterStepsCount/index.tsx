import Step from './Step';

const RegisterStepsCount = ({
  pages,
  currentPage
}: {
  pages: { label: string; number: number }[];
  currentPage: number;
}) => {
  return (
    <div className="relative z-[-1] flex justify-between gap-16 before:absolute  before:bottom-[65%] before:z-[-1] before:ml-[20%] before:h-[3px] before:w-[80%] before:bg-gallery">
      {pages?.map(({ number, label }) => (
        <div key={label} className="flex flex-col items-center justify-between">
          <Step
            number={number}
            completed={number < currentPage}
            isCurrent={currentPage === number}
          />
          <p className="mt-2 text-center text-base">{label}</p>
        </div>
      ))}
    </div>
  );
};

export default RegisterStepsCount;
