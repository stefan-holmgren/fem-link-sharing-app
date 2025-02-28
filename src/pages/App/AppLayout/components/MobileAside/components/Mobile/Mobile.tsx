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
  showLinksSkeleton?: boolean;
};

export const Mobile = ({ className = "", ref, showLinksSkeleton = true, userLinks, userProfile, ...rest }: MobileProps) => {
  const [imageDataUrl, setImageDataUrl] = useState<string>();

  const mergedClassName = `${styles.mobile} ${className}`;
  const name = userProfile ? `${userProfile?.firstName} ${userProfile?.lastName}`.trim() : undefined;

  useEffect(() => {
    if (!userProfile) {
      setImageDataUrl(undefined);
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
        <div className={styles["profile-picture"]} style={{ backgroundImage: imageDataUrl ? `url(${imageDataUrl}` : undefined }} />
        <div className={styles["profile-details"]}>
          <h2>{name}</h2>
          <p>{userProfile?.email}</p>
        </div>
        <ul className={`${styles["profile-links"]} ${showLinksSkeleton ? styles["links-skeleton"] : ""}`}>
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
