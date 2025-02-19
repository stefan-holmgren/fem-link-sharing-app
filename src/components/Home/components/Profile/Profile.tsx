import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { User } from "@/components/AuthContext/AuthContext";
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

type ProfileProps = {
  user: User;
};

const updateDropZone = async (dropZoneElement: HTMLElement, file: File, destination: string) => {
  const reader = new FileReader();

  reader.onload = async (event) => {
    while (dropZoneElement.firstChild) {
      dropZoneElement.removeChild(dropZoneElement.firstChild);
    }

    const imgElement = document.createElement("img");
    imgElement.src = event.target?.result as string;
    imgElement.className = styles.preview;
    dropZoneElement.innerHTML = "";
    dropZoneElement.appendChild(imgElement);

    // Upload to Firebase Storage
    const storageRef = ref(storage, destination);
    await uploadBytes(storageRef, file, { cacheControl: "public, max-age=1800" });
    console.log("File uploaded to Firebase Storage at:", destination);
  };
  reader.readAsDataURL(file);
};

export const Profile = ({ user }: ProfileProps) => {
  const profilePicturePath = `/profiles/${user.id}`;
  const dropZoneRef = useRef<HTMLButtonElement>(null);
  const inputElementRef = useRef<HTMLInputElement>(null);
  const storageRef = useMemo(() => ref(storage, profilePicturePath), [profilePicturePath]);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    getDownloadURL(storageRef).then(setProfilePictureUrl);
  }, [storageRef]);

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
          if (file && dropZoneRef.current) {
            updateDropZone(dropZoneRef.current, file, profilePicturePath);
          }
        }}
        onClick={() => {
          inputElementRef.current?.click();
        }}
      >
        Drop an image here or paste it
      </button>
      {profilePictureUrl && <img src={profilePictureUrl} alt="Profile" className={styles.profilePicture} />}
      <input
        style={{ display: "none" }}
        ref={inputElementRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && dropZoneRef.current) {
            updateDropZone(dropZoneRef.current, file, profilePicturePath);
          }
        }}
      />
    </div>
  );
};
