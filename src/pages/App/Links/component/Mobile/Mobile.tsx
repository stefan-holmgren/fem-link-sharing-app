import { HTMLAttributes, Ref } from "react";
import styles from "./Mobile.module.css";
import IllustrationPhoneMockup from "@/assets/illustration-phone-mockup.svg?react";

type MobileProps = HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> };

export const Mobile = ({ className = "", ref, ...rest }: MobileProps) => {
  return (
    <div className={`${styles.mobile} ${className}`} {...rest} ref={ref}>
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
