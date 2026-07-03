import Logout from "../feature/authentication/Logout";

/**
 * Minimal header menu — renders the Logout action.
 * ThemeToggle and LanguageSwitcher now live directly in Header.jsx.
 */
function HeaderMenu() {
  return (
    <div className="flex items-center gap-2">
      <Logout />
    </div>
  );
}

export default HeaderMenu;
