import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fa from "./locales/fa.json";
import en from "./locales/en.json";

export const SUPPORTED_LANGUAGES = ["fa", "en"];
export const DEFAULT_LANGUAGE = "fa";

/**
 * Apply <html lang> and <html dir> for the given language.
 * fa => RTL, en => LTR. Kept here so the document is correct on first paint
 * (called before init from a cached value) AND stays in sync on every change.
 */
export function applyDocumentLanguage(lng) {
  const lang = SUPPORTED_LANGUAGES.includes(lng) ? lng : DEFAULT_LANGUAGE;
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
}

// Set the document language immediately from whatever is already stored,
// so the very first paint has the correct direction & font (no flash).
//
// i18next-browser-languagedetector stores the language as a PLAIN string
// (e.g. "en") via localStorage.setItem("lang", "en"), NOT as JSON. Parsing
// that with JSON.parse throws SyntaxError, which previously fell through to
// the catch block and forced the document to the default (fa/rtl) even when
// the user had picked English — so English text rendered with dir="rtl".
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

// Keep <html lang/dir> in sync whenever the language changes.
i18n.on("languageChanged", applyDocumentLanguage);

export default i18n;
