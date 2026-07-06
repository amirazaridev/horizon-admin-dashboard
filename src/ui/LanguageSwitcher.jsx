import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n";
import i18n from "../i18n";

export default function LanguageSwitcher() {
  const { i18n: i18nInstance } = useTranslation();
  const current = i18nInstance.language?.startsWith("fa") ? "fa" : "en";

  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const labels = { fa: "فارسی", en: "EN" };

  return (
    <div className="border-border bg-surface flex items-center gap-0.5 rounded-xl border p-1">
      {SUPPORTED_LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => handleChange(lng)}
          className={`cursor-pointer rounded-[9px] border-0 px-3.5 py-2 text-sm font-bold transition-all duration-200 ${
            current === lng
              ? "btn-gradient text-white shadow-[0_4px_12px_-4px_rgba(63,39,199,.6)]"
              : "bg-transparent text-text-muted hover:text-text"
          }`}
        >
          {labels[lng]}
        </button>
      ))}
    </div>
  );
}
