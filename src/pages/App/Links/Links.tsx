import { FormEvent, use, useEffect, useId, useRef, useState } from "react";
import styles from "./Links.module.css";
import IllustrationEmpty from "@/assets/illustration-empty.svg?react";
import { useGetUserLinks } from "@/hooks/useGetUserLinks";
import { platforms, UserLink } from "@/data/userLinks.data";
import { Link, LinkRefType, UserLinkWithUniqueId } from "./component/Link/Link";
import { Button } from "@/components/Button/Button";
import { useSaveUserLinks } from "@/hooks/useSaveUserLinks";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMobileMockup } from "../AppLayout/hooks/useMobileMockup";
import { SnackbarContext } from "@/components/SnackbarContext/SnackbarContext";
import { SaveForm } from "@/components/SaveForm/SaveForm";
import { SaveBlocker } from "@/components/SaveBlocker/SaveBlocker";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import IconChangesSaved from "@/assets/icon-changes-saved.svg?react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { savePublicProfile } from "@/data/publicProfile.data";

let uniqueId = 0;

const Links = () => {
  const { user } = useAuthContext();
  const { userLinks, isPending } = useGetUserLinks(user?.id);
  const { userProfile } = useGetUserProfile(user?.id);
  const [currentUserLinks, setCurrentUserLinks] = useState<UserLinkWithUniqueId[]>([]);
  const [duplicatedLinkIds, setDuplicatedLinkIds] = useState<number[]>([]);
  const { mutate, isPending: isMutating, isSuccess: isMutationSuccess, isError: isMutationError } = useSaveUserLinks();
  const formRef = useRef<HTMLFormElement>(null);
  const lastLinkRef = useRef<LinkRefType>(null);
  const [dirty, setDirty] = useState(false);
  const { showSnackbar } = use(SnackbarContext);

  const headerId = useId();
  const descriptionId = useId();

  useMobileMockup({ showSkeleton: true, userLinks: currentUserLinks, userProfile });

  useEffect(() => {
    if (isMutationError) {
      showSnackbar({ message: "Failed to save changes", variant: "negative" });
    }
  }, [isMutationError, showSnackbar]);

  useEffect(() => {
    if (isMutationSuccess) {
      setDirty(false);
      if (user && !user?.isAnonymous) {
        savePublicProfile(user.id, { userProfile, userLinks: currentUserLinks });
      }
      showSnackbar({ message: "Your changes have been successfully saved!", variant: "positive", icon: <IconChangesSaved /> });
    }
  }, [currentUserLinks, isMutationSuccess, showSnackbar, user, userProfile]);

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

  const checkForDuplicates = (checking: UserLinkWithUniqueId[]) => {
    const urls = new Set<string>();
    const linkIds: number[] = [];
    checking.forEach((link) => {
      if (urls.has(link.url)) {
        linkIds.push(link.id);
      }
      urls.add(link.url);
    });

    setDuplicatedLinkIds(linkIds);
  };

  const onRemoveLink = (index: number) => () => {
    setDirty(true);
    setCurrentUserLinks((prev) => {
      const updatedUserLinks = [...prev];
      updatedUserLinks.splice(index, 1);
      checkForDuplicates(updatedUserLinks);
      return updatedUserLinks;
    });
  };

  const onChangeLink = (index: number) => (newLink: UserLink) => {
    setDirty(true);
    setCurrentUserLinks((prev) => {
      const updatedUserLinks = [...prev];
      updatedUserLinks[index] = { ...newLink, id: prev[index].id };
      checkForDuplicates(updatedUserLinks);
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
              invalidMessage={duplicatedLinkIds.includes(link.id) ? "Duplicate link" : undefined}
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
      <SaveForm
        header="Customize your links"
        description="Add/edit/remove links below and then share all your profiles with the world!"
        isSaveDisabled={isEmpty}
        isSaving={isMutating}
        onSubmit={onSubmit}
        ref={formRef}
        aria-labelledby={headerId}
        aria-describedby={descriptionId}
      >
        <div className={styles.links}>
          <Button type="button" variant="secondary" className={styles["add-new-link"]} onClick={onAddNewLink}>
            + Add new link
          </Button>
          {isEmpty ? renderEmptyState() : renderLinks()}
        </div>
      </SaveForm>
      <SaveBlocker dirty={dirty} />
    </>
  );
};

export default Links;
