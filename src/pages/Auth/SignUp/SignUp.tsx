import { FormEvent, InvalidEvent, useRef, useTransition } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import EmailIcon from "@/assets/icon-email.svg?react";
import PasswordIcon from "@/assets/icon-password.svg?react";
import { Button } from "@/components/Button/Button";

export const SignUp = () => {
  const { signup } = useAuthContext();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const confirmPassword = confirmPasswordRef.current?.value;
    const password = passwordRef.current?.value;

    if (password != confirmPassword) {
      confirmPasswordRef.current?.setCustomValidity("Passwords do not match");
    } else {
      confirmPasswordRef.current?.setCustomValidity("");
    }

    const formElement = e.target as HTMLFormElement;
    if (!formElement.reportValidity()) {
      return;
    }

    startTransition(async () => {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;

      if (password !== confirmPassword) {
        return;
      }

      if (!email || !password || !confirmPassword) {
        return;
      }

      const result = await signup(email, password);
      if (result.success) {
        navigate("/", { replace: true });
      } else {
        console.error("Failed to sign up", result.errorMessage);
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
    <Form heading={"Create account"} description={"Let's get you started sharing your links!"} className={styles.signup} onSubmit={onSubmit}>
      <fieldset>
        <Input label={"Email address"} icon={<EmailIcon />} type="email" autoComplete="email" placeholder="e.g. alex@email.com" required ref={emailRef} />
        <Input
          label={"Create password"}
          icon={<PasswordIcon />}
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          minLength={8}
          required
          onInvalid={onPasswordInvalid}
          ref={passwordRef}
        />
        <Input
          label={"Confirm password"}
          icon={<PasswordIcon />}
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          ref={confirmPasswordRef}
        />
      </fieldset>
      <p className={styles["password-info"]}>Password must contain at least 8 characters</p>
      <Button type="submit">{isPending ? "..." : "Create new account"}</Button>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </Form>
  );
};
