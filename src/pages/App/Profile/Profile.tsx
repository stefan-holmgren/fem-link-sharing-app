import styles from "./Profile.module.css";
import { SaveForm } from "@/components/SaveForm/SaveForm";
import { useMobileMockup } from "../AppLayout/hooks/useMobileMockup";
import { useGetUserLinks } from "@/hooks/useGetUserLinks";
import { FormEvent, use, useEffect, useId, useRef, useState } from "react";
import { Input } from "@/components/Input/Input";
import { UploadImageButton } from "./components/UploadImageButton/UploadImageButton";
import { SaveBlocker } from "@/components/SaveBlocker/SaveBlocker";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { useSaveUserProfile } from "@/hooks/useSaveUserProfile";
import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";
import IconChangesSaved from "@/assets/icon-changes-saved.svg?react";
import { downloadFileAsDataUrl } from "@/utils/file.utils";

export const Profile = () => {
  const { userProfile } = useGetUserProfile();
  const { mutateAsync: saveUserProfile, isPending: isMutating } = useSaveUserProfile();
  const { userLinks } = useGetUserLinks();
  const [dirty, setDirty] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState(userProfile);
  const [profileImageDataUrl, setProfileImageDataUrl] = useState<string>();
  const headerId = useId();
  const descriptionId = useId();
  const uploadImageId = useId();
  const snackbars = use(SnackbarContext);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userProfile) {
      setCurrentUserProfile(userProfile);
    }
  }, [userProfile]);

  useMobileMockup({ showSkeleton: false, userLinks, userProfile: currentUserProfile });

  const onProfileImageChange = (file: File) => {
    setDirty(true);
    setCurrentUserProfile((prev) => (prev ? { ...prev, profileImageFile: file } : { firstName: "", lastName: "", profileImageFile: file }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isMutating) {
      return;
    }
    if (!currentUserProfile) {
      return;
    }

    saveUserProfile({ userProfile: currentUserProfile })
      .then(() => {
        setDirty(false);
        snackbars.showSnackbar({ message: "Your changes have been successfully saved!", variant: "positive", icon: <IconChangesSaved /> });
      })
      .catch(() => {
        snackbars.showSnackbar({ message: "Failed to save changes", variant: "negative" });
      });
  };

  const onDetailsChange = () => {
    setDirty(true);
    setCurrentUserProfile({
      ...currentUserProfile,
      firstName: firstNameRef.current?.value ?? "",
      lastName: lastNameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
    });
  };

  useEffect(() => {
    if (!userProfile) {
      return;
    }
    const imageFile = userProfile.profileImageFile;
    if (!imageFile) {
      return;
    }
    downloadFileAsDataUrl(imageFile).then(setProfileImageDataUrl);
  }, [userProfile]);

  return (
    <>
      <SaveForm
        header="Profile Details"
        description="Add your details to create a personal touch to your profile"
        isSaveDisabled={false}
        isSaving={false}
        aria-labelledby={headerId}
        aria-describedby={descriptionId}
        onSubmit={onSubmit}
      >
        <div className={styles.profile}>
          <section className={styles.picture}>
            <label htmlFor={uploadImageId}>Profile Picture</label>
            <UploadImageButton
              id={uploadImageId}
              type="button"
              allowedTypes={["image/jpeg", "image/png"]}
              maxWidth={1024}
              maxHeight={1024}
              onFileChange={onProfileImageChange}
              defaultImageUrl={profileImageDataUrl}
            />
            <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
          </section>
          <section className={styles.details}>
            <Input ref={firstNameRef} label="First name*" placeholder="e.g. John" defaultValue={userProfile?.firstName} onChange={onDetailsChange} required />
            <Input ref={lastNameRef} label="Last name*" placeholder="e.g. Appleseed" defaultValue={userProfile?.lastName} onChange={onDetailsChange} required />
            <Input
              ref={emailRef}
              label="Email"
              placeholder="e.g. email@example.com"
              defaultValue={userProfile?.email}
              onChange={onDetailsChange}
              type="email"
            />
          </section>
        </div>
      </SaveForm>
      <SaveBlocker dirty={dirty} />
    </>
  );
};
