import SCRAPBOOK from "./data.js";
import {
  addMonths,
  longDate,
  parseDate,
  startOfDay,
} from "./utils/dates.js";

export const DATA_OK = Boolean(
  SCRAPBOOK && SCRAPBOOK.meta && Array.isArray(SCRAPBOOK.months)
);

export const META = SCRAPBOOK?.meta || {};
export const LOCALE = META.dateLocale || "es-ES";
export const START = parseDate(META.startDate);

export const MONTHS = (DATA_OK ? SCRAPBOOK.months : [])
  .filter((m) => m && typeof m === "object")
  .map((m, i) => {
    const number = Number(m.number) || i + 1;
    const date = m.date ? parseDate(m.date) : addMonths(START, number - 1);
    return {
      number,
      title: m.title || "Capítulo sin título",
      place: m.place || "",
      letter: m.letter || "",
      manualLock: Boolean(m.locked),
      photos: Array.isArray(m.photos) ? m.photos : [],
      date,
      dateLabel: longDate(date, LOCALE),
      unlockAt: startOfDay(date),
    };
  })
  .sort((a, b) => a.number - b.number)
  .map((m, i) => ({ ...m, index: i }));

/* Tokens dentro de cartas y leyendas: {n} {fecha} {meses} */
export function fill(text, month, monthsTogether) {
  return String(text ?? "")
    .replace(/\{n\}/g, String(month.number))
    .replace(/\{fecha\}/g, month.dateLabel)
    .replace(/\{meses\}/g, String(monthsTogether));
}
