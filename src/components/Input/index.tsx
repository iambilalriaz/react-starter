import { useState } from 'react';
import eye from '../../assets/eye.svg';
import eyeClosed from '../../assets/EyeFill.svg';

interface IInputProps {
  label?: string;
  id: string;
  type?: string;
  placeholder: string;
  field?: any;
  name?: string;
  classes?: string;
  absoluteIcon?: JSX.Element;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

export default function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  field,
  name,
  classes = '',
  absoluteIcon,
  onChange
}: IInputProps) {
  const [togglePassword, setTogglePassword] = useState(false);

  const passwordDisplayHandle = () => {
    setTogglePassword((prevState) => !prevState);
  };

  return (
    <div className="form-control">
      {label ? (
        <label className="label text-primary" htmlFor={id}>
          <span className="text-sm md:text-base">{label}</span>
        </label>
      ) : null}
      {type === 'password' ? (
        <div className="relative">
          <input
            id={id}
            type={`${togglePassword ? 'text' : 'password'}`}
            placeholder={placeholder}
            className="input-bordered input w-full"
            {...field}
            name={name}
            {...(onChange
              ? {
                  onChange: (e) => {
                    if (onChange) {
                      onChange(e?.target?.value);
                    }
                  }
                }
              : {})}
          />

          <div
            onClick={passwordDisplayHandle}
            className="absolute top-[27%] right-[6%] cursor-pointer p-1 "
            role="button"
            tabIndex={0}
            onKeyDown={passwordDisplayHandle}
          >
            {togglePassword ? (
              <img loading="lazy" src={eyeClosed} alt="show password" />
            ) : (
              <img loading="lazy" src={eye} alt="show password" />
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
          {...(onChange
            ? {
                onChange: (e) => {
                  if (onChange) {
                    onChange(e?.target?.value);
                  }
                }
              }
            : {})}
        />
      ) : (
        <div className="relative flex w-full items-center justify-between">
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`input-bordered input w-full ${classes}`}
            {...field}
            {...(onChange
              ? {
                  onChange: (e) => {
                    if (onChange) {
                      onChange(e?.target?.value);
                    }
                  }
                }
              : {})}
          />
          {absoluteIcon}
        </div>
      )}
    </div>
  );
}
