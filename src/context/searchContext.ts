import { createContext } from "react";

interface SearchContextProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  debouncedValue: string;
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);
