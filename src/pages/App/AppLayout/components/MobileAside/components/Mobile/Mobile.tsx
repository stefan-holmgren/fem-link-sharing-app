import { HTMLAttributes, Ref } from "react";
import styles from "./Mobile.module.css";
import IllustrationPhoneMockup from "@/assets/illustration-phone-mockup.svg?react";
import { UserLink } from "@/components/UserLink/UserLink";
import { UserLink as UserLinkType } from "@/pages/App/Links/data/userLinks.data";
import { UserProfile } from "@/pages/App/Profile/data/userProfile.data";

type MobileProps = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
  userLinks?: UserLinkType[] | null;
  userProfile?: UserProfile | null;
  showSkeleton?: boolean;
};

export const Mobile = ({ className = "", ref, showSkeleton = true, userLinks, userProfile, ...rest }: MobileProps) => {
  const mergedClassName = `${styles.mobile} ${showSkeleton ? styles.skeleton : ""} ${className}`;

  const name = userProfile ? `${userProfile?.firstName} ${userProfile?.lastName}` : undefined;

  console.log("backgroundImage", userProfile?.profileImageUrl);

  return (
    <div className={mergedClassName} {...rest} ref={ref}>
      <IllustrationPhoneMockup />
      <div>
        <div className={styles["profile-picture"]} style={{ backgroundImage: `url(${userProfile?.profileImageUrl}` }}></div>
        <div className={styles["profile-details"]}>
          <h2>{name}</h2>
          <p>{userProfile?.email}</p>
        </div>
        <ul className={styles["profile-links"]}>
          {userLinks?.map((userLink, index) => (
            <li key={userLink.platform + userLink.url + index}>
              <UserLink userLink={userLink} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
