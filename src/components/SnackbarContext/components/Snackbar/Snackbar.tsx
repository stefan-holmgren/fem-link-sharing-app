import { HTMLAttributes, ReactNode } from "react";
import styles from "./Snackbar.module.css";
import { useAnimation, motion, HTMLMotionProps, PanInfo } from "motion/react";

type SnackbarProps = Omit<HTMLAttributes<HTMLMotionProps<"div">>, "onClick"> & {
  message: string;
  icon?: ReactNode;
  onClose?: () => void;
};

export const Snackbar = ({ className = "", icon, message, onClose }: SnackbarProps) => {
  const controls = useAnimation();

  const handleDragEnd = (info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      controls.start({
        x: info.offset.x > 0 ? "100%" : "-100%",
        transition: {
          duration: 0.2,
        },
      });
      onClose?.();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      animate={controls}
      onDragEnd={(_, info) => handleDragEnd(info)}
      className={`${styles.snackbar} ${className}`}
      onClick={() => onClose?.()}
    >
      {icon}
      <p>{message}</p>
    </motion.div>
  );
};
