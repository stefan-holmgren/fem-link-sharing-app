import { FormEvent, InvalidEvent, startTransition, use, useRef, useTransition } from "react";
import styles from "./ResetPassword.module.css";
import { requestFormReset } from "react-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import PasswordIcon from "@/assets/icon-password.svg?react";
import { Button } from "@/components/Button/Button";
import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";

const ResetPassword = () => {
  const [isPending, createTransition] = useTransition();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { resetPassword } = useAuthContext();
  const { showSnackbar } = use(SnackbarContext);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      confirmPasswordRef.current?.setCustomValidity("Mismatching password");
    } else {
      confirmPasswordRef.current?.setCustomValidity("");
    }

    const formElement = e.target as HTMLFormElement;
    if (!formElement.reportValidity()) {
      return;
    }

    createTransition(async () => {
      if (!password) {
        return;
      }

      const result = await resetPassword(password);
      if (result.success) {
        showSnackbar({ message: "Password has been reset", variant: "positive" });
        startTransition(() => {
          if (formRef.current) {
            requestFormReset(formRef.current);
          }
        });
      } else {
        showSnackbar({ message: "Failed to reset password", variant: "negative" });
      }
    });
  };

  const onPasswordInvalid = (e: InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (passwordRef.current?.validity.tooShort) {
      passwordRef.current?.setCustomValidity("At least 8 characters");
    } else {
      passwordRef.current?.setCustomValidity("");
    }
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
          minLength={8}
          onInvalid={onPasswordInvalid}
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
      <Button type="submit">{isPending ? "..." : "Reset password"}</Button>
    </Form>
  );
};

export default ResetPassword;
