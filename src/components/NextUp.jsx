import { pad } from "../utils/dates.js";
import Countdown from "./Countdown.jsx";

export default function NextUp({ next, now }) {
  return (
    <section className="nextup" id="nextup" aria-label="Próximo capítulo">
      {!next ? (
        <div className="nextup__row">
          <p className="nextup__label mono">Todo al día</p>
          <p className="nextup__lead">
            No queda ningún capítulo por abrir. Cuando escribas el siguiente en{" "}
            <code>src/data.js</code>, su cuenta atrás volverá a aparecer aquí.
          </p>
        </div>
      ) : (
        <div className="nextup__row">
          <div className="nextup__copy">
            <p className="nextup__label mono">Lo próximo que viene</p>
            <p className="nextup__lead">
              El capítulo {pad(next.number)} se abre solo el{" "}
              <span className="od-nowrap">{next.dateLabel}</span>. Lo nuestro no
              se adelanta: llega cuando le toca.
            </p>
          </div>
          <Countdown prefix="nextup" target={next.date} now={now} />
        </div>
      )}
    </section>
  );
}
