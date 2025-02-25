import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./Links.module.css";
import IllustrationEmpty from "@/assets/illustration-empty.svg?react";
import { useGetUserLinks } from "./hooks/useGetUserLinks";
import { platforms, UserLink } from "./data/userLinks.data";
import { Form } from "@/components/Form/Form";
import { Link, LinkRefType, UserLinkWithUniqueId } from "./component/Link/Link";
import { Button } from "@/components/Button/Button";
import { useSaveUserLinks } from "./hooks/useSaveUserLinks";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Mobile } from "./component/Mobile/Mobile";

let uniqueId = 0;

export const Links = () => {
  const { userLinks, isPending } = useGetUserLinks();
  const [currentUserLinks, setCurrentUserLinks] = useState<UserLinkWithUniqueId[]>([]);
  const { mutate, isPending: isMutating } = useSaveUserLinks();
  const formRef = useRef<HTMLFormElement>(null);
  const lastLinkRef = useRef<LinkRefType>(null);
  const asideRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aside = asideRef.current;
    const mobile = mobileRef.current;
    if (!aside || !mobile) {
      return;
    }

    const calculateScale = () => {
      const computedStyle = getComputedStyle(aside);
      const asideHeight = aside.clientHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
      const asideWidth = aside.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);

      const calculateScaleFactor = (containerSize: number, contentSize: number) => Math.min(1.0, Math.max(containerSize / contentSize, 0.5));

      const yScale = calculateScaleFactor(asideHeight, mobile.clientHeight);
      const xScale = calculateScaleFactor(asideWidth, mobile.clientWidth);
      const scale = Math.min(xScale, yScale);

      aside.style.setProperty("--scale-content", scale.toString());
    };

    const resizeObserver = new ResizeObserver(calculateScale);
    resizeObserver.observe(aside);

    calculateScale();
    return () => resizeObserver.disconnect();
  }, [isPending]);

  useEffect(() => {
    if (userLinks) {
      setCurrentUserLinks(userLinks.map((userLink) => ({ ...userLink, id: uniqueId++ })));
    }
  }, [userLinks]);

  useEffect(() => {
    if (lastLinkRef.current) {
      // if we've added a link, it's url is empty, so we can focus on that
      if (currentUserLinks[currentUserLinks.length - 1].url === "") {
        lastLinkRef.current.focus();
      }
    }
  }, [currentUserLinks]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isMutating) {
      return;
    }
    mutate({ links: currentUserLinks });
  };

  const onAddNewLink = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }
    setCurrentUserLinks((prev) => [...prev, { url: "", platform: platforms[0], id: uniqueId++ }]);
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
      updatedUserLinks[index] = { ...newLink, id: prev[index].id };
      return updatedUserLinks;
    });
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over?.id) {
      return;
    }

    setCurrentUserLinks((prev) => {
      const oldIndex = prev.findIndex((link) => link.id === active.id);
      const newIndex = prev.findIndex((link) => link.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const renderEmptyState = () => (
    <ul>
      <li className={styles["empty-state"]}>
        <div>
          <IllustrationEmpty />
          <h2>Let's get you started</h2>
          <p>
            Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your
            profiles with everyone
          </p>
        </div>
      </li>
    </ul>
  );

  const renderLinks = () => (
    <DndContext onDragEnd={onDragEnd}>
      <ul>
        <SortableContext items={currentUserLinks} strategy={verticalListSortingStrategy}>
          {currentUserLinks.map((link, i) => (
            <Link
              key={link.id}
              ref={i === currentUserLinks.length - 1 ? lastLinkRef : null}
              userLink={link}
              onRemove={onRemoveLink(i)}
              onChange={onChangeLink(i)}
            />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  );

  if (isPending || !currentUserLinks) {
    // @todo: add skeleton loader?
    return null;
  }

  const isEmpty = currentUserLinks.length === 0;

  return (
    <div className={styles.links}>
      <aside ref={asideRef}>
        <Mobile className={styles.mobile} ref={mobileRef} />
      </aside>
      <main>
        <Form onSubmit={onSubmit} ref={formRef}>
          <div className={styles["links-container"]}>
            <h1>Customize your links</h1>
            <p>Add/edit/remove links below and then share all your profiles with the world!</p>
            <Button type="button" variant="secondary" className={styles["add-new-link"]} onClick={onAddNewLink}>
              + Add new link
            </Button>
            {isEmpty ? renderEmptyState() : renderLinks()}
          </div>
          <div className={styles["save-container"]}>
            <Button type="submit" disabled={isEmpty}>
              {isMutating ? "..." : "Save"}
            </Button>
          </div>
        </Form>
      </main>
    </div>
  );
};
