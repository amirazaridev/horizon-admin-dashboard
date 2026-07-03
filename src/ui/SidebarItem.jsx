import { NavLink } from "react-router";

/**
 * Modern sidebar nav item.
 * - Active state uses the brand-tinted gradient + an indicator bar on the start side.
 * - `badge` (optional) renders a pill at the end (e.g. unread counts).
 * - When `collapsed` the label/badge are hidden; only the icon shows (centered).
 * - Fully RTL-aware via logical properties (ps-/pe-) and `rtl:` variants.
 */
function SidebarItem({ children, icon: Icon, collapsed, path, badge }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `group relative flex h-11 w-full items-center gap-3 rounded-[11px] px-3 text-[14.5px] font-medium transition-all duration-200 ${
          collapsed ? "justify-center" : "justify-start"
        } ${
          isActive
            ? "text-color-btn"
            : "text-text-muted hover:bg-card-2 hover:text-text"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="bg-btn absolute -start-2 top-1/2 h-5.5 w-1 -translate-y-1/2 rounded-full" />
          )}
          <span
            className={`shrink-0 transition-colors ${
              isActive
                ? "text-color-btn"
                : "text-text-muted group-hover:text-text"
            }`}
          >
            <Icon className="size-5.25" strokeWidth={1.9} />
          </span>

          {!collapsed && (
            <>
              <span className="whitespace-nowrap">{children}</span>
              {badge && (
                <span
                  className={`ms-auto rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    badge.tone === "green"
                      ? "bg-green text-white"
                      : "bg-btn text-white"
                  }`}
                >
                  {badge.text}
                </span>
              )}
            </>
          )}
        </>
      )}
    </NavLink>
  );
}

export default SidebarItem;
