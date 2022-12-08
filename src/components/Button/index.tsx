/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  type?: 'submit' | 'reset' | 'button';
}

export default function Button({ children, type = 'button' }: IButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className="btn w-full" type={type}>
      {children}
    </button>
  );
}
