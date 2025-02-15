import styles from "./Login.module.css";
import { FormEvent, useRef, useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./login";

export const Login = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (!email || !password) {
        setErrorMessage("Both email and password are required");
        return;
      }
      setErrorMessage("");
      const result = await login(email, password);
      if (result.success) {
        navigate("/", { replace: true });
      } else {
        setErrorMessage(result.errorMessage);
      }
    });
  };

  return (
    <div className={styles.login}>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className={styles.fields}>
          <input type="email" ref={emailRef} aria-invalid={!!errorMessage} autoComplete="email" name="email" placeholder="Email" required />
          <input
            type="password"
            ref={passwordRef}
            aria-invalid={!!errorMessage}
            autoComplete="current-password"
            name="password"
            placeholder="Password"
            required
          />
          <input type="number" name="numeric" />
          {errorMessage && (
            <p className={styles.error} aria-live="assertive" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
        <button type="submit">{isPending ? "..." : "Login"}</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </form>
    </div>
  );
};
