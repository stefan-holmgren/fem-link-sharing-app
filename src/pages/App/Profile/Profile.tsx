import styles from "./Profile.module.css";
import { SaveForm } from "@/components/SaveForm/SaveForm";
import { useMobileMockup } from "../AppLayout/hooks/useMobileMockup";
import { useGetUserLinks } from "../Links/hooks/useGetUserLinks";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Input } from "@/components/Input/Input";
import { UploadImageButton } from "./components/UploadImageButton/UploadImageButton";
import { SaveBlocker } from "@/components/SaveBlocker/SaveBlocker";
import { useGetUserProfile } from "./hooks/useGetUserProfile";

export const Profile = () => {
  const { userProfile } = useGetUserProfile();
  const { userLinks } = useGetUserLinks();
  const [dirty, setDirty] = useState(false);
  const [, setProfileImageFile] = useState<File | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(userProfile);
  const headerId = useId();
  const descriptionId = useId();
  const uploadImageId = useId();

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
    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setCurrentUserProfile((prev) => (prev ? { ...prev, profileImageUrl: dataUrl } : { firstName: "", lastName: "", profileImageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    setDirty(false);
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
              defaultImageUrl={userProfile?.profileImageUrl}
            />
            <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
          </section>
          <section className={styles.details}>
            <Input
              ref={firstNameRef}
              label="First name*"
              placeholder="Enter your first name"
              defaultValue={userProfile?.firstName}
              onChange={onDetailsChange}
              required
            />
            <Input
              ref={lastNameRef}
              label="Last name*"
              placeholder="Enter your last name"
              defaultValue={userProfile?.lastName}
              onChange={onDetailsChange}
              required
            />
            <Input
              ref={emailRef}
              label="Email"
              placeholder="Enter your email address"
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
