import { useEffect, useState } from "react";
import { pad } from "../utils/dates.js";
import MonthMasthead from "./MonthMasthead.jsx";
import Letter from "./Letter.jsx";
import Gallery from "./Gallery.jsx";
import Countdown from "./Countdown.jsx";
import { IconArrowLeft, IconArrowRight } from "./icons.jsx";

export default function MonthView({
  hidden,
  months,
  active,
  now,
  fill,
  reduceMotion,
  onSelectMonth,
  onOpenPhoto,
}) {
  const [shown, setShown] = useState(active);
  const [shownUnlocked, setShownUnlocked] = useState(
    () => months[active]?.unlocked
  );
  const [swapping, setSwapping] = useState(false);

  /* Cambio de capítulo (o apertura del candado): fundido de 150 ms
     antes de pintar el contenido nuevo. */
  useEffect(() => {
    const unlocked = months[active]?.unlocked;
    if (shown === active && shownUnlocked === unlocked) return;
    if (reduceMotion) {
      setShown(active);
      setShownUnlocked(unlocked);
      return;
    }
    setSwapping(true);
    const t = setTimeout(() => {
      setShown(active);
      setShownUnlocked(unlocked);
      setSwapping(false);
    }, 150);
    return () => clearTimeout(t);
  }, [active, shown, shownUnlocked, months, reduceMotion]);

  const shownMonth = months[shown];
  const prev = shown > 0 ? months[shown - 1] : null;
  const next = shown < months.length - 1 ? months[shown + 1] : null;

  return (
    <section
      className="view month-view"
      id="view-month"
      aria-labelledby="card-title"
      hidden={hidden}
    >
      <div className="wrap">
        <article
          className={"month" + (swapping ? " is-out" : "")}
          id="month-card"
          data-month={shown}
        >
          {shownMonth &&
            (shownMonth.unlocked ? (
              <>
                <MonthMasthead month={shownMonth} />
                <div className="month__rule" aria-hidden="true"></div>
                <Letter
                  key={shownMonth.index}
                  text={fill(shownMonth.letter, shownMonth)}
                />
                <Gallery
                  month={shownMonth}
                  fill={fill}
                  onOpenPhoto={onOpenPhoto}
                />
                <footer className="chapter__foot">
                  <div className="chapter__nav">
                    <button
                      className="ghostbtn"
                      type="button"
                      id="card-prev"
                      disabled={!prev || !prev.unlocked}
                      onClick={() => prev && onSelectMonth(prev.index)}
                    >
                      <IconArrowLeft />
                      <span>
                        {prev ? `Mes ${pad(prev.number)}` : "Primer mes"}
                      </span>
                    </button>
                    <button
                      className="ghostbtn"
                      type="button"
                      id="card-next"
                      disabled={!next || !next.unlocked}
                      onClick={() => next && onSelectMonth(next.index)}
                    >
                      <span>
                        {next ? `Mes ${pad(next.number)}` : "Último mes"}
                      </span>
                      <IconArrowRight />
                    </button>
                  </div>
                </footer>
              </>
            ) : (
              <>
                <MonthMasthead month={shownMonth} locked />
                <div className="month__rule" aria-hidden="true"></div>
                <div className="locked">
                  {shownMonth.manualLock ? (
                    <div className="locked__cd">
                      <div className="cd">
                        <span className="cd__num">?</span>
                        <span className="cd__key">por escribir</span>
                      </div>
                    </div>
                  ) : (
                    <Countdown
                      prefix="locked"
                      target={shownMonth.date}
                      now={now}
                    />
                  )}
                  <a className="ghostbtn" href="#inicio">
                    <IconArrowLeft />
                    <span>Volver al inicio</span>
                  </a>
                </div>
              </>
            ))}
        </article>
      </div>
    </section>
  );
}
