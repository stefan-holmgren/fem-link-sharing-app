import styles from "./Label.module.css";
import { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className = "", ...rest }: LabelProps) => <label className={`${styles.label} ${className}`} {...rest} />;
