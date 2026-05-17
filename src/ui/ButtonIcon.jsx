function ButtonIcon({ children, onClick }) {
  return (
    <button
      className="text-primary-icon cursor-pointer [&>svg]:size-5.5"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
