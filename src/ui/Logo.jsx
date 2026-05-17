import { useThemeToggle } from "../context/ThemeContext";

function Logo({ className }) {
  const { isDarkMode } = useThemeToggle();
  return (
    <img
      className={className}
      src={`public/${isDarkMode ? "logo-dark" : "logo-light"}.png`}
      alt="logo"
    />
  );
}

export default Logo;
