import styles from "./ConfirmDialog.module.css";
import { Ref, useImperativeHandle, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../Button/Button";

export type ConfirmDialogRef = {
  open: () => void;
};

type ConfirmDialogProps = {
  title: string;
  description?: string;
  onClose: (confirmed: boolean) => void;
  ref?: Ref<ConfirmDialogRef>;
};

export const ConfirmDialog = ({ title, description, onClose, ref }: ConfirmDialogProps) => {
  const [open, setOpen] = useState(false);
  const confirmedRef = useRef(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const closeDialog = (confirmed: boolean) => {
    confirmedRef.current = confirmed;
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        onClose(confirmedRef.current);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content} {...(description ? {} : { "aria-describedby": undefined })}>
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          {!!description && <Dialog.Description className={styles.description}>{description}</Dialog.Description>}
          <div className={styles["button-strip"]}>
            <Dialog.Close asChild>
              <Button onClick={() => closeDialog(false)}>No</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button onClick={() => closeDialog(true)}>Yes</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
