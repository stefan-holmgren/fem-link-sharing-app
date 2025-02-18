import { FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./LinkForm.module.css";
import { User } from "@/components/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserLinks, updateUserLinks, UserLink } from "./utils/userLinks.utils";
import { UserLinkComponent } from "./components/UserLinkComponent";
import { linkTypes } from "./components/linkTypes.utils";

type LinkFormProps = {
  user: User;
};

export const LinkForm = ({ user }: LinkFormProps) => {
  const { data: userLinks } = useQuery({ queryKey: ["userlinks", user.id], queryFn: () => getUserLinks(user) });
  const [currentUserLinks, setCurrentUserLinks] = useState<UserLink[]>([]);
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

    const handleSaveLinks = async () => {
      try {
        await updateUserLinks(user, currentUserLinks);
        alert("Links saved successfully!");
      } catch (error) {
        console.error("Error saving links: ", error);
        alert("Failed to save links.");
      }
    };

    handleSaveLinks();
  };

  const onAddNewLink: MouseEventHandler<HTMLButtonElement> = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }

    setCurrentUserLinks((prev) => [...(prev ? prev : []), { url: "", platform: linkTypes[0].value }]);

    lastSelectRef.current?.focus();
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
      console.log("Prev", prev, index);
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
              <UserLinkComponent key={i} userLink={userLink} onChange={onLinkChange(i)} />
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
