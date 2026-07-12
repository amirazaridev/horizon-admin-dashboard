import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlinePhoto, HiOutlineXMark } from "react-icons/hi2";

function ImageDropzone({
  id,
  register = {},
  disabled,
  hasError,
  defaultPreview,
}) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const dragCounter = useRef(0);
  const [preview, setPreview] = useState(defaultPreview || null);
  const [isDragging, setIsDragging] = useState(false);

  const { onChange: rhfOnChange, ref: rhfRef, ...restRegister } = register;

  function setPreviewFromFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
  }

  function handleInputChange(e) {
    setPreviewFromFile(e.target.files?.[0]);
    rhfOnChange?.(e);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    if (disabled) return;
    dragCounter.current += 1;
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (!file || !inputRef.current) return;

    const dt = new DataTransfer();
    dt.items.add(file);
    inputRef.current.files = dt.files;

    setPreviewFromFile(file);
    rhfOnChange?.({ target: inputRef.current });
  }

  function handleRemove(e) {
    e.stopPropagation();
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    rhfOnChange?.({ target: inputRef.current });
  }

  return (
    <div
      onClick={() => !disabled && inputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group relative flex  ${preview ? "h-80" : "h-40"} w-full cursor-pointer flex-col items-center justify-center gap-y-2 overflow-hidden rounded-xl border-2 border-dashed transition-all ${
        hasError
          ? "border-red-600"
          : isDragging
            ? "border-btn bg-surface-2 shadow-input"
            : "border-border bg-surface hover:border-border-strong"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <input
        ref={(el) => {
          inputRef.current = el;
          if (typeof rhfRef === "function") rhfRef(el);
        }}
        id={id}
        type="file"
        accept="image/*"
        disabled={disabled}
        onChange={handleInputChange}
        className="hidden"
        {...restRegister}
      />

      {preview ? (
        <>
          <img
            src={preview}
            alt={t("form.imagePreview")}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />
          <button
            type="button"
            onClick={handleRemove}
            aria-label={t("form.removeImage")}
            className="absolute end-2 top-2 grid size-7 place-items-center rounded-full bg-white/90 text-red-600 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-white"
          >
            <HiOutlineXMark className="size-4" />
          </button>
          <span className="text-black absolute start-2 end-2 bottom-2 truncate rounded-md bg-white/90 px-2 py-1 text-center text-xs opacity-0 transition-opacity group-hover:opacity-100">
            {t("form.changeImage")}
          </span>
        </>
      ) : (
        <>
          <div className="text-text-faint bg-surface-2 grid size-11 place-items-center rounded-full">
            <HiOutlinePhoto className="size-5" />
          </div>
          <p className="text-text text-sm font-medium">
            {t("form.dropImageHere")}
          </p>
          <p className="text-text-muted text-xs">{t("form.imageHint")}</p>
        </>
      )}
    </div>
  );
}

export default ImageDropzone;
