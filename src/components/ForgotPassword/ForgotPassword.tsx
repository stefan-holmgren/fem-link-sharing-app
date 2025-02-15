import { FormEvent, useRef, useState, useTransition } from "react";
import styles from "./ForgotPassword.module.css";
import { forgotPassword } from "./forgotPassword";

export const ForgotPassword = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const email = emailRef.current?.value;
      if (!email) {
        setErrorMessage("You need to enter a registered email address");
        return;
      }
      const result = await forgotPassword(email);
      if (result.success) {
        setSuccess(true);
      } else {
        setErrorMessage(result.errorMessage);
      }
    });
  };

  return (
    <div className={styles["forgot-password"]}>
      <form onSubmit={onSubmit}>
        <h1>Forgot Password</h1>
        <input type="email" ref={emailRef} autoComplete="email" placeholder="Email" required />
        {errorMessage && (
          <p className={styles.error} aria-live="assertive" role="alert">
            {errorMessage}
          </p>
        )}
        <button type="submit">{isPending ? "..." : "Send reset email"}</button>
      </form>
      {success && (
        <p>
          An email has been sent to <span className={styles.email}>{emailRef.current?.value}</span>
        </p>
      )}
    </div>
  );
};
