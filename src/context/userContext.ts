import { User } from "models/User";
import { createContext } from "react";

interface UserContextProps {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);
