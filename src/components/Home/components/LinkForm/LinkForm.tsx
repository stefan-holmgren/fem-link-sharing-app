import { FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./LinkForm.module.css";
import { User } from "@/components/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserLinks, UserLink } from "./utils/userLinks.utils";

type LinkType = {
  value: string;
  label: string;
};

const linkTypes: LinkType[] = [
  {
    value: "youtube",
    label: "YouTube",
  },
  {
    value: "github",
    label: "GitHub",
  },
];

type LinkFormProps = {
  user: User;
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

  const onAddNewLink: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!formRef.current?.reportValidity()) {
      return;
    }

    setCurrentUserLinks((prev) => [...(prev ? prev : []), { url: "", platform: "youtube" }]);

    lastSelectRef.current?.focus();
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
          {currentUserLinks.map((userLink, i) => (
            <li key={userLink.url}>
              <select aria-label="Platform" required ref={i === currentUserLinks.length - 1 ? lastSelectRef : undefined}>
                {linkTypes.map(({ value, label }) => (
                  <option value={value} selected={userLink.platform === value}>
                    {label}
                  </option>
                ))}
              </select>
              <input type="url" defaultValue={userLink.url} required></input>
            </li>
          ))}
        </ul>
      )}
      <button type="submit">Save</button>
    </form>
  );
};
