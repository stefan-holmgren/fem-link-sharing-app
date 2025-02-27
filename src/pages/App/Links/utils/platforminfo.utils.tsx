import { ReactNode } from "react";
import { Platform } from "../data/userLinks.data";

import GithubIcon from "@/assets/platforms/icon-github.svg?react";
import FrontendMentorIcon from "@/assets/platforms/icon-frontend-mentor.svg?react";
import YoutubeIcon from "@/assets/platforms/icon-youtube.svg?react";
import XIcon from "@/assets/platforms/icon-x.svg?react";
import LinkedinIcon from "@/assets/platforms/icon-linkedin.svg?react";

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
  "frontend-mentor": {
    icon: <FrontendMentorIcon />,
    name: "Frontend Mentor",
    pattern: "https://www.frontendmentor.io/profile/.+",
    placeholderExample: "https://www.frontendmentor.io/profile/johnappleseed",
  },
  x: {
    icon: <XIcon />,
    name: "X",
    pattern: "https://x.com/.+",
    placeholderExample: "https://x.com/johnappleseed",
  },
  linkedin: {
    icon: <LinkedinIcon />,
    name: "LinkedIn",
    pattern: "https://www.linkedin.com/in/.+",
    placeholderExample: "https://www.linkedin.com/in/johnappleseed",
  },
  youtube: {
    icon: <YoutubeIcon />,
    name: "YouTube",
    pattern: "https://www.youtube.com/@.+",
    placeholderExample: "https://www.youtube.com/@johnappleseed",
  },
};
