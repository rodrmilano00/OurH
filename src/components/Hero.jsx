import { META } from "../model.js";
import { IconArrowRight } from "./icons.jsx";
import LiveCounter from "./LiveCounter.jsx";

export default function Hero({
  startLabel,
  together,
  elapsed,
  openCount,
  pendingCount,
  lastOpen,
}) {
  const words = String(META.title || "Nuestra Historia").split(" ");
  const firstLine = words.length > 1 ? words.slice(0, -1).join(" ") : "";
  const lastLine = words[words.length - 1];

  return (
    <div className="hero">
      <div className="hero__copy">
        <h1 className="display" id="home-title">
          {firstLine && <span className="display__line">{firstLine}</span>}
          <span className="display__line display__line--accent">
            {lastLine}
          </span>
        </h1>
        <p className="hero__meta mono" id="hero-kicker">
          Girando desde el {startLabel}
        </p>

        <p className="legend-line">
          La música nos une, nos conecta con el presente y con el pasado. 
          Sería muy buena idea si hacemos nuestro propio tocadiscos, ¿no?
        </p>
        <p className="lede" id="hero-lede">
          {META.lede || ""}
        </p>

        <div className="hero__cta">
          {lastOpen && (
            <a className="cta" href={`#mes-${lastOpen.number}`} id="cta-last">
              <span>Poner el último disco</span>
              <IconArrowRight />
            </a>
          )}
          <p className="hero__note mono" id="hero-note">
            {openCount}{" "}
            {openCount === 1 ? "disco en la colección" : "discos en la colección"}
            {pendingCount > 0 ? ` · ${pendingCount} por llegar` : ""}
          </p>
        </div>
      </div>

      <LiveCounter
        together={together}
        elapsed={elapsed}
        startLabel={startLabel}
      />
    </div>
  );
}
