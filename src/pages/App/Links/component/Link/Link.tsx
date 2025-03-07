import styles from "./Link.module.css";
import { Platform, UserLink } from "@/data/userLinks.data";
import { Input } from "@/components/Input/Input";
import IconLink from "@/assets/icon-link.svg?react";
import IconDragAndDrop from "@/assets/icon-drag-and-drop.svg?react";
import { PlatformSelect } from "../PlatformSelect/PlatformSelect";
import { Button } from "@/components/Button/Button";
import { platformMap } from "@/utils/platforminfo.utils";
import { InvalidEvent, Ref, useEffect, useImperativeHandle, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type UserLinkWithUniqueId = UserLink & { id: number };

export type LinkRefType = {
  focus: () => void;
};

type LinkProps = {
  userLink: UserLinkWithUniqueId;
  onRemove: () => void;
  onChange: (newLink: UserLink) => void;
  invalidMessage?: string;
  ref?: Ref<LinkRefType>;
};

export const Link = ({ userLink, onRemove, onChange, invalidMessage, ref }: LinkProps) => {
  const selectRef = useRef<HTMLButtonElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const sortable = useSortable({ id: userLink.id });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
    zIndex: sortable.isDragging ? 1 : "auto",
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      selectRef.current?.focus();
    },
  }));

  useEffect(() => {
    urlRef.current?.setCustomValidity(invalidMessage ?? "");
  }, [invalidMessage]);

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = { ...userLink, url: e.target.value };
    onChange(newLink);
  };

  const onPlatformChange = (newPlatform: Platform) => {
    const newLink = { ...userLink, platform: newPlatform };
    urlRef.current?.setCustomValidity("");
    onChange(newLink);
  };

  const { pattern, placeholderExample } = platformMap[userLink.platform];

  const onUrlInvalid = (e: InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity(`Please check again`);
    }
  };

  return (
    <li className={styles.link} style={style} ref={sortable.setNodeRef}>
      <div>
        <div className={styles.draggable} {...sortable.attributes} {...sortable.listeners}>
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
        <PlatformSelect ref={selectRef} defaultValue={userLink.platform} onChange={onPlatformChange} />
        <Input
          ref={urlRef}
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
    </li>
  );
};
