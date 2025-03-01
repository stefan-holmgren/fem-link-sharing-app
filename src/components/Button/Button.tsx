import { AsChildProps, Slot } from "../Slot/Slot";
import styles from "./Button.module.css";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = AsChildProps<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
};

export const Button = ({ asChild = false, className = "", variant = "primary", ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={`${styles.button} ${styles[variant]} ${className} `} {...props} />;
};
