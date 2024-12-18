import { OpenAvatarModalContext } from "context/openAvatarModalContext";
import React, { PropsWithChildren, useMemo } from "react";
import { useState } from "react";

export const OpenAvatarModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const value = useMemo(() => ({ isModalOpen, toggleModal, openModal, closeModal }), [isModalOpen]);

  return (
    <OpenAvatarModalContext.Provider value={value}>{children}</OpenAvatarModalContext.Provider>
  );
};
