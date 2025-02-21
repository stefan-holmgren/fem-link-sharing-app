import styles from "./Login.module.css";
import { FormEvent, InvalidEvent, useRef, useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../components/AuthContext/useAuthContext";
import emailIcon from "@/assets/icon-email.svg";
import passwordIcon from "@/assets/icon-password.svg";
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

  function onEmailInvalid(event: InvalidEvent<HTMLInputElement>) {
    const { validity } = event.currentTarget;
    if (validity.valueMissing) {
      event.currentTarget.setCustomValidity("Can't be empty");
    } else if (validity.typeMismatch) {
      event.currentTarget.setCustomValidity("Please enter a valid email address.");
    }
  }

  function onPasswordInvalid(event: InvalidEvent<HTMLInputElement>) {
    if (event.currentTarget.validity.valueMissing) {
      event.currentTarget.setCustomValidity("Can't be empty");
    } else {
      event.currentTarget.setCustomValidity("Please enter your password");
    }
  }

  return (
    <Form heading={"Login"} description={"Add your details below to get back into the app"} className={styles.login} onSubmit={onSubmit}>
      <fieldset>
        <Input
          label={"Email address"}
          icon={emailIcon}
          type="email"
          ref={emailRef}
          autoComplete="email"
          name="email"
          placeholder="e.g. alex@email.com"
          required
          onInvalid={onEmailInvalid}
          errorMessage={emailErrorMessage}
        />
        <Input
          label={"Password"}
          icon={passwordIcon}
          type="password"
          ref={passwordRef}
          autoComplete="current-password"
          name="password"
          placeholder="Enter your password"
          required
          onInvalid={onPasswordInvalid}
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
