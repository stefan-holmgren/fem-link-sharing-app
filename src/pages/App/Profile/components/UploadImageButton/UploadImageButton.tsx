import { ChangeEvent, DragEvent, HTMLAttributes, useRef } from "react";
import styles from "./UploadImageButton.module.css";
import IconUploadImage from "@/assets/icon-upload-image.svg?react";

type UploadImageButtonProps = HTMLAttributes<HTMLButtonElement> & {};

export const UploadImageButton = ({ className = "", ...rest }: UploadImageButtonProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("selected file", file);
    }
  };

  const onDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      console.log("dropped file", file);
    } else {
      console.log("Invalid file type. Only JPEG and PNG are allowed.");
    }
  };

  const onClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <>
      <button className={`${styles["upload-image-button"]} ${className}`} onClick={onClick} onDragOver={onDragOver} onDrop={onDrop} {...rest}>
        <IconUploadImage aria-hidden />
        <span>+ Upload Image</span>
      </button>
      <input ref={inputFileRef} type="file" accept="image/png, image/jpeg" style={{ display: "none" }} onChange={onFileChange} />
    </>
  );
};
