import { FormEvent, use, useEffect, useRef, useState } from "react";
import styles from "./Links.module.css";
import IllustrationEmpty from "@/assets/illustration-empty.svg?react";
import { useGetUserLinks } from "./hooks/useGetUserLinks";
import { platforms, UserLink } from "./data/userLinks.data";
import { Link, LinkRefType, UserLinkWithUniqueId } from "./component/Link/Link";
import { Button } from "@/components/Button/Button";
import { useSaveUserLinks } from "./hooks/useSaveUserLinks";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMobileMockup } from "../AppLayout/hooks/useMobileMockup";
import { useBlocker } from "react-router-dom";
import { ConfirmDialog, ConfirmDialogRef } from "@/components/ConfirmDialog/ConfirmDialog";
import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";
import IconChangesSaved from "@/assets/icon-changes-saved.svg?react";
import { SaveForm } from "@/components/SaveForm/SaveForm";

let uniqueId = 0;

export const Links = () => {
  const { userLinks, isPending } = useGetUserLinks();
  const [currentUserLinks, setCurrentUserLinks] = useState<UserLinkWithUniqueId[]>([]);
  const { mutate, isPending: isMutating, isSuccess: isMutationSuccess, isError: isMutationError } = useSaveUserLinks();
  const formRef = useRef<HTMLFormElement>(null);
  const lastLinkRef = useRef<LinkRefType>(null);
  const confirmDialogRef = useRef<ConfirmDialogRef>(null);
  const [dirty, setDirty] = useState(false);
  const { showSnackbar } = use(SnackbarContext);

  useMobileMockup({ showSkeleton: true });

  const blocker = useBlocker((tx) => {
    if (tx.currentLocation.pathname === tx.nextLocation.pathname) {
      return false;
    }
    return dirty;
  });

  useEffect(() => {
    if (isMutationError) {
      showSnackbar({ message: "Failed to save changes", variant: "negative" });
    }
  }, [isMutationError, showSnackbar]);

  useEffect(() => {
    if (isMutationSuccess) {
      setDirty(false);
      showSnackbar({ message: "Your changes have been successfully saved!", variant: "positive", icon: <IconChangesSaved /> });
    }
  }, [isMutationSuccess, showSnackbar]);

  useEffect(() => {
    if (blocker.state === "blocked") {
      confirmDialogRef.current?.open();
    }
  }, [blocker.state]);

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
    setDirty(true);
    setCurrentUserLinks((prev) => [...prev, { url: "", platform: platforms[0], id: uniqueId++ }]);
  };

  const onRemoveLink = (index: number) => () => {
    setDirty(true);
    setCurrentUserLinks((prev) => {
      const updatedUserLinks = [...prev];
      updatedUserLinks.splice(index, 1);
      return updatedUserLinks;
    });
  };

  const onChangeLink = (index: number) => (newLink: UserLink) => {
    setDirty(true);
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

    setDirty(true);

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
    <>
      <SaveForm isSaveDisabled={isEmpty} isSaving={isMutating} onSubmit={onSubmit} ref={formRef}>
        <div className={styles.links}>
          <h1>Customize your links</h1>
          <p>Add/edit/remove links below and then share all your profiles with the world!</p>
          <Button type="button" variant="secondary" className={styles["add-new-link"]} onClick={onAddNewLink}>
            + Add new link
          </Button>
          {isEmpty ? renderEmptyState() : renderLinks()}
        </div>
      </SaveForm>
      <ConfirmDialog
        title="You have unsaved changes"
        description="Are you sure you want to leave this page? Your changes will be lost."
        ref={confirmDialogRef}
        onClose={(confirmed) => {
          if (confirmed) {
            blocker.proceed?.();
          }
          blocker.reset?.();
        }}
      />
    </>
  );
};
