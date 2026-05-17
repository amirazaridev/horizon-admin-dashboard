import { NavLink } from "react-router";

function SidebarItem({ children, icon: Icon, expanded, path }) {
  return (
    <NavLink
      to={path}
      className={`hover:bg-nav-hover text-pri-text hover:text-textnav-hover group flex w-full items-center ${expanded ? "justify-start gap-x-3" : "justify-center"} h-13 gap-4 rounded-lg px-4 py-2 text-gray-700 transition`}
    >
      <span className="icon-elem text-secondary-icon group-hover:text-primary-icon! shrink-0 hover:text-inherit">
        <Icon className="size-7" />
      </span>

      <span
        className={`text-lg font-medium transition-opacity duration-300 ${expanded ? "translate-x-0 opacity-100" : "pointer-events-none hidden -translate-x-4 opacity-0"} `}
      >
        {children}
      </span>
    </NavLink>
  );
}

export default SidebarItem;
