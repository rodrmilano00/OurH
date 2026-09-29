import { pad } from "../utils/dates.js";
import Countdown from "./Countdown.jsx";

export default function NextUp({ next, now }) {
  return (
    <section className="nextup" id="nextup" aria-label="Próximo capítulo">
      {!next ? (
        <div className="nextup__row">
          <p className="nextup__label mono">Sin pendientes</p>
          <p className="nextup__lead">
            Ya están escritos todos los meses del archivo. Cuando añadas otro en{" "}
            <code>src/data.js</code> volverá a aparecer aquí su cuenta atrás.
          </p>
        </div>
      ) : (
        <div className="nextup__row">
          <div className="nextup__copy">
            <p className="nextup__label mono">Sigue bloqueado</p>
            <p className="nextup__lead">
              El mes {pad(next.number)} se abre solo el{" "}
              <span className="od-nowrap">{next.dateLabel}</span>. El candado
              desaparece por su cuenta el día de la fecha.
            </p>
          </div>
          <Countdown prefix="nextup" target={next.date} now={now} />
        </div>
      )}
    </section>
  );
}
