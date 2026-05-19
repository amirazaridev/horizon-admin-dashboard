function ButtonIcon({ children, onClick,disable }) {
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
