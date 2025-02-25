import { HTMLAttributes, Ref } from "react";
import styles from "./Mobile.module.css";
import IllustrationPhoneMockup from "@/assets/illustration-phone-mockup.svg?react";

type MobileProps = HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> } & { showSkeleton?: boolean };

export const Mobile = ({ className = "", ref, showSkeleton = true, ...rest }: MobileProps) => {
  const classNames = [styles.mobile];
  if (showSkeleton) {
    classNames.push(styles.skeleton);
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(" ")} {...rest} ref={ref}>
      <IllustrationPhoneMockup />
      <div>
        <div className={styles["profile-picture"]}></div>
        <div className={styles["profile-details"]}>
          <h2>Ben Wright</h2>
          <p>ben@example.com</p>
        </div>
        <ul className={styles["profile-links"]}>
          <li>
            <div className={styles["profile-link"]} />
          </li>
          <li>
            <div className={styles["profile-link"]} />
          </li>
          <li>
            <div className={styles["profile-link"]} />
          </li>
          <li>
            <div className={styles["profile-link"]} />
          </li>
          <li>
            <div className={styles["profile-link"]} />
          </li>
          <li>
            <div className={styles["profile-link"]} />
          </li>
        </ul>
      </div>
    </div>
  );
};
