import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./Links.module.css";
import IllustrationEmpty from "@/assets/illustration-empty.svg?react";
import { useGetUserLinks } from "./hooks/useGetUserLinks";
import { platforms, UserLink } from "./data/userLinks.data";
import { Form } from "@/components/Form/Form";
import { Link } from "./component/Link/Link";
import { Button } from "@/components/Button/Button";

type UserLinkWithUniqueId = UserLink & { uniqueId: number };

let uniqueId = 0;

export const Links = () => {
  const { userLinks, isPending } = useGetUserLinks();
  const [currentUserLinks, setCurrentUserLinks] = useState<UserLinkWithUniqueId[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (userLinks) {
      setCurrentUserLinks(userLinks.map((userLink) => ({ ...userLink, uniqueId: uniqueId++ })));
    }
  }, [userLinks]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onAddNewLink = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }
    setCurrentUserLinks((prev) => [...prev, { url: "", platform: platforms[0], uniqueId: uniqueId++ }]);
  };

  const onRemoveLink = (index: number) => () => {
    setCurrentUserLinks((prev) => {
      const updatedUserLinks = [...prev];
      updatedUserLinks.splice(index, 1);
      return updatedUserLinks;
    });
  };

  const onChangeLink = (index: number) => (newLink: UserLink) => {
    setCurrentUserLinks((prev) => {
      const updatedUserLinks = [...prev];
      updatedUserLinks[index] = { ...newLink, uniqueId: prev[index].uniqueId };
      return updatedUserLinks;
    });
  };

  const renderEmptyState = () => (
    <li className={styles["empty-state"]}>
      <IllustrationEmpty />
      <h2>Let's get you started</h2>
      <p>
        Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your
        profiles with everyone
      </p>
    </li>
  );

  const renderLinks = () =>
    currentUserLinks.map((link, i) => (
      <li key={link.uniqueId}>
        <Link linkIndex={i} userLink={link} onRemove={onRemoveLink(i)} onChange={onChangeLink(i)} />
      </li>
    ));

  if (isPending || !currentUserLinks) {
    // @todo: add skeleton loader?
    return null;
  }

  return (
    <main className={styles.links}>
      <Form onSubmit={onSubmit} ref={formRef}>
        <div className={styles["links-container"]}>
          <h1>Customize your links</h1>
          <p>Add/edit/remove links below and then share all your profiles with the world!</p>
          <Button type="button" variant="secondary" className={styles["add-new-link"]} onClick={onAddNewLink}>
            + Add new link
          </Button>
          <ul>{currentUserLinks.length === 0 ? renderEmptyState() : renderLinks()}</ul>
        </div>
        <div className={styles["save-container"]}>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </main>
  );
};
