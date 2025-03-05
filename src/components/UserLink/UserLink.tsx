import styles from "./UserLink.module.css";
import { UserLink as UserLinkType } from "@/data/userLinks.data";
import { platformMap } from "@/utils/platforminfo.utils";
import { HTMLAttributes, Ref } from "react";
import IconArrowRight from "@/assets/icon-arrow-right.svg?react";

type UserLinkProps = HTMLAttributes<HTMLAnchorElement> & { userLink: UserLinkType; ref?: Ref<HTMLAnchorElement> };

export const UserLink = ({ className = "", userLink: { platform, url }, ref, ...rest }: UserLinkProps) => {
  const { icon, name } = platformMap[platform];
  const mergedClassName = `${styles["userlink"]} ${styles[platform]} ${className}`;
  return (
    <a className={mergedClassName} ref={ref} href={url} target="_blank" rel="noreferrer" {...rest}>
      {icon}
      <span>{name}</span>
      <IconArrowRight />
    </a>
  );
};
