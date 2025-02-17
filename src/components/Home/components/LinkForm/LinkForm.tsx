import { FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./LinkForm.module.css";
import { User } from "@/components/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserLinks, UserLink } from "./utils/userLinks.utils";
import { UserLinkComponent } from "./components/UserLinkComponent";
import { linkTypes, Platform } from "./components/linkTypes.utils";

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

  const onAddNewLink: MouseEventHandler<HTMLButtonElement> = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }

    setCurrentUserLinks((prev) => [...(prev ? prev : []), { url: "", platform: linkTypes[0].value }]);

    lastSelectRef.current?.focus();
  };

  const onPlatformChanged = (index: number) => (newPlatform: Platform) => {
    setCurrentUserLinks((prev) => {
      if (prev?.[index]) {
        prev[index].platform = newPlatform;
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
          {currentUserLinks.map((userLink, i) => (
            <UserLinkComponent
              key={i}
              userLink={userLink}
              ref={i === currentUserLinks.length - 1 ? lastSelectRef : undefined}
              onPlatformChanged={onPlatformChanged(i)}
            />
          ))}
        </ul>
      )}
      <button type="submit">Save</button>
    </form>
  );
};
