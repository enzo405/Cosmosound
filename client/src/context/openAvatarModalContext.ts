import { createContext } from "react";

interface OpenAvatarModalContextProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export const OpenAvatarModalContext = createContext<OpenAvatarModalContextProps | undefined>(
  undefined,
);
