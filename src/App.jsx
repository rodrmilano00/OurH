import { useCallback, useEffect, useMemo, useState } from "react";
import { DATA_OK, LOCALE, MONTHS, START, fill } from "./model.js";
import {
  longDate,
  monthsBetween,
  split,
  startOfDay,
} from "./utils/dates.js";
import { useNow } from "./hooks/useNow.js";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.js";
import SiteHeader from "./components/SiteHeader.jsx";
import HomeView from "./components/HomeView.jsx";
import MonthView from "./components/MonthView.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import Lightbox from "./components/Lightbox.jsx";

function parseRoute() {
  const match = /^#mes-(\d+)$/.exec(window.location.hash || "");
  if (!match) return null;
  const index = MONTHS.findIndex((m) => m.number === Number(match[1]));
  return index >= 0 ? index : null;
}

function Scrapbook() {
  const now = useNow(1000);
  const reduceMotion = usePrefersReducedMotion();

  const todayMs = startOfDay(new Date(now));
  const months = useMemo(
    () =>
      MONTHS.map((m) => ({
        ...m,
        unlocked: !m.manualLock && todayMs >= m.unlockAt,
      })),
    [todayMs]
  );
  const openMonths = months.filter((m) => m.unlocked);
  const nextLocked =
    months.find((m) => !m.unlocked && !m.manualLock) || null;
  const pendingManual = months.filter((m) => m.manualLock).length;

  const together = monthsBetween(START, new Date(now));
  const elapsed = split(now - START.getTime());
  const daysLabel = elapsed.days.toLocaleString(LOCALE);
  const startLabel = longDate(START, LOCALE);
  const fillText = useCallback(
    (text, month) => fill(text, month, together),
    [together]
  );

  /* ---------- navegación por hash: #inicio · #mes-N ---------- */

  const [view, setView] = useState("home");
  const [active, setActive] = useState(() => {
    const today = startOfDay(new Date());
    let last = 0;
    MONTHS.forEach((m, i) => {
      if (today >= m.unlockAt) last = i;
    });
    return last;
  });
  const [announce, setAnnounce] = useState("");
  const [box, setBox] = useState(null);

  const route = useCallback(
    (scroll) => {
      const index = parseRoute();
      if (index !== null) {
        const month = MONTHS[index];
        setView("month");
        setActive(index);
        setAnnounce(
          month.manualLock
            ? `Mes ${month.number}, pendiente de escribir`
            : startOfDay(new Date()) >= month.unlockAt
              ? `Mes ${month.number}: ${month.title}`
              : `Mes ${month.number}, bloqueado hasta el ${month.dateLabel}`
        );
      } else {
        setView("home");
        setAnnounce("Portada");
      }
      if (scroll) {
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    },
    [reduceMotion]
  );

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#inicio");
    }
    route(false);
    const onHashChange = () => route(true);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [route]);

  useEffect(() => {
    document.body.setAttribute("data-view", view);
  }, [view]);

  const activeTheme = view === "month" ? months[active]?.theme : null;
  useEffect(() => {
    if (activeTheme) {
      document.body.setAttribute("data-theme", activeTheme);
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [activeTheme]);

  const goMonth = useCallback((index) => {
    const target = MONTHS[Math.max(0, Math.min(MONTHS.length - 1, index))];
    if (
      !target ||
      target.manualLock ||
      startOfDay(new Date()) < target.unlockAt
    ) {
      return;
    }
    window.location.hash = `#mes-${target.number}`;
  }, []);

  /* ---------- lightbox ---------- */

  const openBox = useCallback((monthIndex, photoIndex, opener) => {
    const month = MONTHS[monthIndex];
    if (!month || !month.photos.length) return;
    if (month.manualLock || startOfDay(new Date()) < month.unlockAt) return;
    setBox({ monthIndex, photoIndex, opener });
  }, []);

  const closeBox = useCallback(() => setBox(null), []);

  const stepBox = useCallback((step) => {
    setBox((b) => {
      if (!b) return b;
      const photos = MONTHS[b.monthIndex]?.photos || [];
      if (photos.length < 2) return b;
      return {
        ...b,
        photoIndex: (b.photoIndex + step + photos.length) % photos.length,
      };
    });
  }, []);

  /* ---------- render ---------- */

  return (
    <>
      <a className="skip-link" href="#view-main">
        Saltar al contenido
      </a>

      <SiteHeader
        view={view}
        active={active}
        months={months}
        together={together}
        daysLabel={daysLabel}
        reduceMotion={reduceMotion}
        onSelectMonth={goMonth}
      />

      <p className="sr-only" role="status" id="announce">
        {announce}
      </p>

      <main id="view-main" tabIndex={-1}>
        <HomeView
          hidden={view !== "home"}
          months={months}
          startLabel={startLabel}
          together={together}
          elapsed={elapsed}
          openMonths={openMonths}
          nextLocked={nextLocked}
          pendingManual={pendingManual}
          now={now}
          view={view}
          active={active}
          onSelectMonth={goMonth}
        />
        <MonthView
          hidden={view !== "month"}
          months={months}
          active={active}
          now={now}
          fill={fillText}
          reduceMotion={reduceMotion}
          onSelectMonth={goMonth}
          onOpenPhoto={openBox}
        />
      </main>

      <SiteFooter startLabel={startLabel} />

      <Lightbox
        box={box}
        months={months}
        fill={fillText}
        reduceMotion={reduceMotion}
        onClose={closeBox}
        onStep={stepBox}
      />
    </>
  );
}

function DataError() {
  return (
    <main id="view-main">
      <div className="wrap">
        <p className="noscript">
          No se ha podido cargar el contenido. Vuelve a intentarlo en unos
          minutos.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return DATA_OK ? <Scrapbook /> : <DataError />;
}
