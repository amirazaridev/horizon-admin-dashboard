import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UserAvatar";

function Header() {
  return (
    <header className="bg-primary flex gap-x-8 h-13 shrink-0 items-center justify-end pe-10 shadow-xs lg:pe-14">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
