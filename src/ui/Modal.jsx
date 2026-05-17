import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
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

  if (name !== openName) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 h-screen w-full overflow-y-hidden bg-gray-500/10 backdrop-blur-sm transition-all duration-500">
      <section
        ref={ref}
        className="bg-primary fixed top-1/2 left-1/2 min-w-80 -translate-1/2 rounded-md px-3 shadow-md transition-all duration-500 sm:min-w-100 md:min-w-150"
      >
        <button
          className="text-pri-text absolute top-1 right-1 cursor-pointer border-none bg-none"
          onClick={close}
        >
          <HiXMark className="size-7 sm:size-10" />
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
