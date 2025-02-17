import styles from "./UserLinkComponent.module.css";
import { ChangeEvent, InvalidEvent, Ref, useState } from "react";
import { UserLink } from "../utils/userLinks.utils";
import { isPlatform, linkTypes, Platform } from "./linkTypes.utils";

type UserLinkComponentProps = {
  userLink: UserLink;
  ref?: Ref<HTMLSelectElement>;
  onPlatformChanged: (newPlatform: Platform) => void;
};

export const UserLinkComponent = ({ userLink, ref, onPlatformChanged }: UserLinkComponentProps) => {
  const currentLinkType = linkTypes.find((linkType) => linkType.value === userLink.platform);
  const inputPlaceHolder = currentLinkType?.exampleUrl ? `e.g. ${currentLinkType.exampleUrl}` : "";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity("");
    setErrorMessage(null);
  };

  return (
    <li className={styles["user-link-component"]}>
      <select
        aria-label="Platform"
        ref={ref}
        value={userLink.platform}
        onChange={(e) => {
          if (isPlatform(e.target.value)) {
            onPlatformChanged(e.target.value);
          }
        }}
      >
        {linkTypes.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      <input type="url" defaultValue={userLink.url} placeholder={inputPlaceHolder} onInput={onInput} />
      {!!errorMessage && <span className={styles["error-message"]}>{errorMessage}</span>}
    </li>
  );
};
