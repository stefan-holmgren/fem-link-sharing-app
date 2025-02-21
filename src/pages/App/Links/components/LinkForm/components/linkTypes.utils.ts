const platforms = ["github", "youtube"] as const;

export type Platform = (typeof platforms)[number];

type LinkType = {
  value: Platform;
  label: string;
  urlPattern: string;
  exampleUrl: string;
};

export const linkTypes: LinkType[] = [
  {
    value: "github",
    label: "GitHub",
    urlPattern: "https://github\\.com/.+",
    exampleUrl: "https://github.com/<username>",
  },
  {
    value: "youtube",
    label: "YouTube",
    urlPattern: "https://www.youtube.com/@.+",
    exampleUrl: "https://www.youtube.com/@<username>",
  },
];

export const isPlatform = (value: string): value is Platform => {
  return platforms.includes(value as Platform);
};
