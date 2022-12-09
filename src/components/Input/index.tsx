interface IInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
}

export default function Input({ label, id, type, placeholder }: IInputProps) {
  return (
    <div className="form-control">
      <label className="label" htmlFor={id}>
        <span className="md:text-base text-sm">{label}</span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full md:max-w-xs"
      />
    </div>
  );
}
