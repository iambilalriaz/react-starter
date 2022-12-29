import React from 'react';

interface ICardProps {
  children: React.ReactNode;
  classes?: string;
}

export function Card({ children, classes }: ICardProps) {
  return <div className={`rounded-1.5xl bg-white px-8 py-7 shadow-4xl ${classes}`}>{children}</div>;
}
