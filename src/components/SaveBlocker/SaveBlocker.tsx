import { useBlocker } from "react-router-dom";
import { ConfirmDialog, ConfirmDialogRef } from "../ConfirmDialog/ConfirmDialog";
import { useEffect, useRef } from "react";

type SaveBlockerProps = {
  dirty: boolean;
};

export const SaveBlocker = ({ dirty }: SaveBlockerProps) => {
  const confirmDialogRef = useRef<ConfirmDialogRef>(null);
  const blocker = useBlocker((tx) => {
    if (tx.currentLocation.pathname === tx.nextLocation.pathname) {
      return false;
    }
    return dirty;
  });

  useEffect(() => {
    if (blocker.state === "blocked") {
      confirmDialogRef.current?.open();
    }
  }, [blocker.state]);

  return (
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
  );
};
