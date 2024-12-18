import { Themes } from "constants/themes";
import { createContext } from "react";

interface ThemeContextProps {
  theme: Themes;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
