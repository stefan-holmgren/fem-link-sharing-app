import { HTMLAttributes, Ref, useEffect, useState } from "react";
import styles from "./Mobile.module.css";
import IllustrationPhoneMockup from "@/assets/illustration-phone-mockup.svg?react";
import { UserLink } from "@/components/UserLink/UserLink";
import { UserLink as UserLinkType } from "@/pages/App/Links/data/userLinks.data";
import { UserProfile } from "@/pages/App/Profile/data/userProfile.data";
import { downloadFileAsDataUrl } from "@/utils/file.utils";

type MobileProps = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
  userLinks?: UserLinkType[] | null;
  userProfile?: UserProfile | null;
  showSkeleton?: boolean;
};

export const Mobile = ({ className = "", ref, showSkeleton = true, userLinks, userProfile, ...rest }: MobileProps) => {
  const [imageDataUrl, setImageDataUrl] = useState<string>();

  const mergedClassName = `${styles.mobile} ${showSkeleton ? styles.skeleton : ""} ${className}`;
  const name = userProfile ? `${userProfile?.firstName} ${userProfile?.lastName}` : undefined;

  useEffect(() => {
    if (!userProfile) {
      return;
    }
    const imageFile = userProfile.profileImageFile;
    if (!imageFile) {
      return;
    }
    downloadFileAsDataUrl(imageFile).then(setImageDataUrl);
  }, [userProfile]);

  return (
    <div className={mergedClassName} {...rest} ref={ref}>
      <IllustrationPhoneMockup />
      <div>
        <div className={styles["profile-picture"]} style={{ backgroundImage: `url(${imageDataUrl}` }}></div>
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
