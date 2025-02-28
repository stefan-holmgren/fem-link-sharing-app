import { ButtonHTMLAttributes, ChangeEvent, DragEvent, use, useRef, useState } from "react";
import styles from "./UploadImageButton.module.css";
import IconUploadImage from "@/assets/icon-upload-image.svg?react";
import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";

type UploadImageButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onFileChange?: (file: File) => void;
  maxWidth: number;
  maxHeight: number;
  allowedTypes: string[];
  defaultImageUrl?: string;
};

export const UploadImageButton = ({ className = "", allowedTypes, onFileChange, maxWidth, maxHeight, defaultImageUrl, ...rest }: UploadImageButtonProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const snackbars = use(SnackbarContext);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const validateImageDimensions = (file: File) => {
    return new Promise<{ valid: boolean; message?: string }>((resolve) => {
      if (!allowedTypes.includes(file.type)) {
        resolve({ valid: false, message: "Invalid file type" });
        return;
      }

      const img = new Image();
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          resolve({ valid: false, message: `Image dimensions must not exceed ${maxWidth}x${maxHeight}px` });
        } else {
          resolve({ valid: true });
        }
      };
      img.onerror = () => {
        resolve({ valid: false, message: "Failed to load image" });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (file: File) => {
    const validation = await validateImageDimensions(file);
    if (!validation.valid) {
      if (validation.message) {
        snackbars.showSnackbar({ message: validation.message, variant: "negative" });
      }
      return;
    }
    setCurrentImageUrl(URL.createObjectURL(file));
    onFileChange?.(file);
  };

  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    handleFileChange(file);
  };

  const onDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) {
      return;
    }
    handleFileChange(file);
  };

  const onClick = () => {
    inputFileRef.current?.click();
  };

  const activeImageUrl = currentImageUrl || defaultImageUrl;

  return (
    <>
      <button
        className={`${styles["upload-image-button"]} ${className}`}
        onClick={onClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        style={{
          backgroundImage: activeImageUrl ? `url(${activeImageUrl})` : undefined,
        }}
        {...rest}
      >
        <div>
          <IconUploadImage aria-hidden />
          <span>{activeImageUrl ? "Change Image" : "+ Upload Image"}</span>
        </div>
      </button>
      <input ref={inputFileRef} type="file" accept={allowedTypes.join(", ")} style={{ display: "none" }} onChange={onFileInputChange} />
    </>
  );
};
