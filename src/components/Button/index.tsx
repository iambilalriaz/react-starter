/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  type?: 'submit' | 'reset' | 'button';
  // eslint-disable-next-line react/require-default-props
  size?: 'sm' | 'lg';
}

export default function Button({ children, type = 'button', size }: IButtonProps): JSX.Element {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`btn bg-primary capitalize ${size ? 'w-full' : ''}`} type={type}>
      {children}
    </button>
  );
}
