import Logout from "../feature/authentication/Logout";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

function HeaderMenu() {
  return (
    <div className="ms-auto flex items-center gap-2">
      <LanguageSwitcher />

      <ThemeToggle />

      <UserAvatar />
      <Logout />
    </div>
  );
}

export default HeaderMenu;
