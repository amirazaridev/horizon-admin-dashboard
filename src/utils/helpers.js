import { differenceInDays, formatDistance, parseISO } from "date-fns";
import i18n from "../i18n";
import { faIR } from "date-fns/locale";

// ---------------------------------------------------------------------------
// Locale helpers — switch output based on the active i18n language.
//   fa => Persian digits, Toman currency, date-fns fa-IR locale.
//   en => Latin digits, USD currency, date-fns default (en-US) locale.
// ---------------------------------------------------------------------------
const isFa = () => i18n.language?.startsWith("fa");

// Convert Western digits (0-9) in a string to Persian digits (۰-۹).
const toPersianDigits = (str) =>
  String(str).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// Locale-aware "x days ago / in x days". Drops the English string-surgery.
export const formatDistanceFromNow = (dateStr) => {
  const result = formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
    locale: isFa() ? faIR : undefined,
  });
  return isFa() ? toPersianDigits(result) : result;
};

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

// Generic locale-aware number formatter.
export const formatNumber = (value, options = {}) => {
  const formatted = new Intl.NumberFormat(isFa() ? "fa-IR" : "en-US", options).format(
    value,
  );
  return isFa() ? toPersianDigits(formatted) : formatted;
};

// Locale-aware currency. The backend stores a plain number; we only change
// how it is displayed (Toman + Persian digits in fa, USD in en).
export const formatCurrency = (value) => {
  if (isFa()) {
    const num = toPersianDigits(
      new Intl.NumberFormat("fa-IR").format(Math.round(value)),
    );
    return `${num} تومان`;
  }
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

// Locale-aware date formatting using date-fns patterns.
export const formatDate = (date, pattern = "EEE, MMM dd yyyy") => {
  const result = new Intl.DateTimeFormat(isFa() ? "fa-IR" : "en-US", {
    dateStyle: "medium",
  }).format(parseISO(date));
  return isFa() ? toPersianDigits(result) : result;
};

export const formatFaNum = (value) => {
  if(isFa())
    return toPersianDigits(`${value}`);
  return `${value}`;
}