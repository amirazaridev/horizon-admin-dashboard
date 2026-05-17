import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
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
function Toggle({ id }) {
  const { openId, open, close, position } = useContext(MenuContext);
  useEffect(() => {
    const handleScroll = () => close();
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [close]);

  function handleClick(e) {
    // e.stopPropagation();
    // e.preventDefault();

    const rect = e.target.closest("button").getBoundingClientRect();
    position.current = {
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    };

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button className="cursor-pointer" onClick={handleClick}>
      <HiEllipsisVertical className="size-7" />
    </button>
  );
}
function List({ id, children }) {
  const { position, openId } = useContext(MenuContext);
  // const ref = useOutsideClick(close);

  if (openId !== id) return null;
  return createPortal(
    <ul
      className="bg-primary fixed flex min-w-22.5 flex-col rounded-sm shadow-sm md:min-w-32"
      style={{
        right: position.current.x + "px",
        top: position.current.y + "px",
      }}
    >
      {children}
    </ul>,
    document.body,
  );
}
function Button({ children, onClick, icon }) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li className="" onClick={handleClick}>
      <button className="hover:bg-secondary text-pri-text flex w-full items-center gap-2.5 px-2.5 py-2 text-left text-xs transition-all duration-200 sm:gap-4 sm:px-3.5 sm:text-base md:py-3 md:text-lg">
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Button = Button;
Menus.Toggle = Toggle;
Menus.List = List;
export default Menus;
