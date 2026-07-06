import { useTranslation } from "react-i18next";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";

import HeaderMenu from "./HeaderMenu";

export default function Header({onMenuClick}) {
  const { t } = useTranslation();

  return (
    <header className="glass-header sticky top-0 z-20 flex h-auto shrink-0 items-center gap-4 border-b border-border px-7 py-3.5">
      {/* "Just a mobile button to open/close the hamburger menu." */}
      <button
        onClick={onMenuClick}
        className="border-border text-text-muted hover:text-text grid size-10 shrink-0 place-items-center rounded-lg border transition lg:hidden"
        aria-label={t("header.openMenu")}
      >
        <FaBars className="size-4" />
      </button>
      {/* Global search */}
      <div className="md:flex flex-1 hidden max-w-120 items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-text-muted transition-all focus-within:border-primary focus-within:shadow-input">
        <HiOutlineMagnifyingGlass className="size-4.5 shrink-0" />
        <input
          type="text"
          placeholder={t("header.searchPlaceholder")}
          className="flex-1 border-0 bg-transparent text-text text-sm outline-none"
        />
        <kbd className="rounded-md border border-border bg-card-2 px-2 py-0.5 text-xs font-semibold text-text-faint">
          {t("header.searchShortcut")}
        </kbd>
      </div>

      {/* Actions */}
        <HeaderMenu />
    </header>
  );
}
