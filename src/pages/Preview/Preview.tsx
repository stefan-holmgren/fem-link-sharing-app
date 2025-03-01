import { Button } from "@/components/Button/Button";
import styles from "./Preview.module.css";
import { Link } from "react-router-dom";
import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";
import { use } from "react";
import IconLink from "@/assets/icon-link.svg?react";
import { useGetUserLinks } from "@/hooks/useGetUserLinks";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";

export const Preview = () => {
  const { userLinks } = useGetUserLinks();
  const { userProfile } = useGetUserProfile();

  console.log(userLinks, userProfile);

  const snackbars = use(SnackbarContext);

  const onShareLink = () => {
    // TODO Generate a shareable link
    navigator.clipboard.writeText(window.location.href);
    snackbars.showSnackbar({ message: "The link has been copied to your clipboard", variant: "positive", icon: <IconLink /> });
  };

  return (
    <div className={styles.preview}>
      <header>
        <Button variant="secondary" asChild>
          <Link to="/">Back to Editor</Link>
        </Button>
        <Button variant="primary" onClick={onShareLink}>
          Share Link
        </Button>
      </header>
      <main></main>
    </div>
  );
};
