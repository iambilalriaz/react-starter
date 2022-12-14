import { ReactNode } from 'react';

export interface IButtonProps {
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  size?: 'sm' | 'lg';
  htmlFor?: string;
}

export function Button({ children, type = 'button', size, htmlFor }: IButtonProps): JSX.Element {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`btn bg-primary text-white capitalize ${size ? 'w-full' : ''}`} type={type}>
      {htmlFor ? <label htmlFor={htmlFor}>{children}</label> : children}
    </button>
  );
}
