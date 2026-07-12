import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Form({ onSubmit, children }) {
  return (
    <form
      className="text-text relative flex min-w-90 flex-col pt-6 sm:min-w-130 md:min-w-180"
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
const BASE_CL_INPUT =
  "bg-surface border-border text-text placeholder:text-text-faint focus:bg-surface-2 w-full rounded-xl border py-3 ps-10 pe-3.5 text-base transition-all outline-none";
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
  autoComplete,
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
        className={`${BASE_CL_INPUT} ${hasError ? "focus:shadow-input-error border-red-600" : "focus:border-primary focus:shadow-input"} `}
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
  autoComplete,
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
        className={`${BASE_CL_INPUT} ${hasError ? "focus:shadow-input-error border-red-600" : "focus:border-primary focus:shadow-input"} pe-12`}
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
function InputNumber({
  text,
  disabled,
  defValue,
  placeholder,
  register = {},
  id,
  hasError,
}) {
  const isRtl = document.documentElement.dir === "rtl";

  return (
    <div className="relative">
      <input
        className={`${BASE_CL_INPUT} ${hasError ? "focus:shadow-input-error border-red-600" : "focus:border-primary focus:shadow-input"} ps-4.5! pe-15`}
        type="number"
        disabled={disabled}
        id={id}
        defaultValue={defValue}
        placeholder={placeholder}
        {...register}
      />
      <span
        className={`text-text-muted absolute top-1/2 -translate-1/2 ${isRtl ? "end-8" : "end-0"}`}
      >
        {text}
      </span>
    </div>
  );
}

function Row({
  htmlFor,
  label,
  error,
  children,
  className = "",
  forLogin = false,
}) {
  return (
    <div className={`flex w-full flex-col gap-y-2 ${className}`}>
      <label
        className={`${forLogin ? "font-semibold" : "text-sm font-semibold"}`}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
function TextArea({ id, register, disabled, hasError }) {
  return (
    <textarea
      className={`${BASE_CL_INPUT} ${hasError ? "focus:shadow-input-error border-red-600" : "focus:border-primary focus:shadow-input"}`}
      id={id}
      disabled={disabled}
      {...register}
    ></textarea>
  );
}

function Split({ children }) {
  return <div className="flex gap-x-3">{children}</div>;
}
function Header({ children, icon }) {
  return (
    <div className="mb-4 flex items-center gap-x-4 border-b border-gray-400/30 px-5 pb-5">
      {icon && (
        <span className="from-indigo to-blue rounded-2xl bg-linear-to-br p-3 font-bold text-white">
          {icon}
        </span>
      )}
      {children}
    </div>
  );
}
function Main({ children }) {
  return <div className="flex flex-col gap-y-4 px-9 py-3">{children}</div>;
}
function Footer({ children }) {
  return (
    <div className="bg-card-2 flex justify-end gap-x-3 border-t border-gray-400/30 px-5 py-8">
      {children}
    </div>
  );
}

Form.Split = Split;
Form.Header = Header;
Form.Main = Main;
Form.Footer = Footer;
// Form.InputText = InputText;
Form.Row = Row;
Form.CheckboxInp = CheckboxInp;
Form.TextArea = TextArea;
Form.InputTextWithIcon = InputTextWithIcon;
Form.InputPassWithIcon = InputPassWithIcon;
Form.InputNumber = InputNumber;
// Form.InputImg = InputImg;

export default Form;
