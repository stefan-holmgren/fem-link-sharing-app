import { FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./LinkForm.module.css";
import { User } from "@/components/AuthContext/AuthContext";
import { UserLink } from "./utils/userLinks.utils";
import { UserLinkComponent, UserLinkComponentRef } from "./components/UserLinkComponent";
import { linkTypes } from "./components/linkTypes.utils";
import { useSaveUserLinks } from "./hooks/useSaveUserLinks";
import { useGetUserLinks } from "./hooks/useGetUserLinks";

type LinkFormProps = {
  user: User;
};

export const LinkForm = ({ user }: LinkFormProps) => {
  const { userLinks } = useGetUserLinks(user);
  const saveUserLinks = useSaveUserLinks();

  const [currentUserLinks, setCurrentUserLinks] = useState<UserLink[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const lastUserLinkRef = useRef<UserLinkComponentRef>(null);

  useEffect(() => {
    if (userLinks) {
      setCurrentUserLinks([...userLinks]);
    }
  }, [userLinks]);

  useEffect(() => {
    // if we've added a link, it's url is empty, so we can focus on that
    if (currentUserLinks.length && currentUserLinks[currentUserLinks.length - 1].url === "") {
      lastUserLinkRef.current?.focus();
    }
  }, [currentUserLinks]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    saveUserLinks.mutate({ user, links: currentUserLinks });
  };

  const onAddNewLink: MouseEventHandler<HTMLButtonElement> = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }
    setCurrentUserLinks((prev) => [...(prev ? prev : []), { url: "", platform: linkTypes[0].value }]);
  };

  const onLinkChange = (index: number) => (newLink: UserLink) => {
    setCurrentUserLinks((prev) => {
      if (prev?.[index]) {
        prev[index] = newLink;
        return [...prev];
      }
      return prev;
    });
  };

  const onLinkDelete = (index: number) => {
    setCurrentUserLinks((prev) => {
      const updatedUserLinks = [...prev];
      updatedUserLinks.splice(index, 1);
      return updatedUserLinks;
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
            <li key={i}>
              <UserLinkComponent userLink={userLink} onChange={onLinkChange(i)} ref={lastUserLinkRef} />
              <button type="button" onClick={() => onLinkDelete(i)}>
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      <button type="submit">Save</button>
    </form>
  );
};
