import { PartialArtist } from "./models/User";
import { createContext } from "react";
import { LikeType } from "./services/userService";

interface UserContextProps {
  loading: boolean;
  user: PartialArtist | undefined;
  setUser: React.Dispatch<React.SetStateAction<PartialArtist | undefined>>;
  toggleLike: (id: string, type: LikeType) => Promise<void>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);
