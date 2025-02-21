import styles from "./Input.module.css";

import { ChangeEvent, InputHTMLAttributes, InvalidEvent, ReactNode, Ref, useId, useState } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  icon?: string;
  ref?: Ref<HTMLInputElement>;
  errorMessage?: string;
};

export const Input = ({ id, icon, label, onInvalid, onChange, errorMessage, ...rest }: InputProps) => {
  const uniqueId = useId();
  const inputId = id || uniqueId;
  const [validationMessage, setValidationMessage] = useState("");

  const onInvalidWrapper = (event: InvalidEvent<HTMLInputElement>) => {
    if (onInvalid) {
      onInvalid(event);
    }
    event.preventDefault();
    setValidationMessage(event.currentTarget.validationMessage);
  };

  const onChangeWrapper = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    event.target.setCustomValidity("");
    setValidationMessage("");
  };

  const message = errorMessage || validationMessage;

  return (
    <div className={styles.input}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <div>
        <input id={inputId} onInvalid={onInvalidWrapper} onChange={onChangeWrapper} aria-invalid={!!message} {...rest} />
        {icon && <i style={{ backgroundImage: `url("${icon}")` }} />}
        {message && (
          <div aria-live={"polite"} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
