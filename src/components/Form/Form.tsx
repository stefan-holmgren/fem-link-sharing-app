import { FormEvent, FormHTMLAttributes } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ onInvalid, ...rest }: FormProps) => {
  const onInvalidWrapper = (event: FormEvent<HTMLFormElement>) => {
    if (onInvalid) {
      onInvalid(event);
    }
    const firstInvalidInput = document.querySelector("input[aria-invalid='true']") as HTMLInputElement;
    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }
  };
  return <form onInvalid={onInvalidWrapper} {...rest} />;
};
