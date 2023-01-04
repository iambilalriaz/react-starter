import { ReactNode } from 'react';

export interface IButtonProps {
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  size?: 'sm' | 'lg';
  htmlFor?: string;
  onClick?: () => void;
  btnState?: 'loading' | 'btn-disabled' | 'normal';
  classes?: string;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  type = 'button',
  size,
  htmlFor,
  onClick,
  btnState,
  classes,
  variant
}: IButtonProps): JSX.Element {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      onClick={onClick}
      className={`rounded px-4 py-2 ${btnState} ${classes} ${
        variant === 'secondary'
          ? 'border border-primary bg-white text-primary hover:bg-white'
          : 'bg-primary'
      } capitalize text-white ${size && 'w-full'}`}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {htmlFor ? <label htmlFor={htmlFor}>{children}</label> : children}
    </button>
  );
}
