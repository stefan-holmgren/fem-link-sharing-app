import styles from "./Link.module.css";
import { Platform, UserLink } from "../../data/userLinks.data";
import { Input } from "@/components/Input/Input";
import IconLink from "@/assets/icon-link.svg?react";
import IconDragAndDrop from "@/assets/icon-drag-and-drop.svg?react";
import { PlatformSelect } from "../PlatformSelect/PlatformSelect";
import { Button } from "@/components/Button/Button";
import { platformMap } from "../../utils/platforminfo.utils";
import { InvalidEvent } from "react";

type LinkProps = {
  userLink: UserLink;
  onRemove: () => void;
  onChange: (newLink: UserLink) => void;
};

export const Link = ({ userLink, onRemove, onChange }: LinkProps) => {
  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = { ...userLink, url: e.target.value };
    onChange(newLink);
  };

  const onPlatformChange = (newPlatform: Platform) => {
    const newLink = { ...userLink, platform: newPlatform };
    onChange(newLink);
  };

  const { pattern, placeholderExample } = platformMap[userLink.platform];

  const onUrlInvalid = (e: InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity(`Please check again`);
    } else {
      e.target.setCustomValidity("");
    }
  };

  return (
    <div className={styles.link}>
      <div>
        <div className={styles.draggable}>
          <IconDragAndDrop />
          <h3>
            Link #<span className={styles.counter} />
          </h3>
        </div>
        <Button type="button" variant="tertiary" onClick={() => onRemove()}>
          Remove
        </Button>
      </div>
      <fieldset>
        <PlatformSelect defaultValue={userLink.platform} onChange={onPlatformChange} />
        <Input
          className={styles["link-input"]}
          label="Link"
          icon={<IconLink />}
          placeholder={`e.g. ${placeholderExample}`}
          pattern={pattern}
          defaultValue={userLink.url}
          onChange={onUrlChange}
          onInvalid={onUrlInvalid}
          required
        />
      </fieldset>
    </div>
  );
};
