import { NavLink } from "react-router";


function SidebarItem({ children, icon: Icon, collapsed, path, badge }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `group relative flex h-11 w-full items-center gap-3 rounded-[11px] px-3 text-[14.5px] font-medium transition-all duration-200 ${
          collapsed ? "justify-center" : "justify-start"
        } ${
          isActive
            ? "cursor-pointer"
            : "cursor-pointer text-text-muted hover:text-text"
        }`
      }
      style={({ isActive }) =>
        isActive
          ? { background: "var(--color-nav-active-bg)" }
          : undefined
      }
    >
      {({ isActive }) => (
        <>
          {/* active indicator bar — sits outside the item on the start edge */}
          {isActive && (
            <span className="absolute -start-3.5 top-1/2 h-5.5 w-1 -translate-y-1/2 rounded-e-full bg-primary" />
          )}

          {/* hover background layer (non-active only) */}
          {!isActive && (
            <span className="absolute inset-0 -z-10 rounded-[11px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:var(--color-nav-hover-bg)]" />
          )}

          <span
            className={`shrink-0 transition-colors ${
              isActive
                ? "text-nav-active-fg"
                : "text-text-muted group-hover:text-text"
            }`}
          >
            <Icon className="size-5.25" strokeWidth={1.9} />
          </span>

          {!collapsed && (
            <>
              <span
                className={`whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-nav-active-fg"
                    : "group-hover:text-text"
                }`}
              >
                {children}
              </span>
              {badge && (
                <span
                  className={`ms-auto rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    badge.tone === "green"
                      ? "bg-green text-white"
                      : "bg-primary text-white"
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
