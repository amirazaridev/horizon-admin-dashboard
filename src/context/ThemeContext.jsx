import { Children, createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(true, "isDarkMode");

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleDarkMode = () => setIsDarkMode((isDark) => !isDark);

  return (
    <ThemeContext value={{ isDarkMode, handleDarkMode }}>
      {children}
    </ThemeContext>
  );
}
function useThemeToggle() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}
export { useThemeToggle, ThemeProvider };
