import { HTMLAttributes, ReactNode } from "react";
import styles from "./Snackbar.module.css";
type SnackbarProps = Omit<HTMLAttributes<HTMLDivElement>, "onClick"> & {
  message: string;
  icon?: ReactNode;
  onClose?: () => void;
};

export const Snackbar = ({ className = "", icon, message, onClose, ...rest }: SnackbarProps) => {
  return (
    <div className={`${styles.snackbar} ${className}`} onClick={() => onClose?.()} {...rest}>
      {icon}
      <p>{message}</p>
    </div>
  );
};
