import { pad, split } from "../utils/dates.js";

/* Bloque de cuenta atrás compartido por NextUp (.nextup__cd)
   y LockedMonth (.locked__cd). */
export default function Countdown({ prefix, target, now }) {
  const t = split(target.getTime() - now);
  return (
    <div className={`${prefix}__cd`}>
      <div className="cd">
        <span className="cd__num">{pad(t.days)}</span>
        <span className="cd__key">días</span>
      </div>
      <div className="cd">
        <span className="cd__num">{pad(t.hours)}</span>
        <span className="cd__key">horas</span>
      </div>
      <div className="cd">
        <span className="cd__num">{pad(t.minutes)}</span>
        <span className="cd__key">min</span>
      </div>
      <div className="cd">
        <span className="cd__num">{pad(t.seconds)}</span>
        <span className="cd__key">seg</span>
      </div>
    </div>
  );
}
