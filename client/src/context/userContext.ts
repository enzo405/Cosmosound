import { PartialArtist } from "models/User";
import { createContext } from "react";

interface UserContextProps {
  loading: boolean;
  user: PartialArtist | undefined;
  setUser: React.Dispatch<React.SetStateAction<PartialArtist | undefined>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);
