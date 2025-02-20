import { useCallback, useRef } from "react";
import styles from "./Profile.module.css";
import { User } from "@/components/AuthContext/AuthContext";
import { supabase } from "@/config/supabase";
import { useUserProfile } from "./hooks/useGetUserProfile";

type ProfileProps = {
  user: User;
};

const updateDropZone = (dropZoneElement: HTMLElement, file: File, destination: string): Promise<string> => {
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
      const {
        data: { publicUrl },
      } = supabase.storage.from("profile_pictures").getPublicUrl(destination);
      res(publicUrl);
    };

    reader.readAsDataURL(file);
  });
};

export const Profile = ({ user }: ProfileProps) => {
  const profilePicturePath = `${user.id}/profile-picture`;
  const dropZoneRef = useRef<HTMLButtonElement>(null);
  const inputElementRef = useRef<HTMLInputElement>(null);
  const { userProfile, updateUserProfile } = useUserProfile();

  const uploadFile = useCallback(
    async (file: File) => {
      if (!dropZoneRef.current) {
        return;
      }
      try {
        const publicProfilePictureUrl = await updateDropZone(dropZoneRef.current, file, profilePicturePath);
        updateUserProfile({ ...userProfile, profileImageUrl: publicProfilePictureUrl });
      } catch (err) {
        console.error("Failed to upload file", err);
      }
    },
    [profilePicturePath, updateUserProfile, userProfile]
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
      {userProfile?.profileImageUrl ? (
        <img
          src={userProfile.profileImageUrl}
          alt="Profile"
          className={styles["profile-picture"]}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
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
