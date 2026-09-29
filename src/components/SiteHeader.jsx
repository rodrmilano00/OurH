import { useEffect, useRef } from "react";
import { pad, shortDate } from "../utils/dates.js";
import { LOCALE } from "../model.js";
import { HeartMark, IconArrowLeft, IconArrowRight } from "./icons.jsx";

export default function SiteHeader({
  view,
  active,
  months,
  together,
  daysLabel,
  reduceMotion,
  onSelectMonth,
}) {
  const headerRef = useRef(null);
  const railRef = useRef(null);

  /* La altura real de la cabecera se publica como --header-h */
  useEffect(() => {
    const header = headerRef.current;
    if (!header || !window.ResizeObserver) return;
    const ro = new ResizeObserver((entries) => {
      const h = Math.round(entries[0].contentRect.height);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    });
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  /* El chip activo queda siempre visible dentro del rail */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const chip =
      view === "home"
        ? rail.querySelector("#chip-home")
        : rail.querySelector(`[data-index="${active}"]`);
    chip?.scrollIntoView?.({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [view, active, reduceMotion]);

  function goHome() {
    if (window.location.hash === "#inicio") {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      return;
    }
    window.location.hash = "#inicio";
  }

  /* Roving tabindex: ← → Inicio Fin recorren los chips */
  function onRailKeyDown(event) {
    const key = event.key;
    const isArrow = key === "ArrowRight" || key === "ArrowLeft";
    if (!isArrow && key !== "Home" && key !== "End") return;
    if (!months.length) return;
    event.preventDefault();

    const from = view === "month" ? active : -1;
    const to =
      key === "Home"
        ? -1
        : key === "End"
          ? months.length - 1
          : Math.max(
              -1,
              Math.min(months.length - 1, from + (key === "ArrowRight" ? 1 : -1))
            );

    const rail = railRef.current;
    const chip =
      to < 0
        ? rail?.querySelector("#chip-home")
        : rail?.querySelector(`[data-index="${to}"]`);

    if (to < 0) {
      if (window.location.hash !== "#inicio") window.location.hash = "#inicio";
    } else {
      onSelectMonth(to);
    }
    chip?.focus();
  }

  return (
    <header className="site" id="site-header" ref={headerRef}>
      <div className="site__inner">
        <div className="site__bar">
          <a className="brand" href="#inicio" id="brand-home">
            <HeartMark className="brand__mark" />
            <span className="brand__text">
              <span className="brand__name">Nuestra Historia</span>
            </span>
          </a>

          <p className="site__readout mono" id="site-readout">
            <span id="readout-months">{together}</span> meses ·{" "}
            <span id="readout-days">{daysLabel}</span> días
          </p>
        </div>

        <div className="site__rail">
          <button
            className="railnav"
            id="prev-month"
            type="button"
            aria-label="Mes anterior"
            disabled={!months.length || (view === "month" && active === 0)}
            onClick={() =>
              view === "month" ? onSelectMonth(active - 1) : onSelectMonth(0)
            }
          >
            <IconArrowLeft />
          </button>

          <div
            className="od-rail month-rail"
            id="month-rail"
            role="group"
            aria-label="Inicio y meses del scrapbook, usa las flechas del teclado"
            ref={railRef}
            onKeyDown={onRailKeyDown}
          >
            <button
              className="chip chip--home"
              type="button"
              id="chip-home"
              aria-label="Volver al inicio"
              aria-current={view === "home" ? "true" : "false"}
              tabIndex={0}
              onClick={goHome}
            >
              <span className="chip__label">Inicio</span>
            </button>

            {months.map((month, i) => {
              const isActive = view === "month" && i === active;
              return (
                <button
                  key={month.number}
                  className={"chip" + (month.unlocked ? "" : " chip--locked")}
                  type="button"
                  data-index={month.index}
                  aria-label={
                    `Mes ${month.number}` +
                    (month.unlocked
                      ? ", abierto"
                      : `, bloqueado hasta el ${month.dateLabel}`)
                  }
                  aria-current={isActive ? "true" : "false"}
                  tabIndex={isActive || (view === "home" && i === 0) ? 0 : -1}
                  onClick={() => onSelectMonth(month.index)}
                >
                  <span className="chip__num">{pad(month.number)}</span>
                  <span className="chip__label od-truncate">
                    {month.unlocked
                      ? month.title
                      : `se abre el ${shortDate(month.date, LOCALE)}`}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            className="railnav"
            id="next-month"
            type="button"
            aria-label="Mes siguiente"
            disabled={
              !months.length || (view === "month" && active === months.length - 1)
            }
            onClick={() =>
              view === "month"
                ? onSelectMonth(active + 1)
                : onSelectMonth(months.length - 1)
            }
          >
            <IconArrowRight />
          </button>
        </div>
      </div>
    </header>
  );
}
