import { useContext } from "react";

import { ConfirmDialogContext } from "context/confirmDialogContext";

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);

  if (!context) {
    throw new Error("useConfirmDialog must be used within an ConfirmDialogProvider");
  }

  return context;
};
