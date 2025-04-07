import { OpenAvatarModalContext } from "./../context/openAvatarModalContext";
import { useContext } from "react";

export const useOpenAvatarModal = () => {
  const context = useContext(OpenAvatarModalContext);

  if (!context) {
    throw new Error("useOpenAvatarModal must be used within an OpenAvatarModalProvider");
  }

  return context;
};
