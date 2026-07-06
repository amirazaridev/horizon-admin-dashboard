import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HiOutlineCog,
  HiOutlineFolderOpen,
  HiOutlineOfficeBuilding,
  HiOutlineUsers,
} from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaBars, FaXmark } from "react-icons/fa6";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import useUser from "../feature/authentication/useUser";

export default function Sidebar({ mobileOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  // * Close Key Event (Escape)
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, onClose]);

  return (
    <>
      {/* Desktop aside */}
      <aside
        className={`border-border bg-surface sticky top-0 hidden h-screen shrink-0 flex-col border-e transition-all duration-300 ease-in-out lg:flex ${collapsed ? "w-21" : "w-71"}`}
      >
        <NavContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      {/* Backdrop for mobile aside*/}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile aside*/}
      <aside
        aria-hidden={!mobileOpen}
        {...(!mobileOpen ? { inert: true } : {})}
        className={`bg-surface fixed inset-y-0 start-0 z-50 flex h-screen w-64 flex-col transition-transform duration-300 lg:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        <NavContent
          collapsed={false}
          setCollapsed={onClose}
          isDrawer
          onNavigate={onClose}
        />
      </aside>
    </>
  );
}

function NavContent({ collapsed, setCollapsed, isDrawer, onNavigate }) {
  const { t } = useTranslation();
  const { user } = useUser();

  const mainNav = [
    { title: t("nav.dashboard"), icon: LuLayoutDashboard, path: "dashboard" },
    {
      title: t("nav.bookings"),
      icon: HiOutlineFolderOpen,
      path: "bookings",
      badge: { text: t("common.add"), tone: "green" },
    },
    {
      title: t("nav.cabins"),
      icon: HiOutlineOfficeBuilding,
      path: "cabins",
    },
  ];

  const mgmtNav = [
    { title: t("nav.users"), icon: HiOutlineUsers, path: "users" },
    { title: t("nav.settings"), icon: HiOutlineCog, path: "settings" },
  ];

  return (
    <>
      {/* Brand + collapse/close toggle */}
      <div
        className={`flex min-h-19 items-center gap-3 px-5 py-5 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {collapsed && <Logo collapsed />}
        {!collapsed && (
          <>
            <Logo />
            <button
              onClick={() => setCollapsed(true)}
              className="border-border text-text-muted hover:text-text grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg border transition"
              aria-label={isDrawer ? t("nav.closeMenu") : t("nav.collapse")}
            >
              <FaXmark className="size-4" />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto px-3.5 pb-2"
        onClick={(e) => {
          if (isDrawer && onNavigate && e.target.closest("a")) {
            onNavigate();
          }
        }}
      >
        {/* expand button when collapsed (just desktop) */}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="border-border text-text-muted hover:text-text mx-auto mb-3 grid size-11 w-full cursor-pointer place-items-center rounded-xl border transition"
            aria-label={t("nav.expand")}
          >
            <FaBars className="size-4" />
          </button>
        )}

        <NavSection title={collapsed ? null : t("nav.main")} />
        <ul className="space-y-0.5">
          {mainNav.map((item) => (
            <li key={item.path + item.title}>
              <SidebarItem
                icon={item.icon}
                path={item.path}
                collapsed={collapsed}
                badge={item.badge}
              >
                {item.title}
              </SidebarItem>
            </li>
          ))}
        </ul>

        <NavSection title={collapsed ? null : t("nav.management")} />
        <ul className="space-y-0.5">
          {mgmtNav.map((item) => (
            <li key={item.path + item.title}>
              <SidebarItem
                icon={item.icon}
                path={item.path}
                collapsed={collapsed}
              >
                {item.title}
              </SidebarItem>
            </li>
          ))}
        </ul>
      </nav>

      {/* User footer */}
      <div className="border-border flex items-center gap-3 border-t px-3.5 py-3">
        <div
          className="size-9 shrink-0 rounded-[10px]"
          style={{
            backgroundImage: "linear-gradient(135deg,#6366f1,#a78bfa)",
          }}
        />
        {!collapsed && (
          <div className="leading-tight">
            <b className="block text-[13.5px] font-bold">{user.name}</b>
            <small className="text-text-muted text-[11.5px]">
              {t(`users.${user.role}`)}
            </small>
          </div>
        )}
      </div>
    </>
  );
}

function NavSection({ title }) {
  if (!title) return <div className="h-3" />;
  return (
    <h3 className="text-text-faint px-3 pt-4 pb-2 text-[11px] font-bold tracking-[0.08em] uppercase">
      {title}
    </h3>
  );
}
