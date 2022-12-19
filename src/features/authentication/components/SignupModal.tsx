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
        <div className="modal-box w-[350px] max-w-5xl relative p-10 rounded-[10px]">
          <label
            htmlFor="my-modal-3"
            className="cursor-pointer absolute right-4 top-2.5 text-[#708090] w-2 h-2"
          >
            ✕
          </label>
          <div className="flex justify-center">{icon}</div>
          <p className="text-sm text-primary font-normal my-6">{text}</p>
          <label htmlFor="my-modal-3" className="btn bg-primary text-white capitalize">
            Continue
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
