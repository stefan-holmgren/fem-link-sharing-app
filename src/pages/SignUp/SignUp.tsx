import { FormEvent, useRef, useState, useTransition } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/AuthContext/useAuthContext";

export const SignUp = () => {
  const { signup } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      if (!email || !password || !confirmPassword) {
        setErrorMessage("All fields need to be filled");
        return;
      }

      const result = await signup(email, password);
      if (result.success) {
        navigate("/", { replace: true });
      } else {
        setErrorMessage(result.errorMessage);
      }
    });
  };

  return (
    <div className={styles.signup}>
      <h1>Signup</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.fields}>
          <input type="email" autoComplete="email" placeholder="Email" required ref={emailRef} />
          <input type="password" autoComplete="new-password" placeholder="Password" required ref={passwordRef} />
          <input type="password" autoComplete="new-password" placeholder="Confirm Password" required ref={confirmPasswordRef} />
        </div>
        {errorMessage && (
          <p className={styles.error} aria-live="assertive" role="alert">
            {errorMessage}
          </p>
        )}
        <button type="submit">{isPending ? "..." : "Signup"}</button>
      </form>
    </div>
  );
};
