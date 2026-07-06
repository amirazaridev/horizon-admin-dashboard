import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fa from "./locales/fa.json";
import en from "./locales/en.json";

export const SUPPORTED_LANGUAGES = ["fa", "en"];
export const DEFAULT_LANGUAGE = "fa";

export function applyDocumentLanguage(lng) {
  const lang = SUPPORTED_LANGUAGES.includes(lng) ? lng : DEFAULT_LANGUAGE;
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
}


try {
  const stored = localStorage.getItem("lang") || DEFAULT_LANGUAGE;
  applyDocumentLanguage(stored);
} catch {
  applyDocumentLanguage(DEFAULT_LANGUAGE);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: fa },
      en: { translation: en },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "lang",
      caches: ["localStorage"],
    },
  });

i18n.on("languageChanged", applyDocumentLanguage);

export default i18n;
