interface IOTPInput {
  id: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  field?: any;
}
function OTPInput({ id, placeholder, field }: IOTPInput) {
  return (
    <input
      id={id}
      placeholder={placeholder}
      {...field}
      className="border-none border-b border-primary"
    />
  );
}

export default OTPInput;
