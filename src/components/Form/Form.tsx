import styles from "./Form.module.css";
import { FormEvent, FormHTMLAttributes, ReactNode, Ref, useId } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  heading?: ReactNode;
  description?: ReactNode;
  ref?: Ref<HTMLFormElement>;
};

export const Form = ({ className = "", heading, description, onInvalid, children, ref, ...rest }: FormProps) => {
  const headingId = useId();
  const descriptionId = useId();
  const onInvalidWrapper = (event: FormEvent<HTMLFormElement>) => {
    if (onInvalid) {
      onInvalid(event);
    }
    const firstInvalidInput = Array.from(event.currentTarget.elements).find(
      (element) => element instanceof HTMLInputElement && !!element.validationMessage
    ) as HTMLInputElement;
    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }
  };
  return (
    <form className={`${styles.form} ${className}`} onInvalid={onInvalidWrapper} ref={ref} {...rest}>
      {!!heading && <h2 id={headingId}>{heading}</h2>}
      {!!description && (
        <p className={styles.description} id={descriptionId}>
          {description}
        </p>
      )}
      {children}
    </form>
  );
};
