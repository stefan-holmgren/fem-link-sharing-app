import styles from "./Profile.module.css";
import { SaveForm } from "@/components/SaveForm/SaveForm";
import { useMobileMockup } from "../AppLayout/hooks/useMobileMockup";

export const Profile = () => {
  useMobileMockup({ showSkeleton: false });
  return (
    <div className={styles.profile}>
      <SaveForm isSaveDisabled={false} isSaving={false}>
        <h1>Profile</h1>
      </SaveForm>
    </div>
  );
};
