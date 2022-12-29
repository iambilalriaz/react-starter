/* eslint-disable jsx-a11y/label-has-associated-control */
interface IModal {
  icon: JSX.Element;
  text: string;
}
const SignupModal = ({ icon, text }: IModal) => {
  return (
    <div className="text-center">
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-[350px] max-w-5xl rounded-[10px] p-10">
          <label
            htmlFor="my-modal-3"
            className="absolute right-4 top-2.5 h-2 w-2 cursor-pointer text-[#708090]"
          >
            ✕
          </label>
          <div className="flex justify-center">{icon}</div>
          <p className="my-6 text-sm font-normal text-primary">{text}</p>
          <label htmlFor="my-modal-3" className="btn bg-primary capitalize text-white">
            Continue
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
