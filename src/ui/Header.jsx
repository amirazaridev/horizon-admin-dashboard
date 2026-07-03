import { useTranslation } from "react-i18next";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UserAvatar";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * Modern sticky glassmorphism header with:
 * - Search bar (decorative in Phase 1)
 * - Language switcher (FA / EN pill)
 * - Theme toggle
 * - Notifications & messages icon buttons
 * - Avatar
 */
export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="glass-header sticky top-0 z-20 flex h-auto shrink-0 items-center gap-4 border-b border-[var(--color-border)] px-7 py-3.5">
      {/* Global search */}
      <div className="flex flex-1 max-w-[480px] items-center gap-2.5 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-[var(--color-text-muted)] transition-all focus-within:border-[var(--color-btn)] focus-within:shadow-[0_0_0_4px_rgba(63,39,199,.14)]">
        <HiOutlineMagnifyingGlass className="size-[18px] shrink-0" />
        <input
          type="text"
          placeholder={t("header.searchPlaceholder")}
          className="flex-1 border-0 bg-transparent text-[var(--color-text)] text-sm outline-none"
        />
        <kbd className="rounded-md border border-[var(--color-border)] bg-[var(--color-card-2)] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-text-faint)]">
          {t("header.searchShortcut")}
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ms-auto">
        <LanguageSwitcher />

        <ThemeToggle />

        {/* Notifications */}
        <button className="icon-btn-modern relative grid size-[42px] cursor-pointer place-items-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition-all hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]">
          <HiOutlineBell className="size-[20px]" />
          <span className="absolute top-[9px] end-[9px] size-2 rounded-full bg-[var(--color-rose,#f43f5e)] border-2 border-[var(--color-surface)]" />
        </button>

        {/* Messages */}
        <button className="icon-btn-modern grid size-[42px] cursor-pointer place-items-center rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition-all hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]">
          <HiOutlineChatAlt className="size-[20px]" />
        </button>

        {/* Avatar */}
        <UserAvatar />

        {/* Logout (via HeaderMenu) */}
        <HeaderMenu />
      </div>
    </header>
  );
}
