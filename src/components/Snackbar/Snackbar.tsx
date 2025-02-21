import { ReactNode } from "react";
import styles from "./Snackbar.module.css";

type SnackbarProps = {
  className?: string;
  variant: "positive" | "negative";
  children?: ReactNode;
};

export const Snackbar = ({ className = "", variant = "positive", children }: SnackbarProps) => {
  const mergedClassName = `${styles.snackbar} ${variant === "positive" ? styles.positive : styles.negative} ${className}`;
  console.log(mergedClassName);
  return (
    <div className={mergedClassName} aria-live="polite" role="alert">
      {children}
    </div>
  );
};
