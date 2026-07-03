import { useThemeToggle } from "../context/ThemeContext";

function ThemeToggle() {
  const { handleDarkMode, isDarkMode } = useThemeToggle();

  return (
    <button
      onClick={handleDarkMode}
      type="button"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="border-border bg-surface text-text-muted hover:border-border-strong hover:text-color-text grid size-10.5 shrink-0 cursor-pointer place-items-center rounded-xl border transition-all duration-200"
    >
      {isDarkMode ? (
        /* Sun — click to go light */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
        </svg>
      ) : (
        /* Moon — click to go dark */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;
