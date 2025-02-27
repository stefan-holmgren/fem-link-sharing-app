import { Label } from "../Label/Label";
import styles from "./Input.module.css";

import { ChangeEvent, InputHTMLAttributes, InvalidEvent, ReactNode, Ref, useId, useState } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  icon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
  errorMessage?: string;
};

export const Input = ({ id, icon, label, onInvalid, onChange, errorMessage, ...rest }: InputProps) => {
  const uniqueId = useId();
  const inputId = id || uniqueId;
  const [validationMessage, setValidationMessage] = useState("");

  const onInvalidWrapper = (event: InvalidEvent<HTMLInputElement>) => {
    console.log("Oninvalid");
    if (onInvalid) {
      onInvalid(event);
    }
    event.preventDefault();
    if (event.currentTarget.validity.valueMissing) {
      event.currentTarget.setCustomValidity("Can't be empty");
    } else if (event.currentTarget.validity.typeMismatch) {
      event.currentTarget.setCustomValidity("Please check again");
    }

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
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div>
        <input id={inputId} onInvalid={onInvalidWrapper} onChange={onChangeWrapper} aria-invalid={!!message} {...rest} />
        {icon}
        {message && (
          <div aria-live={"polite"} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
