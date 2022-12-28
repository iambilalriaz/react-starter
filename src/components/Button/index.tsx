import { ReactNode } from 'react';

export interface IButtonProps {
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  size?: 'sm' | 'lg';
  htmlFor?: string;
  onClick?: () => void;
  btnState?: 'loading' | 'btn-disabled' | 'normal';
  classes?: string;
}

export function Button({
  children,
  type = 'button',
  size,
  htmlFor,
  onClick,
  btnState,
  classes
}: IButtonProps): JSX.Element {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      onClick={onClick}
      className={`btn ${btnState} ${classes} bg-primary capitalize text-white ${size && 'w-full'}`}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {htmlFor ? <label htmlFor={htmlFor}>{children}</label> : children}
    </button>
  );
}
