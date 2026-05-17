import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <header className="bg-primary flex h-13 shrink-0 items-center justify-end pe-10 shadow-xs lg:pe-14">
      <HeaderMenu />
    </header>
  );
}

export default Header;
