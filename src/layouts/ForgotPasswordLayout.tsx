// eslint-disable-next-line react/prop-types
import DarkLogo from '../components/SVGS/DarkLogo';
import topPattern from '../assets/topPattern.svg';
import bottomPattern from '../assets/bottomPattern.svg';

interface ILayoutProps {
  children: JSX.Element;
}
function ForgotPasswordLayout({ children }: ILayoutProps) {
  return (
    <div className="bg-neutral h-screen">
      <div className="py-[37px] px-[76px]">
        <DarkLogo />
      </div>

      <img src={topPattern} alt="" className="absolute right-0 top-0" />
      <img src={bottomPattern} alt="" className="absolute left-0 bottom-0" />
      <div className="grid place-items-center">
        <div className="card w-[40%] min-w-[30rem] max-w-[50rem] bg-base-100 shadow-xl">
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordLayout;
