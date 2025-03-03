import { ReactNode } from "react";
import { Platform } from "@/data/userLinks.data";

import GithubIcon from "@/assets/platforms/icon-github.svg?react";
import FrontendMentorIcon from "@/assets/platforms/icon-frontend-mentor.svg?react";
import YoutubeIcon from "@/assets/platforms/icon-youtube.svg?react";
import XIcon from "@/assets/platforms/icon-x.svg?react";
import LinkedinIcon from "@/assets/platforms/icon-linkedin.svg?react";
import FacebookIcon from "@/assets/platforms/icon-facebook.svg?react";
import TwitchIcon from "@/assets/platforms/icon-twitch.svg?react";
import DevtoIcon from "@/assets/platforms/icon-devto.svg?react";
import CodewarsIcon from "@/assets/platforms/icon-codewars.svg?react";
import FreecodecampIcon from "@/assets/platforms/icon-freecodecamp.svg?react";
import GitlabIcon from "@/assets/platforms/icon-gitlab.svg?react";
import HashnodeIcon from "@/assets/platforms/icon-hashnode.svg?react";
import StackoverflowIcon from "@/assets/platforms/icon-stack-overflow.svg?react";

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
  facebook: {
    icon: <FacebookIcon />,
    name: "Facebook",
    pattern: "https://www.facebook.com/.+",
    placeholderExample: "https://www.facebook.com/johnappleseed",
  },
  twitch: {
    icon: <TwitchIcon />,
    name: "Twitch",
    pattern: "https://www.twitch.tv/.+",
    placeholderExample: "https://www.twitch.tv/johnappleseed",
  },
  devto: {
    icon: <DevtoIcon />,
    name: "Dev.to",
    pattern: "https://dev.to/.+",
    placeholderExample: "https://dev.to/johnappleseed",
  },
  codewars: {
    icon: <CodewarsIcon />,
    name: "Codewars",
    pattern: "https://www.codewars.com/users/.+",
    placeholderExample: "https://www.codewars.com/users/johnappleseed",
  },
  freecodecamp: {
    icon: <FreecodecampIcon />,
    name: "freeCodeCamp",
    pattern: "https://www.freecodecamp.org/.+",
    placeholderExample: "https://www.freecodecamp.org/johnappleseed",
  },
  gitlab: {
    icon: <GitlabIcon />,
    name: "GitLab",
    pattern: "https://gitlab.com/.+",
    placeholderExample: "https://gitlab.com/johnappleseed",
  },
  hashnode: {
    icon: <HashnodeIcon />,
    name: "Hashnode",
    pattern: "https://hashnode.com/@.+",
    placeholderExample: "https://hashnode.com/@johnappleseed",
  },
  stackoverflow: {
    icon: <StackoverflowIcon />,
    name: "Stack Overflow",
    pattern: "https://stackoverflow.com/users/.+",
    placeholderExample: "https://stackoverflow.com/users/1234567/johnappleseed",
  },
};
