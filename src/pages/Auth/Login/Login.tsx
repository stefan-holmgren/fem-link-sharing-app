import styles from "./Login.module.css";
import { FormEvent, useRef, useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../components/AuthContext/useAuthContext";
import EmailIcon from "@/assets/icon-email.svg?react";
import PasswordIcon from "@/assets/icon-password.svg?react";
import { Input } from "../../../components/Input/Input";
import { Form } from "../../../components/Form/Form";

export const Login = () => {
  const [isPending, startTransition] = useTransition();

  const { login } = useAuthContext();

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (!email || !password) {
        return;
      }
      const result = await login(email, password);
      if (result.success) {
        navigate("/", { replace: true });
      } else {
        const message = result.error === "invalid_credentials" ? "Please check again" : "Something went wrong";
        setEmailErrorMessage(message);
        setPasswordErrorMessage(message);
      }
    });
  };

  return (
    <Form heading={"Login"} description={"Add your details below to get back into the app"} className={styles.login} onSubmit={onSubmit}>
      <fieldset>
        <Input
          label={"Email address"}
          icon={<EmailIcon />}
          type="email"
          ref={emailRef}
          autoComplete="email"
          name="email"
          placeholder="e.g. alex@email.com"
          required
          errorMessage={emailErrorMessage}
        />
        <Input
          label={"Password"}
          icon={<PasswordIcon />}
          type="password"
          ref={passwordRef}
          autoComplete="current-password"
          name="password"
          placeholder="Enter your password"
          required
          errorMessage={passwordErrorMessage}
        />
      </fieldset>

      <button type="submit">{isPending ? "..." : "Login"}</button>
      <div>
        <p>
          Don't have an account? <Link to="/signup">Create account</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </Form>
  );
};
