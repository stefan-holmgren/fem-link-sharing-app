import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./LinkForm.module.css";
import { User } from "@/components/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserLinks, UserLink } from "./utils/userLinks.utils";

const platforms = ["github", "youtube"] as const;

type Platform = (typeof platforms)[number];

type LinkType = {
  value: Platform;
  label: string;
  urlPattern: string;
  exampleUrl: string;
};

const linkTypes: LinkType[] = [
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

type LinkFormProps = {
  user: User;
};

const isPlatform = (value: string): value is Platform => {
  return platforms.includes(value as Platform);
};

export const LinkForm = ({ user }: LinkFormProps) => {
  const { data: userLinks } = useQuery({ queryKey: ["userlinks", user.id], queryFn: () => getUserLinks(user) });
  const [currentUserLinks, setCurrentUserLinks] = useState<UserLink[]>();
  const lastSelectRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (userLinks) {
      setCurrentUserLinks([...userLinks]);
    }
  }, [userLinks]);

  useEffect(() => {
    lastSelectRef.current?.focus();
  }, [currentUserLinks]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const onAddNewLink: MouseEventHandler<HTMLButtonElement> = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }

    setCurrentUserLinks((prev) => [...(prev ? prev : []), { url: "", platform: linkTypes[0].value }]);

    lastSelectRef.current?.focus();
  };

  const onPlatformChanged =
    (index: number): ChangeEventHandler<HTMLSelectElement> =>
    (e) => {
      setCurrentUserLinks((prev) => {
        if (isPlatform(e.target.value) && prev?.[index]) {
          prev[index].platform = e.target.value;
          return [...prev];
        }
        return prev;
      });
    };

  return (
    <form className={styles["link-form"]} onSubmit={onSubmit} ref={formRef}>
      <button type="button" onClick={onAddNewLink}>
        Add new
      </button>
      {!currentUserLinks ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {currentUserLinks.map((userLink, i) => {
            const currentLinkType = linkTypes.find((linkType) => linkType.value === userLink.platform);

            return (
              <li key={userLink.url}>
                <select aria-label="Platform" required ref={i === currentUserLinks.length - 1 ? lastSelectRef : undefined} onChange={onPlatformChanged(i)}>
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
                  placeholder={currentLinkType?.exampleUrl ?? ""}
                  pattern={currentLinkType?.urlPattern}
                  title={"Please check the URL"}
                ></input>
              </li>
            );
          })}
        </ul>
      )}
      <button type="submit">Save</button>
    </form>
  );
};
