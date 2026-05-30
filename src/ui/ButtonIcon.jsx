import { NavLink } from "react-router";

function ButtonIcon({ children, onClick, disable, active = false }) {
  if (active)
    return (
      <NavLink
        to="/account"
        className="text-primary-icon cursor-pointer [&>svg]:size-5.5 header-item "
      >
        {children}
      </NavLink>
    );

  return (
    <button
      className="text-primary-icon cursor-pointer [&>svg]:size-5.5"
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
