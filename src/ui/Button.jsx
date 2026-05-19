import { useNavigate } from "react-router";

function Button({
  children,
  onClick,
  type = "primary",
  typeBtn = "button",
  disabled,
  isLink = false,
}) {
  const navigate = useNavigate();

  const className = {
    primary: "bg-btn hover:bg-btn/85 rounded-md text-white",
    primaryF: "bg-btn hover:bg-btn/85 rounded-md text-white w-full!",
    cancel:
      "border border-gray-500/50 rounded-sm text-pri-text w-20 duration-500 py-1.5 hover:bg-gray-500 hover:text-white",
    danger: "bg-red-700 hover:bg-red-900 w-20 text-white rounded-sm",
  };

  if (isLink)
    return (
      <button
        type={typeBtn}
        className={`${className[type]} flex items-center justify-center gap-x-2 p-2`}
        onClick={() => navigate(-1)}
      >
        {children}
      </button>
    );
  return (
    <button
      type={typeBtn}
      className={`${className[type]} cursor-pointer p-2 transition-colors`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
