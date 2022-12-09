interface IInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  field: any;
}

export default function Input({ label, id, type, placeholder, field }: IInputProps) {
  return (
    <div className="form-control">
      <label className="label" htmlFor={id}>
        <span className="md:text-base text-sm">{label}</span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full "
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
      />
    </div>
  );
}
