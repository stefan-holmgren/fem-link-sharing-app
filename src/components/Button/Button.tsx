import styles from "./Button.module.css";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
};

export const Button = ({ className = "", variant = "primary", ...props }: ButtonProps) => {
  return <button className={`${styles.button} ${styles[variant]} ${className} `} {...props} />;
};
