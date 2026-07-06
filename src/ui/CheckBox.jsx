function CheckBox({ children, disable, checked, onChange }) {
  return (
    <>
      <input
        disabled={disable}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="size-4 accent-primary"
      />
      <label>{children}</label>
    </>
  );
}

export default CheckBox;
