import { useState } from "react";
import {
  HiDotsHorizontal,
  HiOutlineCog,
  HiOutlineFolderOpen,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineUsers,
} from "react-icons/hi";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { FaXmark } from "react-icons/fa6";
import Uploader from "../data/Uploader";

const navItems = [
  {
    title: "Home",
    icon: HiOutlineHome,
    path: "dashboard",
  },
  {
    title: "Bookings",
    icon: HiOutlineFolderOpen,
    path: "bookings",
  },
  {
    title: "Cabins",
    icon: HiOutlineOfficeBuilding,
    path: "cabins",
  },
  {
    title: "Users",
    icon: HiOutlineUsers,
    path: "users",
  },
  {
    title: "Settings",
    icon: HiOutlineCog,
    path: "settings",
  },
];
export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`bg-primary sticky top-0 h-screen shrink-0 border-gray-200 shadow-sm transition-all duration-500 ease-in-out ${expanded ? "w-48 sm:w-64" : "w-15 sm:w-22"} `}
    >
      {/* Header */}
      <div
        className={`mb-4 flex h-auto flex-col items-center gap-y-8 ${expanded ? "justify-between" : "justify-center"} p-4 py-6`}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="hover:text-nav-hover absolute top-1 cursor-pointer self-start text-gray-600"
        >
          {expanded ? (
            <FaXmark className="size-8" />
          ) : (
            <HiDotsHorizontal className="size-8 w-8 sm:size-10 sm:w-13" />
          )}
        </button>
        <Logo
          className={`cursor-pointer transition-all duration-400 ${expanded ? "h-32 w-38 opacity-100" : "mt-9 h-16 w-full"} `}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`mt-6 flex flex-col items-center space-y-1 ${expanded ? "px-6" : "px-2"}`}
      >
        {navItems.map((item) => (
          <SidebarItem
            key={crypto.randomUUID()}
            icon={item.icon}
            path={item.path}
            expanded={expanded}
          >
            {item.title}
          </SidebarItem>
        ))}
      </nav>
    </aside>
  );
}
