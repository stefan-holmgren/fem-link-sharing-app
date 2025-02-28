import styles from "./SaveForm.module.css";
import { ComponentProps, useId } from "react";
import { Form } from "../Form/Form";
import { Button } from "../Button/Button";

type SaveFormProps = ComponentProps<typeof Form> & {
  header: string;
  description: string;
  isSaveDisabled: boolean;
  isSaving: boolean;
};

export const SaveForm = ({ className = "", header, description, children, isSaveDisabled, isSaving, ...rest }: SaveFormProps) => {
  const headerId = useId();
  const descriptionId = useId();

  return (
    <Form className={`${styles["save-form"]} ${className}`} aria-labelledby={headerId} aria-describedby={descriptionId} {...rest}>
      <div className={styles["content-container"]}>
        <h1 id={headerId}>{header}</h1>
        <p id={descriptionId}>{description}</p>
        {children}
      </div>
      <div className={styles["save-container"]}>
        <Button type="submit" disabled={isSaveDisabled}>
          {isSaving ? "..." : "Save"}
        </Button>
      </div>
    </Form>
  );
};
