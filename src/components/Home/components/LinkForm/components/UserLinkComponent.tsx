import styles from "./UserLinkComponent.module.css";
import { ChangeEvent, ChangeEventHandler, InvalidEvent, Ref, useImperativeHandle, useRef, useState } from "react";
import { UserLink } from "../utils/userLinks.utils";
import { isPlatform, linkTypes } from "./linkTypes.utils";
import * as Select from "@radix-ui/react-select";

type UserLinkComponentProps = {
  userLink: UserLink;
  onChange: (newUserLink: UserLink) => void;
  ref?: Ref<UserLinkComponentRef>;
};

export type UserLinkComponentRef = {
  focus: () => void;
};

export const UserLinkComponent = ({ userLink, onChange, ref }: UserLinkComponentProps) => {
  const currentLinkType = linkTypes.find((linkType) => linkType.value === userLink.platform);
  const inputPlaceHolder = currentLinkType?.exampleUrl ? `e.g. ${currentLinkType.exampleUrl}` : "";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const platformRef = useRef<HTMLButtonElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus: () => {
          platformRef.current?.focus();
        },
      };
    },
    []
  );

  const onInvalid = (e: InvalidEvent<HTMLInputElement>) => {
    const { target } = e;
    e.preventDefault();
    if (target.validity.valueMissing) {
      setErrorMessage("Cannot be empty");
    } else if (target.validity.typeMismatch || target.validity.patternMismatch) {
      setErrorMessage("Need to be a valid url");
    } else {
      setErrorMessage(null);
    }
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity("");
    setErrorMessage(null);
  };

  const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const url = e.target.value ?? "";
    onChange({
      ...userLink,
      url,
    });
  };

  const handlePlatformChange = (newPlatform: string) => {
    if (isPlatform(newPlatform)) {
      onChange({ ...userLink, platform: newPlatform });
      // Make sure the input removes its error state (if it has one)
      setErrorMessage(null);
    }
  };

  return (
    <div className={styles["user-link-component"]}>
      <Select.Root defaultValue={userLink.platform} onValueChange={handlePlatformChange}>
        <Select.Trigger aria-label="Platform" ref={platformRef}>
          <Select.Value />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position={"popper"}>
            <Select.Viewport>
              {linkTypes.map(({ value, label }) => (
                <Select.Item value={value} key={value}>
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <input
        type="url"
        defaultValue={userLink.url}
        placeholder={inputPlaceHolder}
        onInput={onInput}
        onInvalid={onInvalid}
        required
        onChange={handleUrlChange}
        pattern={currentLinkType?.urlPattern}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ?? ""}
        data-invalid={!!errorMessage}
        ref={urlRef}
      />
      {!!errorMessage && <span className={styles["error-message"]}>{errorMessage}</span>}
    </div>
  );
};
