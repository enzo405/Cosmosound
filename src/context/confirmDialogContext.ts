import { createContext } from "react";

export interface ConfirmDialogOptions {
  title: string;
  description: React.ReactNode | string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface ConfirmDialogContextValue {
  openDialog: (options: ConfirmDialogOptions) => void;
  closeDialog: () => void;
}

export const ConfirmDialogContext = createContext<ConfirmDialogContextValue | undefined>(undefined);
