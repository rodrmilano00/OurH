import { pad } from "../utils/dates.js";
import Countdown from "./Countdown.jsx";

export default function NextUp({ next, pendingManual, now }) {
  return (
    <section className="nextup" id="nextup" aria-label="Próximo disco">
      {next ? (
        <div className="nextup__row">
          <div className="nextup__copy">
            <p className="nextup__label mono">El siguiente disco</p>
            <p className="nextup__lead">
              El disco {pad(next.number)} llega al plato el{" "}
              <span className="od-nowrap">{next.dateLabel}</span>. Lo nuestro no
              se adelanta: suena cuando le toca.
            </p>
          </div>
          <Countdown prefix="nextup" target={next.date} now={now} />
        </div>
      ) : pendingManual > 0 ? (
        <div className="nextup__row">
          <p className="nextup__label mono">En camino</p>
          <p className="nextup__lead">
            Quedan {pendingManual}{" "}
            {pendingManual === 1 ? "disco" : "discos"} por abrir. Irán sonando
            solos cuando llegue su mes.
          </p>
        </div>
      ) : (
        <div className="nextup__row">
          <p className="nextup__label mono">Todo al día</p>
          <p className="nextup__lead">
            La colección está al día. Cuando llegue el siguiente disco, su
            cuenta atrás volverá a aparecer aquí.
          </p>
        </div>
      )}
    </section>
  );
}
