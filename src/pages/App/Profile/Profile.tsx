import styles from "./Profile.module.css";
import { SaveForm } from "@/components/SaveForm/SaveForm";
import { useMobileMockup } from "../AppLayout/hooks/useMobileMockup";
import { useGetUserLinks } from "../Links/hooks/useGetUserLinks";
import IconUploadImage from "@/assets/icon-upload-image.svg?react";
import { useId } from "react";
import { Input } from "@/components/Input/Input";

export const Profile = () => {
  const { userLinks } = useGetUserLinks();
  const headerId = useId();
  const descriptionId = useId();
  const uploadImageId = useId();

  useMobileMockup({ showSkeleton: false, userLinks: userLinks ?? [] });

  const onUploadImage = () => {
    console.log("Upload image");
  };

  return (
    <SaveForm
      header="Profile Details"
      description="Add your details to create a personal touch to your profile"
      isSaveDisabled={false}
      isSaving={false}
      aria-labelledby={headerId}
      aria-describedby={descriptionId}
    >
      <div className={styles.profile}>
        <section className={styles.picture}>
          <label htmlFor={uploadImageId}>Profile Picture</label>
          <button id={uploadImageId} type="button" onClick={onUploadImage}>
            <IconUploadImage aria-hidden />
            <span>+ Upload Image</span>
          </button>
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </section>
        <section className={styles.details}>
          <Input label="First name*" placeholder="Enter your first name" required />
          <Input label="Last name*" placeholder="Enter your last name" required />
          <Input label="Email" placeholder="Enter your email address" type="email" />
        </section>
      </div>
    </SaveForm>
  );
};
