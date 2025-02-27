import styles from "./Profile.module.css";
import { SaveForm } from "@/components/SaveForm/SaveForm";
import { useMobileMockup } from "../AppLayout/hooks/useMobileMockup";
import { useGetUserLinks } from "../Links/hooks/useGetUserLinks";

export const Profile = () => {
  const { userLinks } = useGetUserLinks();

  useMobileMockup({ showSkeleton: false, userLinks: userLinks ?? [] });
  return (
    <div className={styles.profile}>
      <SaveForm isSaveDisabled={false} isSaving={false}>
        <h1>Profile</h1>
      </SaveForm>
    </div>
  );
};
