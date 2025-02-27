import { HTMLAttributes, Ref } from "react";
import styles from "./Mobile.module.css";
import IllustrationPhoneMockup from "@/assets/illustration-phone-mockup.svg?react";
import { UserLink } from "@/components/UserLink/UserLink";
import { UserLink as UserLinkType } from "@/pages/App/Links/data/userLinks.data";

type MobileProps = HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement>; userLinks: UserLinkType[] } & { showSkeleton?: boolean };

export const Mobile = ({ className = "", ref, showSkeleton = true, userLinks, ...rest }: MobileProps) => {
  const mergedClassName = `${styles.mobile} ${showSkeleton ? styles.skeleton : ""} ${className}`;

  return (
    <div className={mergedClassName} {...rest} ref={ref}>
      <IllustrationPhoneMockup />
      <div>
        <div className={styles["profile-picture"]}></div>
        <div className={styles["profile-details"]}>
          <h2>Ben Wright</h2>
          <p>ben@example.com</p>
        </div>
        <ul className={styles["profile-links"]}>
          {userLinks.map((userLink, index) => (
            <li key={userLink.platform + userLink.url + index}>
              <UserLink userLink={userLink} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
