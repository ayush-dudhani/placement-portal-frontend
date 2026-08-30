import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeProviderContext = createContext({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem(storageKey) ||
      defaultTheme
  );
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    const root =
      window.document.documentElement;

    root.classList.remove(
      "light",
      "dark"
    );

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const nextTheme = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      root.classList.remove("light", "dark");
      root.classList.add(nextTheme);
      setResolvedTheme(nextTheme);
    };

    applyTheme();
    if (theme === "system") media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme) => {
      localStorage.setItem(
        storageKey,
        theme
      );

      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={value}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(
    ThemeProviderContext
  );

  if (!context) {
    throw new Error(
      "useTheme must be used within a ThemeProvider"
    );
  }

  return context;
}
