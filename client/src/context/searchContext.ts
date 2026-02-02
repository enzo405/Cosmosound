import { createContext } from "react";

interface SearchContextProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  debouncedValue: string;
  isSearchbarFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);
