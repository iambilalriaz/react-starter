import { getLoggedInUser } from '../../utils';
import profileImg from '../../assets/profile.png';

const Navbar = ({ navText }: { navText: string }) => {
  return (
    <div className="navbar fixed top-0 z-20 w-[80%] justify-between bg-white px-6 font-semibold text-primary shadow-bottom">
      <p className="text-xl">{navText}</p>
      <div className="text-md">
        <span className="mr-2 text-sm font-normal text-accent">{getLoggedInUser()?.email}</span>
        <img loading="lazy" src={profileImg} width={30} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
