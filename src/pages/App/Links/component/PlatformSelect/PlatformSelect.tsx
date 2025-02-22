import { Platform } from "../../data/userLinks.data";

type PlatformSelectProps = {
  defaultValue: Platform;
};

export const PlatformSelect = ({ defaultValue }: PlatformSelectProps) => {
  return (
    <select defaultValue={defaultValue}>
      <option value="github">GitHub</option>
      <option value="youtube">YouTube</option>
    </select>
  );
};
