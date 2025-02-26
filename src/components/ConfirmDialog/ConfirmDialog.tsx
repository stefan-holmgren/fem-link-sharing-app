import styles from "./ConfirmDialog.module.css";
import { Ref, useImperativeHandle, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../Button/Button";

export type ConfirmDialogRef = {
  open: () => void;
};

type ConfirmDialogProps = {
  onClose: (confirmed: boolean) => void;
  ref?: Ref<ConfirmDialogRef>;
};

export const ConfirmDialog = ({ onClose, ref }: ConfirmDialogProps) => {
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
        <Dialog.Content className={styles.content} aria-describedby={undefined}>
          <Dialog.Title className={styles.title}>Are you sure</Dialog.Title>
          <Dialog.Description className={styles.description}>Do you want to continue?</Dialog.Description>
          <Dialog.Description />
          <Dialog.Close asChild>
            <Button onClick={() => closeDialog(true)}>Yes</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button onClick={() => closeDialog(false)}>No</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
