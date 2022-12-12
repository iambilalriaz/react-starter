import React from 'react';

export function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[90%]">{children}</div>;
}
