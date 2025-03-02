import { Button } from "@/components/Button/Button";
import styles from "./Preview.module.css";
import { Link, useLocation } from "react-router-dom";
import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";
import { use, useEffect, useState } from "react";
import IconLink from "@/assets/icon-link.svg?react";
import { useGetUserLinks } from "@/hooks/useGetUserLinks";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { UserLink } from "@/components/UserLink/UserLink";
import { downloadFileAsDataUrl } from "@/utils/file.utils";

export const Preview = () => {
  const { userLinks, isPending: isUserLinksPending } = useGetUserLinks();
  const { userProfile, isPending: isUserProfilePending } = useGetUserProfile();
  const [profileImageUrl, setProfileImageUrl] = useState<string>();
  const location = useLocation();

  const snackbars = use(SnackbarContext);

  useEffect(() => {
    if (!userProfile || !userProfile.profileImageFile) {
      return;
    }
    downloadFileAsDataUrl(userProfile.profileImageFile).then(setProfileImageUrl);
  }, [userProfile]);

  const onShareLink = () => {
    // TODO Generate a shareable link
    navigator.clipboard.writeText(window.location.href);
    snackbars.showSnackbar({ message: "The link has been copied to your clipboard", variant: "positive", icon: <IconLink /> });
  };

  if (isUserLinksPending || isUserProfilePending) {
    return null;
  }

  const name = userProfile ? `${userProfile.firstName} ${userProfile.lastName}`.trim() : undefined;
  const fromPath = location.state?.from ?? "/";

  return (
    <div className={styles.preview}>
      <header>
        <Button variant="secondary" asChild>
          <Link to={fromPath}>Back to Editor</Link>
        </Button>
        <Button variant="primary" onClick={onShareLink}>
          Share Link
        </Button>
      </header>
      <main>
        <div>
          <div className={styles.profile}>
            {!!profileImageUrl && <img src={profileImageUrl} alt="Profile image" />}
            {!!name && (
              <h1>
                {userProfile?.firstName} {userProfile?.lastName}
              </h1>
            )}
            {!!userProfile?.email && <p>{userProfile.email}</p>}
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
    </div>
  );
};
