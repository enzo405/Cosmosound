import ConfirmDialog from "./../components/template/ConfirmDialog";
import { ConfirmDialogContext, ConfirmDialogOptions } from "./../context/confirmDialogContext";
import { ReactNode, useState } from "react";

export const ConfirmDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogOptions, setDialogOptions] = useState<ConfirmDialogOptions | null>(null);

  const openDialog = (options: ConfirmDialogOptions) => {
    setDialogOptions(options);
  };

  const closeDialog = () => {
    setDialogOptions(null);
  };

  return (
    <ConfirmDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogOptions && (
        <ConfirmDialog
          title={dialogOptions.title}
          description={dialogOptions.description}
          onConfirm={() => {
            dialogOptions.onConfirm();
            closeDialog();
          }}
          onCancel={() => {
            dialogOptions.onCancel?.();
            closeDialog();
          }}
        />
      )}
    </ConfirmDialogContext.Provider>
  );
};
