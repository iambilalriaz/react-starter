type SelectProps = {
  label: string;
  options: string[];
  id: string;
  placeholder?: string;
  field: any;
};
const Select = ({ label, options, id, field, placeholder }: SelectProps) => {
  return (
    <div className="form-control">
      <label className="label text-primary" htmlFor={id}>
        <span className="text-sm md:text-base">{label}</span>
      </label>
      <select id={id} className="select-bordered select w-full font-normal" {...field}>
        <option value="" disabled selected>
          {placeholder}
        </option>

        {options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
