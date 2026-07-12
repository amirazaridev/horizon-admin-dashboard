import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import useOutsideClick from "../hooks/useOutsideClick";

const ModalContext = createContext();
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext value={{ open, close, openName }}>{children}</ModalContext>
  );
}
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}
function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  useEffect(() => {
    if (name === openName) document.body.classList.add("overflow-y-hidden");
    return () => document.body.classList.remove("overflow-y-hidden");
  });
  const isRtl = document.documentElement.dir === "rtl";

  if (name !== openName) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 h-screen w-full overflow-y-hidden bg-gray-500/10 backdrop-blur-sm transition-all duration-500">
      <section
        ref={ref}
        className="bg-card fixed top-1/2 left-1/2 h-120 min-w-80 -translate-1/2 overflow-y-scroll rounded-2xl shadow-md transition-all duration-500 sm:min-w-100 md:min-w-150"
      >
        <button
          className={`border-border bg-surface text-text-muted hover:border-border-strong hover:text-text grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl border transition-all duration-300 absolute z-55 top-5 ${isRtl ? "left-5" : "right-5"}`}
          onClick={close}
        >
          <IoClose className="size-5.5" />
        </button>
        {cloneElement(children, { onCloseModal: close })}
      </section>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
