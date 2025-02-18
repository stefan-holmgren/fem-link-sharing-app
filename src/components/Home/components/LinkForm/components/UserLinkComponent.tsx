import styles from "./UserLinkComponent.module.css";
import { ChangeEvent, InvalidEvent, Ref, useImperativeHandle, useRef, useState } from "react";
import { UserLink } from "../utils/userLinks.utils";
import { isPlatform, linkTypes } from "./linkTypes.utils";

type UserLinkComponentProps = {
  userLink: UserLink;
  onChange: (newUserLink: UserLink) => void;
  ref?: Ref<UserLinkComponentRef>;
};

type UserLinkComponentRef = {
  focus: () => void;
};

export const UserLinkComponent = ({ userLink, onChange, ref }: UserLinkComponentProps) => {
  const currentLinkType = linkTypes.find((linkType) => linkType.value === userLink.platform);
  const inputPlaceHolder = currentLinkType?.exampleUrl ? `e.g. ${currentLinkType.exampleUrl}` : "";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const platformRef = useRef<HTMLSelectElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      platformRef.current?.focus();
    },
  }));

  const onInvalid = (e: InvalidEvent<HTMLInputElement>) => {
    const { target } = e;
    e.preventDefault();

    if (target.validity.valueMissing) {
      setErrorMessage("Cannot be empty");
    } else if (target.validity.typeMismatch || target.validity.patternMismatch) {
      setErrorMessage("Need to be a valid url");
    }
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity("");
    setErrorMessage(null);
  };

  const handleChange = () => {
    const platform = platformRef.current?.value ?? "";
    const url = urlRef.current?.value ?? "";

    if (isPlatform(platform)) {
      onChange({
        platform,
        url,
      });
    }
  };

  return (
    <li className={styles["user-link-component"]}>
      <select aria-label="Platform" value={userLink.platform} onChange={() => handleChange()} ref={platformRef}>
        {linkTypes.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      <input
        type="url"
        defaultValue={userLink.url}
        placeholder={inputPlaceHolder}
        onInput={onInput}
        onInvalid={onInvalid}
        required
        onChange={() => handleChange()}
        pattern={currentLinkType?.urlPattern}
        aria-invalid={!!errorMessage}
        data-invalid={!!errorMessage}
        ref={urlRef}
      />
      {!!errorMessage && <span className={styles["error-message"]}>{errorMessage}</span>}
    </li>
  );
};
