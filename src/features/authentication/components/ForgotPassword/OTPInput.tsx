interface IOTPInput {
  id: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  field?: any;
}
function OTPInput({ id, placeholder, field }: IOTPInput) {
  return (
    <input
      type="number"
      id={id}
      placeholder={placeholder}
      className="border-b-[1.5px] bg-transparent border-primary outline-0 w-8 text-center pb-2 text-[24px]"
      {...field}
      onChange={(e) => {
        if (e.target.value.length === 1) {
          field.onChange(e);
        }
      }}
    />
  );
}

export default OTPInput;
