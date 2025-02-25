import styles from "./PlatformButton.module.css";
import { Platform } from "@/pages/App/Links/data/userLinks.data";
import { platformMap } from "@/pages/App/Links/utils/platforminfo.utils";
import { HTMLAttributes, Ref } from "react";
import IconArrowRight from "@/assets/icon-arrow-right.svg?react";

type PlatformButtonProps = HTMLAttributes<HTMLButtonElement> & { platform: Platform; ref?: Ref<HTMLButtonElement> };

export const PlatformButton = ({ className = "", platform, ref }: PlatformButtonProps) => {
  const { icon, name } = platformMap[platform];
  const mergedClassName = `${styles["platform-button"]} ${styles[platform]} ${className}`;
  return (
    <button className={mergedClassName} ref={ref}>
      {icon}
      <span>{name}</span>
      <IconArrowRight />
    </button>
  );
};
