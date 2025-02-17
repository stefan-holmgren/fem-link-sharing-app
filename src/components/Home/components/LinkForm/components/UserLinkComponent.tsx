import { Ref } from "react";
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
  return (
    <li key={userLink.url}>
      <select
        aria-label="Platform"
        required
        ref={ref}
        onChange={(e) => {
          if (isPlatform(e.target.value)) {
            onPlatformChanged(e.target.value);
          }
        }}
      >
        {linkTypes.map(({ value, label }) => (
          <option value={value} selected={userLink.platform === value}>
            {label}
          </option>
        ))}
      </select>
      <input
        type="url"
        defaultValue={userLink.url}
        required
        placeholder={inputPlaceHolder}
        pattern={currentLinkType?.urlPattern}
        title={"Please check the URL"}
      />
    </li>
  );
};
