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
        <span className="text-base">{label}</span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
}
