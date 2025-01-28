import { Themes } from "./../constants/themes";
import { ThemeContext } from "./../context/themeContext";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { useState } from "react";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Themes>((localStorage.getItem("theme") as Themes) ?? "light");

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.theme = "dark";
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.theme = "light";
    }
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
