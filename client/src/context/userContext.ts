import { UserDetails } from "models/User";
import { createContext } from "react";

interface UserContextProps {
  user: UserDetails | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | undefined>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);
