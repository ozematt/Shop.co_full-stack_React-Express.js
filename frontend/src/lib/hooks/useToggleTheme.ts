import { useCallback, useEffect, useState } from "react";
import { getStoredTheme, saveTheme } from "../helpers";

const useToggleTheme = () => {
  const [theme, setTheme] = useState(getStoredTheme());

  useEffect(() => {
    if (theme === "dark") {
      handleThemeToggle("dark");
    }
  }, [theme]);

  const handleThemeToggle = useCallback((toggledTheme: string) => {
    setTheme(toggledTheme);
    saveTheme(toggledTheme);
  }, []);

  return { theme, setTheme, handleThemeToggle };
};

export default useToggleTheme;
