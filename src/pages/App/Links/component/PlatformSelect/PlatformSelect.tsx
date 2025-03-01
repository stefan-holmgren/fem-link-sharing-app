import styles from "./PlatformSelect.module.css";
import { Label } from "@/components/Label/Label";
import { Platform, platforms } from "@/data/userLinks.data";
import * as Select from "@radix-ui/react-select";
import ChevronDownIcon from "@/assets/icon-chevron-down.svg?react";
import { platformMap } from "@/utils/platforminfo.utils";
import { Ref } from "react";

type PlatformSelectProps = {
  defaultValue: Platform;
  onChange: (newPlatform: Platform) => void;
  ref?: Ref<HTMLButtonElement>;
};

export const PlatformSelect = ({ defaultValue, onChange, ref }: PlatformSelectProps) => {
  return (
    <div className={styles["platform-select"]}>
      <Label>Platform</Label>
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger ref={ref} className={styles.trigger}>
          <Select.Value />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content className={styles.content} position={"popper"}>
          <Select.ScrollUpButton className={styles["scroll-up-button"]}>
            <ChevronDownIcon />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {platforms.map((platform) => (
              <Select.Item className={styles.item} value={platform} key={platform}>
                <Select.ItemText>
                  {platformMap[platform].icon}
                  <span>{platformMap[platform].name}</span>
                </Select.ItemText>
                <Select.ItemIndicator>&nbsp;(Selected)</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={styles["scroll-down-button"]}>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
    </div>
  );
};
