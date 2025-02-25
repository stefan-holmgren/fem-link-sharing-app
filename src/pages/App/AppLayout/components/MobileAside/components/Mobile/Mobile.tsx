import { HTMLAttributes, Ref } from "react";
import styles from "./Mobile.module.css";
import IllustrationPhoneMockup from "@/assets/illustration-phone-mockup.svg?react";
import { PlatformButton } from "@/components/PlatformButton/PlatformButton";

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
            <PlatformButton platform="github" />
          </li>
          <li>
            <PlatformButton platform="frontend-mentor" />
          </li>
          <li>
            <PlatformButton platform="x" />
          </li>
          <li>
            <PlatformButton platform="linkedin" />
          </li>
          <li>
            <PlatformButton platform="youtube" />
          </li>
          <li>
            <PlatformButton platform="youtube" />
          </li>
        </ul>
      </div>
    </div>
  );
};
