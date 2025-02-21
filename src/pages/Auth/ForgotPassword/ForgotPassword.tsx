import { FormEvent, useRef, useState, useTransition } from "react";
import styles from "./ForgotPassword.module.css";
import { useAuthContext } from "../../../components/AuthContext/useAuthContext";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input/Input";
import emailIcon from "@/assets/icon-email.svg";
import { Snackbar } from "@/components/Snackbar/Snackbar";

export const ForgotPassword = () => {
  const [isPending, startTransition] = useTransition();
  const [emailRecipient, setEmailRecipient] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const { forgotPassword } = useAuthContext();
  const [emailSent, setEmailSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    setEmailSent(false);
    setFailed(false);
    e.preventDefault();
    startTransition(async () => {
      const email = emailRef.current?.value;
      if (!email) {
        return;
      }
      const result = await forgotPassword(email);
      if (result.success) {
        setEmailRecipient(email);
        setEmailSent(true);
      } else {
        setFailed(true);
      }
    });
  };

  return (
    <Form heading={"Forgot password"} description="We can send you a reset password email" className={styles["forgot-password"]} onSubmit={onSubmit}>
      <fieldset>
        <Input label="Email address" icon={emailIcon} type="email" ref={emailRef} autoComplete="email" placeholder="e.g. alex@email.com" required />
      </fieldset>
      <button type="submit">{isPending ? "..." : "Send reset email"}</button>
      {emailSent && (
        <Snackbar variant="positive">
          An email has been sent to <span className={styles.email}>{emailRecipient}</span>
        </Snackbar>
      )}
      {failed && <Snackbar variant="negative">Failed to send reset email</Snackbar>}
    </Form>
  );
};
