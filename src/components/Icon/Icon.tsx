import styles from "./Icon.module.css";
import { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<HTMLElement> & {
  src: string;
};

export const Icon = ({ className = "", src, ...rest }: IconProps) => {
  const mergedClassName = `${styles.icon} ${className}`;
  return <i className={mergedClassName} style={{ backgroundImage: `url("${src}")` }} aria-hidden {...rest} />;
};
