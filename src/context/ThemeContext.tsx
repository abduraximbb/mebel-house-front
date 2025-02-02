import { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedMode = localStorage.getItem("theme");
      return savedMode ? JSON.parse(savedMode) : false;
    } catch (error) {
      console.error("Error reading theme from localStorage", error);
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", JSON.stringify(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error saving theme to localStorage", error);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
