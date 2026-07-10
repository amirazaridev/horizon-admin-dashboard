import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const position = useRef(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenuContext value={{ openId, position, close, open }}>
      {children}
    </MenuContext>
  );
}

function Toggle({ id, icon, justBottom = false }) {
  const { openId, open, close, position } = useContext(MenuContext);

  useEffect(() => {
    const handleScroll = () => close();
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, [close]);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    const isRtl = document.documentElement.dir === "rtl";

    position.current = isRtl
      ? {
          side: justBottom
            ? window.innerWidth - rect.right -120
            : window.innerWidth - rect.right - rect.right / 1,
          top: rect.bottom + 8,
        }
      : {
          side: rect.left - 100,
          top: rect.bottom + 8,
        };

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      className="text-text-muted hover:text-primary hover:bg-primary/2 flex cursor-pointer items-center rounded-lg p-1.5 transition-colors duration-150"
      onClick={handleClick}
    >
      {icon || <HiEllipsisHorizontal className="size-5 text-white hover:text-white/50" />}
    </button>
  );
}

function List({ id, children }) {
  const { position, openId, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, true);

  if (openId !== id) return null;

  const isRtl = document.documentElement.dir === "rtl";

  const style = isRtl
    ? { right: position.current.side + "px", top: position.current.top + "px" }
    : { left: position.current.side + "px", top: position.current.top + "px" };

  return createPortal(
    <ul
      ref={ref}
      className="menu-dropdown bg-card border-border-strong shadow-shadow-soft fixed z-50 min-w-44 flex-col overflow-hidden rounded-xl border p-1 md:min-w-48"
      style={style}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, onClick, icon, danger }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className={`group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 ${
          danger
            ? "text-rose hover:bg-rose/8"
            : "text-text hover:bg-primary/8"
        }`}
      >
        {icon && (
          <span
            className={`flex size-5 items-center justify-center transition-colors duration-150 ${
              danger
                ? "text-rose/60 group-hover:text-rose"
                : "text-text-muted group-hover:text-primary"
            }`}
          >
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    </li>
  );
}

function Divider() {
  return <li className="bg-border-strong my-1 h-px" />;
}

Menus.Button = Button;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Divider = Divider;
export default Menus;
