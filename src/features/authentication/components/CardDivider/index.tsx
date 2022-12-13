export function CardDivider() {
  return (
    <p className="text-center z-[100] isolate relative my-5 text-accent after:content-[' '] after:w-full after:h-px after:absolute after:ml-0.5 after:left-0 after:top-[50%] after:bg-dark-gray after:z-[-10]">
      <span className="before:content-[' '] before:max-w-[150px] before:left-auto before:right-auto before:w-full  before:h-[21px] px-3 z-10 bg-white before:z-[-5] before:absolute ">
        Or continue with
      </span>
    </p>
  );
}
