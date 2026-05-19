function Form({ onSubmit, children, divide = true }) {
  return (
    <form
      className={`text-pri-text flex min-w-90 flex-col ${divide ? "divide-y divide-gray-400/15" : ""} px-2 pt-2 pb-4 sm:min-w-130 md:min-w-180`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
function InputText({
  type,
  id,
  disabled,
  register = {},
  defValue,
  placeholder,
  onBlur,
  w_full = false,
}) {
  return (
    <input
      className={`focus:ring-btn/30 h-7 ${w_full ? "w-full" : "w-35"} rounded-lg border border-gray-500/50 p-1 outline-none focus:ring sm:w-55 md:h-8.5 md:w-70`}
      type={type}
      id={id}
      disabled={disabled}
      defaultValue={defValue}
      onBlur={onBlur}
      placeholder={placeholder}
      {...register}
    />
  );
}
function Row({ htmlFor, label, error, children, className, hasError = true }) {
  return (
    <div
      className={`flex items-center gap-x-5 py-2 text-sm sm:gap-x-10 md:py-3.5 md:text-base ${className}`}
    >
      <label className="w-21 sm:w-40 md:w-50" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hasError && <p className="w-24 text-red-600 sm:w-35 md:w-41">{error}</p>}
    </div>
  );
}
function TextArea({ id, register, disabled }) {
  return (
    <textarea
      className="focus:ring-btn/30 h-7 w-35 rounded-lg border border-gray-500/50 p-1 outline-none focus:ring sm:w-55 md:h-8.5 md:w-70"
      id={id}
      disabled={disabled}
      {...register}
    ></textarea>
  );
}
function InputImg({ id, register = {}, disabled }) {
  return (
    <input
      className="file:bg-btn file:hover:bg-btn/85 w-35 file:cursor-pointer file:rounded-md file:p-1.5 file:text-white file:transition-colors sm:w-55"
      type="file"
      id={id}
      disabled={disabled}
      accept="image/*"
      {...register}
    />
  );
}
function Title({ children }) {
  return <h3 className="mb-4 border-none text-xl md:text-2xl">{children}</h3>;
}
Form.InputText = InputText;
Form.Row = Row;
Form.TextArea = TextArea;
Form.InputImg = InputImg;
Form.Title = Title;

export default Form;
