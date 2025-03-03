import { PublicProfile as PublicProfileType } from "@/data/publicProfile.data";
import styles from "./PublicProfile.module.css";
import { UserLink } from "../UserLink/UserLink";
import { useState } from "react";

type PublicProfileProps = {
  publicProfile: PublicProfileType;
};

const PublicProfile = ({ publicProfile: { profileImageUrl, name, email, userLinks } }: PublicProfileProps) => {
  const [profileImageFailed, setProfileImageFailed] = useState(false);

  const onImageError = () => {
    setProfileImageFailed(true);
  };

  return (
    <main className={styles["public-profile"]}>
      <div>
        <div className={styles.profile}>
          {!!profileImageUrl && !profileImageFailed && <img src={profileImageUrl} alt="" onError={onImageError} />}
          {!!name && <h1>{name}</h1>}
          {!!email && <p>{email}</p>}
        </div>
        <ul>
          {userLinks &&
            userLinks?.map((userLink, i) => (
              <li key={`${userLink.url}-${i}`}>
                <UserLink userLink={userLink} />
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
};

export default PublicProfile;
