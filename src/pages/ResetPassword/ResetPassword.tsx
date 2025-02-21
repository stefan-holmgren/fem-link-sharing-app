import { FormEventHandler, startTransition, useRef, useState, useTransition } from "react";
import styles from "./ResetPassword.module.css";
import { Link } from "react-router-dom";
import { requestFormReset } from "react-dom";
import { useAuthContext } from "../../components/AuthContext/useAuthContext";

export const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, createTransition] = useTransition();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { resetPassword } = useAuthContext();
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createTransition(async () => {
      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;

      if (!password) {
        setErrorMessage("You need to enter a password");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Mismatching password");
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
        setErrorMessage(result.errorMessage);
      }
    });
  };

  return (
    <div className={styles["reset-password"]}>
      <form onSubmit={onSubmit} ref={formRef}>
        <h1>Reset Password</h1>
        <div>
          <input type="password" ref={passwordRef} aria-invalid={!!errorMessage} autoComplete="new-password" placeholder="Password" required />
          <input type="password" ref={confirmPasswordRef} aria-invalid={!!errorMessage} autoComplete="new-password" placeholder="Confirm Password" required />
          {errorMessage && (
            <p className={styles.error} aria-live="assertive" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
        <button type="submit">{isPending ? "..." : "Reset password"}</button>
      </form>
      {success && (
        <p>
          The password has been reset, go to <Link to="/login">login</Link>
        </p>
      )}
    </div>
  );
};
