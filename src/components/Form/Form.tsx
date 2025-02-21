import styles from "./Form.module.css";
import { FormEvent, FormHTMLAttributes, ReactNode, Ref, useId } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  heading: ReactNode;
  description: ReactNode;
  ref?: Ref<HTMLFormElement>;
};

export const Form = ({ className, heading, description, onInvalid, children, ref, ...rest }: FormProps) => {
  const headingId = useId();
  const descriptionId = useId();
  const onInvalidWrapper = (event: FormEvent<HTMLFormElement>) => {
    if (onInvalid) {
      onInvalid(event);
    }
    const firstInvalidInput = document.querySelector("input[aria-invalid='true']") as HTMLInputElement;
    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }
  };
  return (
    <form className={`${styles.form} ${className}`} onInvalid={onInvalidWrapper} ref={ref} {...rest}>
      <h2 id={headingId}>{heading}</h2>
      <p className={styles.description} id={descriptionId}>
        {description}
      </p>
      {children}
    </form>
  );
};
