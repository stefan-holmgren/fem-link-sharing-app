import { Button } from "@/components/Button/Button";
import styles from "./Preview.module.css";
import { Link, useLocation } from "react-router-dom";
import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";
import { use, useEffect, useState } from "react";
import IconLink from "@/assets/icon-link.svg?react";
import { useGetUserLinks } from "@/hooks/useGetUserLinks";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { downloadFileAsDataUrl } from "@/utils/file.utils";
import { useAuthContext } from "@/hooks/useAuthContext";
import PublicProfile from "@/components/PublicProfile/PublicProfile";
import { PublicProfile as PublicProfileType } from "@/data/publicProfile.data";

const Preview = () => {
  const { user } = useAuthContext();
  const { userLinks, isPending: isUserLinksPending } = useGetUserLinks(user?.id);
  const { userProfile, isPending: isUserProfilePending } = useGetUserProfile(user?.id);
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
    if (!user) {
      snackbars.showSnackbar({ message: "You need to be logged in to share your profile", variant: "negative" });
      return;
    }

    if (user.isAnonymous) {
      snackbars.showSnackbar({ message: "You cannot share a profile which is locally stored on your device", variant: "negative" });
      return;
    }

    const shareUrl = `${window.location.origin}/public/${user.id}`;
    navigator.clipboard.writeText(shareUrl);
    snackbars.showSnackbar({ message: "The link has been copied to your clipboard", variant: "positive", icon: <IconLink /> });
  };

  if (isUserLinksPending || isUserProfilePending) {
    return null;
  }

  const name = userProfile ? `${userProfile.firstName} ${userProfile.lastName}`.trim() : undefined;
  const fromPath = location.state?.from ?? "/";

  const publicProfile: PublicProfileType = {
    name,
    email: userProfile?.email,
    profileImageUrl,
    userLinks,
  };

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
      <PublicProfile publicProfile={publicProfile} />
    </div>
  );
};

export default Preview;
