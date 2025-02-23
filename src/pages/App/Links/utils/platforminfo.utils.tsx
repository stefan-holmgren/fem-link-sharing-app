import { ReactNode } from "react";
import { Platform } from "../data/userLinks.data";

import GithubIcon from "@/assets/platforms/icon-github.svg?react";
import YoutubeIcon from "@/assets/platforms/icon-youtube.svg?react";

type PlatformInfo = {
  icon: ReactNode;
  name: string;
  pattern: string;
  placeholderExample: string;
};

export const platformMap: Record<Platform, PlatformInfo> = {
  github: {
    icon: <GithubIcon />,
    name: "GitHub",
    pattern: "https://github.com/.+",
    placeholderExample: "https://github.com/johnappleseed",
  },
  youtube: {
    icon: <YoutubeIcon />,
    name: "YouTube",
    pattern: "https://www.youtube.com/@.+",
    placeholderExample: "https://youtube.com/@johnappleseed",
  },
};
