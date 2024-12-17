import { SearchContext } from "context/searchContext";
import React, { PropsWithChildren } from "react";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export const SearchProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [search, setSearch] = useState<string>("");
  const [debouncedValue] = useDebounce(search, 1000);

  return (
    <SearchContext.Provider value={{ search, setSearch, debouncedValue }}>
      {children}
    </SearchContext.Provider>
  );
};
