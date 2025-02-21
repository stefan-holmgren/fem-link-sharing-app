import styles from "./Login.module.css";
import { FormEvent, useId, useRef, useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext/useAuthContext";
import logo from "@/assets/logo-devlinks-large.svg";

export const Login = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuthContext();

  const formLabelId = useId();
  const formDescriptionId = useId();
  const emailId = useId();
  const passwordId = useId();

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
    <main className={styles.login}>
      <div>
        <h1>
          <img src={logo} alt="devlinks"></img>
        </h1>
        <form onSubmit={onSubmit} aria-labelledby={formLabelId} aria-describedby={formDescriptionId}>
          <h2 id={formLabelId}>Login</h2>
          <p id={formDescriptionId}>Add your details below to get back into the app</p>
          <div className={styles.fields}>
            <fieldset>
              <div>
                <label htmlFor={emailId}>Email address</label>
                <div>
                  <input
                    id={emailId}
                    type="email"
                    ref={emailRef}
                    aria-invalid={!!errorMessage}
                    autoComplete="email"
                    name="email"
                    placeholder="e.g. alex@email.com"
                    required
                  />
                  <i />
                </div>
              </div>
              <div>
                <label htmlFor={passwordId}>Password</label>
                <div>
                  <input
                    id={passwordId}
                    type="password"
                    ref={passwordRef}
                    aria-invalid={!!errorMessage}
                    autoComplete="current-password"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                  <i />
                </div>
              </div>
              {errorMessage && (
                <p className={styles.error} aria-live="assertive" role="alert">
                  {errorMessage}
                </p>
              )}
            </fieldset>
          </div>
          <button type="submit">{isPending ? "..." : "Login"}</button>
          <p>
            Don't have an account? <Link to="/signup">Create account</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </form>
      </div>
    </main>
  );
};
