import { useState } from 'react';
import eye from '../../assets/eye.svg';
import eyeClosed from '../../assets/EyeFill.svg';

interface IInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  field?: any;
  name?: string;
}

export default function Input({ label, id, type, placeholder = '', field, name }: IInputProps) {
  const [togglePassword, setTogglePassword] = useState(false);

  const passwordDisplayHandle = () => {
    setTogglePassword((prevState) => !prevState);
  };

  return (
    <div className="form-control">
      <label className="label text-primary" htmlFor={id}>
        <span className="md:text-base text-sm">{label}</span>
      </label>
      {type === 'password' ? (
        <div className="relative">
          <input
            id={id}
            type={`${togglePassword ? 'text' : 'password'}`}
            placeholder={placeholder}
            className="input input-bordered w-full"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...field}
            name={name}
          />
          <div
            onClick={passwordDisplayHandle}
            className="absolute top-[27%] cursor-pointer right-[6%] p-1 "
            role="button"
            tabIndex={0}
            onKeyDown={passwordDisplayHandle}
          >
            {togglePassword ? (
              <img src={eyeClosed} alt="show password" />
            ) : (
              <img src={eye} alt="show password" />
            )}
          </div>
        </div>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
        />
      )}
    </div>
  );
}
