import styles from "./SaveForm.module.css";
import { ComponentProps } from "react";
import { Form } from "../Form/Form";
import { Button } from "../Button/Button";

type SaveFormProps = ComponentProps<typeof Form> & {
  isSaveDisabled: boolean;
  isSaving: boolean;
};
export const SaveForm = ({ className = "", children, isSaveDisabled, isSaving, ...rest }: SaveFormProps) => {
  return (
    <Form className={`${styles["save-form"]} ${className}`} {...rest}>
      <div className={styles["content-container"]}>{children}</div>
      <div className={styles["save-container"]}>
        <Button type="submit" disabled={isSaveDisabled}>
          {isSaving ? "..." : "Save"}
        </Button>
      </div>
    </Form>
  );
};
