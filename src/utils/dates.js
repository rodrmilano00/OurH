export function pad(n) {
  return String(n).padStart(2, "0");
}

export function parseDate(iso) {
  const parts = String(iso).split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return new Date();
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function addMonths(date, count) {
  const d = new Date(date.getTime());
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + count);
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, last));
  return d;
}

export function monthsBetween(from, to) {
  let m =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) m -= 1;
  return Math.max(0, m);
}

export function longDate(date, locale) {
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function shortDate(date, locale) {
  return date.toLocaleDateString(locale, { day: "2-digit", month: "2-digit" });
}

export function split(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}
