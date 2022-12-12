import React from 'react';

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white px-8 py-7 shadow-4xl rounded-1.5xl max-w-[553px]">{children}</div>
  );
}
