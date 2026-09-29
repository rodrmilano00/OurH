import { pad } from "../utils/dates.js";
import { LOCALE } from "../model.js";

export default function LiveCounter({ together, elapsed, startLabel }) {
  return (
    <div className="counter" aria-label="Tiempo juntos">
      <p className="counter__lead od-nowrap">
        <span className="counter__big" id="live-months">
          {together}
        </span>
        <span className="counter__unit">meses juntos</span>
      </p>
      <dl className="counter__tiles">
        <div className="od-stat counter__tile">
          <dt className="counter__value" id="live-days">
            {elapsed.days.toLocaleString(LOCALE)}
          </dt>
          <dd className="counter__key">días</dd>
        </div>
        <div className="od-stat counter__tile">
          <dt className="counter__value" id="live-hours">
            {pad(elapsed.hours)}
          </dt>
          <dd className="counter__key">horas</dd>
        </div>
        <div className="od-stat counter__tile">
          <dt className="counter__value" id="live-minutes">
            {pad(elapsed.minutes)}
          </dt>
          <dd className="counter__key">minutos</dd>
        </div>
        <div className="od-stat counter__tile">
          <dt className="counter__value" id="live-seconds">
            {pad(elapsed.seconds)}
          </dt>
          <dd className="counter__key">segundos</dd>
        </div>
      </dl>
      <p className="counter__foot mono" id="counter-foot">
        Contando desde el {startLabel}
      </p>
    </div>
  );
}
