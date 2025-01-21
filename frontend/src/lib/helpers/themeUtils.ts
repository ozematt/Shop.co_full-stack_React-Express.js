export const getStoredTheme = (): string => {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      //return saved theme if exist
      return JSON.parse(savedTheme);
    }
    //if theme do not exist on local storage, check user settings and return prefer theme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  } catch (error) {
    //
    console.warn(
      "Error reading theme from localStorage. Returning default theme.",
      error,
    );
    return "light";
  }
};

export const saveTheme = (theme: string): void => {
  try {
    localStorage.setItem("theme", JSON.stringify(theme));
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  } catch (error) {
    console.error("Failed to save theme to localStorage.", error);
  }
};
