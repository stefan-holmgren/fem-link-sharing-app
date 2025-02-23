import styles from "./Link.module.css";
import { UserLink } from "../../data/userLinks.data";
import { Input } from "@/components/Input/Input";
import IconLink from "@/assets/icon-link.svg?react";
import IconDragAndDrop from "@/assets/icon-drag-and-drop.svg?react";
import { PlatformSelect } from "../PlatformSelect/PlatformSelect";
import { Button } from "@/components/Button/Button";

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
        <PlatformSelect defaultValue={userLink.platform} />
        <Input className={styles["link-input"]} label="Link" icon={<IconLink />} defaultValue={userLink.url} onChange={onUrlChange} />
      </fieldset>
    </div>
  );
};
