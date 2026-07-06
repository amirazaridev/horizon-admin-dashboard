import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Form({ onSubmit, children, divide = true }) {
  return (
    <form
      className={`text-text flex min-w-90 flex-col ${divide ? "divide-y divide-gray-400/15" : ""} px-2 pt-2 pb-4 sm:min-w-130 md:min-w-180`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
function CheckboxInp({ id, disabled = false }) {
  return (
    <input
      className="accent-primary size-5"
      type="checkbox"
      id={id}
      disabled={disabled}
    />
  );
}
function InputText({
  type = "text",
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
      className={`focus:ring-primary/30 h-7 ${w_full ? "w-full" : "w-35"} rounded-lg border border-gray-500/50 p-1 outline-none focus:ring sm:w-55 md:h-8.5 md:w-70`}
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
function InputTextWithIcon({
  icon,
  type = "text",
  id,
  disabled,
  register = {},
  defValue,
  placeholder,
  onBlur,
  hasError,
  autoComplete
}) {
  const {
    i18n: { language },
  } = useTranslation();
  const current = language?.startsWith("fa") ? "fa" : "en";

  return (
    <div
      className={`[&>svg]:text-text-faint relative [&>svg]:pointer-events-none [&>svg]:absolute ${current === "en" ? "[&>svg]:start-5" : ""} [&>svg]:top-1/2 [&>svg]:size-6 [&>svg]:-translate-1/2`}
    >
      {icon}
      <input
        className={`bg-surface border-border text-text placeholder:text-text-faint ${hasError ? "focus:shadow-input-error border-red-600" : "focus:border-primary focus:shadow-input"} focus:bg-surface-2 w-full rounded-xl border py-3 ps-10 pe-3.5 text-base transition-all outline-none`}
        type={type}
        maxLength={150}
        disabled={disabled}
        id={id}
        defaultValue={defValue}
        placeholder={placeholder}
        onBlur={onBlur}
        autoComplete={autoComplete}
        {...register}
      />
    </div>
  );
}
function InputPassWithIcon({
  icon,
  disabled = false,
  id,
  defValue,
  placeholder,
  register = {},
  hasError,
  autoComplete
}) {
  const {
    i18n: { language },
  } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const current = language?.startsWith("fa") ? "fa" : "en";

  return (
    <div
      className={`[&>svg]:text-text-faint relative [&>svg]:pointer-events-none [&>svg]:absolute ${current === "en" ? "[&>svg]:start-5" : ""} [&>svg]:top-1/2 [&>svg]:size-6 [&>svg]:-translate-1/2`}
    >
      {icon}
      <input
        className={`bg-surface border-border text-text placeholder:text-text-faint ${hasError ? "focus:shadow-input-error border-red-600" : "focus:border-primary focus:shadow-input"} focus:bg-surface-2 w-full rounded-xl border py-3 ps-10 pe-3.5 text-base transition-all outline-none`}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        maxLength={150}
        id={id}
        defaultValue={defValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register}
      />
      <button
        type="button"
        className={`absolute top-1/2 -translate-1/2 [&>svg]:size-6 ${current === "fa" ? "end-6" : "end-0"}`}
        onClick={() => setShowPassword((sp) => !sp)}
        disabled={disabled}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
function Row({ htmlFor, label, error, children, className = "" }) {
  return (
    <div className={`flex w-full flex-col gap-y-2 ${className}`}>
      <label className="font-semibold" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
function TextArea({ id, register, disabled }) {
  return (
    <textarea
      className="focus:ring-primary/30 h-7 w-35 rounded-lg border border-gray-500/50 p-1 outline-none focus:ring sm:w-55 md:h-8.5 md:w-70"
      id={id}
      disabled={disabled}
      {...register}
    ></textarea>
  );
}
function InputImg({ id, register = {}, disabled }) {
  return (
    <input
      className="file:bg-primary file:hover:bg-primary/85 w-35 file:cursor-pointer file:rounded-md file:p-1.5 file:text-white file:transition-colors sm:w-55"
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
Form.CheckboxInp = CheckboxInp;
Form.TextArea = TextArea;
Form.InputTextWithIcon = InputTextWithIcon;
Form.InputPassWithIcon = InputPassWithIcon;
Form.InputImg = InputImg;
Form.Title = Title;

export default Form;
