import { FormEvent, useState } from "react";
import styles from "./Links.module.css";
import IllustrationEmpty from "@/assets/illustration-empty.svg?react";
import { useGetUserLinks } from "./hooks/useGetUserLinks";
import { UserLink } from "./data/userLinks.data";

export const Links = () => {
  const { userLinks, isPending } = useGetUserLinks();
  const [currentUserLinks, setCurrentUserLinks] = useState<UserLink[]>();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (isPending) {
    // @todo: add skeleton loader?
    return null;
  }

  return (
    <main className={styles.links}>
      <form onSubmit={onSubmit}>
        <div className={styles["links-container"]}>
          <h1>Customize your links</h1>
          <p>Add/edit/remove links below and then share all your profiles with the world!</p>
          <button type="button" className={styles["add-new-link"]} data-secondary>
            + Add new link
          </button>
          <ul>
            {userLinks && userLinks.length === 0 && (
              <li className={styles["empty-state"]}>
                <IllustrationEmpty />
                <h2>Let's get you started</h2>
                <p>
                  Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share
                  your profiles with everyone
                </p>
              </li>
            )}
          </ul>
        </div>
        <div className={styles["save-container"]}>
          <button type="submit">Save</button>
        </div>
      </form>
    </main>
  );
};
