import styles from "./Link.module.css";
import { UserLink } from "../../data/userLinks.data";
import { Input } from "@/components/Input/Input";
import IconLink from "@/assets/icon-link.svg?react";
import IconDragAndDrop from "@/assets/icon-drag-and-drop.svg?react";
import { PlatformSelect } from "../PlatformSelect/PlatformSelect";

type LinkProps = {
  linkIndex: number;
  userLink: UserLink;
  onRemove: () => void;
  onChange: (newLink: UserLink) => void;
};

export const Link = ({ linkIndex, userLink, onRemove, onChange }: LinkProps) => {
  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = { ...userLink, url: e.target.value };
    onChange(newLink);
  };

  return (
    <div className={styles.link}>
      <div>
        <IconDragAndDrop />
        <h3>Link #{linkIndex + 1}</h3>
        <button type="button" data-tertiary onClick={() => onRemove()}>
          Remove
        </button>
      </div>
      <fieldset>
        <PlatformSelect defaultValue={userLink.platform} />
        <Input label="Link" icon={<IconLink />} defaultValue={userLink.url} onChange={onUrlChange} />
      </fieldset>
    </div>
  );
};
