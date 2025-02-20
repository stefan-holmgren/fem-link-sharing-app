import { useCallback, useRef } from "react";
import styles from "./Profile.module.css";
import { User } from "@/components/AuthContext/AuthContext";
import { supabase } from "@/config/supabase";
import { useUserProfile } from "./hooks/useGetUserProfile";

type ProfileProps = {
  user: User;
};

const updateDropZone = (dropZoneElement: HTMLElement, file: File, destination: string): Promise<void> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      while (dropZoneElement.firstChild) {
        dropZoneElement.removeChild(dropZoneElement.firstChild);
      }

      const imgElement = document.createElement("img");
      imgElement.src = event.target?.result as string;
      imgElement.className = styles.preview;
      while (dropZoneElement.firstChild) {
        dropZoneElement.removeChild(dropZoneElement.firstChild);
      }
      dropZoneElement.appendChild(imgElement);

      const { error } = await supabase.storage.from("profile_pictures").upload(destination, file, {
        upsert: true,
      });

      if (error) {
        console.error("Error uploading file:", error.message);
        rej(error);
        return;
      }
      console.log("File uploaded to storage at:", destination);
      res();
    };

    reader.readAsDataURL(file);
  });
};

export const Profile = ({ user }: ProfileProps) => {
  const dropZoneRef = useRef<HTMLButtonElement>(null);
  const inputElementRef = useRef<HTMLInputElement>(null);
  const { userProfile, updateUserProfile } = useUserProfile();

  const publicProfilePictureUrl = userProfile?.profileImagePath
    ? supabase.storage.from("profile_pictures").getPublicUrl(userProfile?.profileImagePath).data.publicUrl
    : null;

  const uploadFile = useCallback(
    async (file: File) => {
      if (!dropZoneRef.current) {
        return;
      }
      try {
        const oldProfilePicturePath = userProfile?.profileImagePath;
        const profilePicturePath = `${user.id}/profile-picture-${Date.now().toString(36)}`;
        await updateDropZone(dropZoneRef.current, file, profilePicturePath);
        updateUserProfile({ ...userProfile, profileImagePath: profilePicturePath });
        if (oldProfilePicturePath) {
          supabase.storage.from("profile_pictures").remove([oldProfilePicturePath]);
        }
      } catch (err) {
        console.error("Failed to upload file", err);
      }
    },
    [updateUserProfile, user.id, userProfile]
  );

  return (
    <div className={styles.profile}>
      <div className={styles.info}>PROFILE {user.email}</div>
      <button
        ref={dropZoneRef}
        className={styles["drop-zone"]}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (!file) {
            return;
          }
          uploadFile(file);
        }}
        onClick={() => {
          inputElementRef.current?.click();
        }}
      >
        Drop an image here or paste it
      </button>
      {publicProfilePictureUrl ? <img src={publicProfilePictureUrl} alt="Profile" className={styles["profile-picture"]} /> : null}
      <input
        style={{ display: "none" }}
        ref={inputElementRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) {
            return;
          }
          uploadFile(file);
        }}
      />
    </div>
  );
};
