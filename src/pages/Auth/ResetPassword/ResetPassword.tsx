import { FormEvent, startTransition, useRef, useState, useTransition } from "react";
import styles from "./ResetPassword.module.css";
import { Link } from "react-router-dom";
import { requestFormReset } from "react-dom";
import { useAuthContext } from "../../../components/AuthContext/useAuthContext";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import PasswordIcon from "@/assets/icon-password.svg?react";
import { Snackbar } from "@/components/Snackbar/Snackbar";

export const ResetPassword = () => {
  const [isPending, createTransition] = useTransition();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { resetPassword } = useAuthContext();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTransition(async () => {
      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;

      if (password !== confirmPassword) {
        confirmPasswordRef.current?.setCustomValidity("Mismatching password");
        (e.target as HTMLFormElement).reportValidity();
        return;
      }

      if (!password) {
        return;
      }

      const result = await resetPassword(password);
      if (result.success) {
        setSuccess(true);
        startTransition(() => {
          if (formRef.current) {
            requestFormReset(formRef.current);
          }
        });
      } else {
        console.error("Failed to reset password", result.errorMessage);
      }
    });
  };

  return (
    <Form heading={"Reset password"} description={"Enter a new password"} className={styles["reset-password"]} onSubmit={onSubmit} ref={formRef}>
      <fieldset>
        <Input
          icon={<PasswordIcon />}
          label="New password"
          type="password"
          ref={passwordRef}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          required
        />
        <Input
          icon={<PasswordIcon />}
          label="Confirm password"
          type="password"
          ref={confirmPasswordRef}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          required
        />
      </fieldset>
      <p className={styles["password-info"]}>Password must contain at least 8 characters</p>
      <button type="submit">{isPending ? "..." : "Reset password"}</button>
      {success && (
        <Snackbar className={styles.snackbar} variant="positive">
          The password has been reset. <Link to="/login">Login</Link>
        </Snackbar>
      )}
    </Form>
  );
};
