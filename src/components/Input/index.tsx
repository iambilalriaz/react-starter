import { useState } from 'react';
import eye from '../../assets/eye.svg';
import eyeClosed from '../../assets/EyeFill.svg';

interface IInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  field?: any;
  name?: string;
  classes?: string;
}

export default function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  field,
  name,
  classes = ''
}: IInputProps) {
  const [togglePassword, setTogglePassword] = useState(false);

  const passwordDisplayHandle = () => {
    setTogglePassword((prevState) => !prevState);
  };

  return (
    <div className="form-control">
      <label className="label text-primary" htmlFor={id}>
        <span className="text-sm md:text-base">{label}</span>
      </label>
      {type === 'password' ? (
        <div className="relative">
          <input
            id={id}
            type={`${togglePassword ? 'text' : 'password'}`}
            placeholder={placeholder}
            className="input-bordered input w-full"
            {...field}
            name={name}
          />
          <div
            onClick={passwordDisplayHandle}
            className="absolute top-[27%] right-[6%] cursor-pointer p-1 "
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
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          type={type}
          placeholder={placeholder}
          className={`input-bordered input w-full ${classes}`}
          {...field}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`input-bordered input w-full ${classes}`}
          {...field}
        />
      )}
    </div>
  );
}
