import { FormEvent, useRef, useState, useTransition } from "react";
import styles from "./ForgotPassword.module.css";
import { useAuthContext } from "../AuthContext/useAuthContext";

export const ForgotPassword = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailRecipient, setEmailRecipient] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const { forgotPassword } = useAuthContext();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      setErrorMessage("");
      const email = emailRef.current?.value;
      if (!email) {
        setErrorMessage("You need to enter a registered email address");
        return;
      }
      const result = await forgotPassword(email);
      if (result.success) {
        setEmailRecipient(email);
      } else {
        setErrorMessage(result.errorMessage);
      }
    });
  };

  return (
    <div className={styles["forgot-password"]}>
      <h1>Forgot Password</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input type="email" ref={emailRef} autoComplete="email" placeholder="Email" required />
          {errorMessage && (
            <p className={styles.error} aria-live="assertive" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
        <button type="submit">{isPending ? "..." : "Send reset email"}</button>
      </form>
      {emailRecipient && (
        <p>
          An email has been sent to <span className={styles.email}>{emailRecipient}</span>
        </p>
      )}
    </div>
  );
};
