import { FormEvent, useRef, useTransition } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/components/AuthContext/useAuthContext";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import emailIcon from "@/assets/icon-email.svg";
import passwordIcon from "@/assets/icon-password.svg";

export const SignUp = () => {
  const { signup } = useAuthContext();
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

  return (
    <Form heading={"Create account"} description={"Let's get you started sharing your links!"} className={styles.signup} onSubmit={onSubmit}>
      <fieldset>
        <Input label={"Email address"} icon={emailIcon} type="email" autoComplete="email" placeholder="e.g. alex@email.com" required ref={emailRef} />
        <Input
          label={"Create password"}
          icon={passwordIcon}
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          required
          ref={passwordRef}
        />
        <Input
          label={"Confirm password"}
          icon={passwordIcon}
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          required
          ref={confirmPasswordRef}
        />
      </fieldset>
      <p className={styles["password-info"]}>Password must contain at least 8 characters</p>
      <button type="submit">{isPending ? "..." : "Create new account"}</button>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </Form>
  );
};
