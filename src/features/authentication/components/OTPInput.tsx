import React from 'react';

interface IOTPInput {
  id: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  field?: any;
}

const focusOnPreviousInput = (id: string) => {
  document.getElementById((+id - 1).toString())?.focus();
};
const focusOnNextInput = (id: string) => {
  document.getElementById((+id + 1).toString())?.focus();
};

function OTPInput({ id, placeholder, field }: IOTPInput) {
  const handleBackspace = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e?.key === 'Backspace') {
      if (field?.value === '') {
        focusOnPreviousInput(id);
      }
    } else if (e?.key === 'ArrowLeft') {
      focusOnPreviousInput(id);
    } else if (e?.key === 'ArrowRight') {
      focusOnNextInput(id);
    }
  };
  return (
    <input
      type="number"
      id={id}
      placeholder={placeholder}
      className="otp-input w-8 border-b-[1.5px] border-primary bg-transparent pb-2 text-center text-[24px] outline-0"
      {...field}
      onKeyDown={handleBackspace}
      onChange={(e) => {
        const inputLength = e?.target?.value?.length;
        if (inputLength <= 1) {
          field.onChange(e);
          if (inputLength === 1) {
            focusOnNextInput(id);
          }
        }
      }}
    />
  );
}

export default OTPInput;
