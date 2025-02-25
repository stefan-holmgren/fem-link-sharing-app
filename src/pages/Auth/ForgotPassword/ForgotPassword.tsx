import { FormEvent, use, useRef, useTransition } from "react";
import styles from "./ForgotPassword.module.css";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import EmailIcon from "@/assets/icon-email.svg?react";
import { Button } from "@/components/Button/Button";
import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";

export const ForgotPassword = () => {
  const [isPending, startTransition] = useTransition();
  const emailRef = useRef<HTMLInputElement>(null);
  const { forgotPassword } = useAuthContext();
  const { showSnackbar } = use(SnackbarContext);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const email = emailRef.current?.value;
      if (!email) {
        return;
      }
      const result = await forgotPassword(email);
      if (result.success) {
        showSnackbar({ message: `An email has been sent to ${email}` });
      } else {
        showSnackbar({ message: "Failed to send reset email", variant: "negative" });
      }
    });
  };

  return (
    <Form heading={"Forgot password"} description="We can send you a reset password email" className={styles["forgot-password"]} onSubmit={onSubmit}>
      <fieldset>
        <Input label="Email address" icon={<EmailIcon />} type="email" ref={emailRef} autoComplete="email" placeholder="e.g. alex@email.com" required />
      </fieldset>
      <Button type="submit">{isPending ? "..." : "Send reset email"}</Button>
    </Form>
  );
};
