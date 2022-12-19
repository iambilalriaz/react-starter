import React from 'react';

interface ICardProps {
  children: React.ReactNode;
}

export function Card({ children }: ICardProps) {
  return (
    <div className="bg-white px-8 py-7 shadow-4xl rounded-1.5xl max-w-[553px]">{children}</div>
  );
}
