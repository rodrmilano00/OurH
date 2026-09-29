import { pad } from "../utils/dates.js";
import { IconLock } from "./icons.jsx";

export default function MonthMasthead({ month, locked }) {
  return (
    <header className="masthead">
      <p className="masthead__num od-nowrap">{pad(month.number)}</p>
      <div className="masthead__copy">
        <h2 className="masthead__title" id="card-title">
          {month.title}
        </h2>
        {locked ? (
          <p className="masthead__date">
            Abre el <span className="od-nowrap">{month.dateLabel}</span>. Hasta
            entonces no se ve ni la carta ni las fotos.
          </p>
        ) : (
          <p className="masthead__date">
            {month.dateLabel}
            {month.place && (
              <>
                {" "}
                <span className="masthead__sep" aria-hidden="true">
                  ·
                </span>{" "}
                <span>{month.place}</span>
              </>
            )}
          </p>
        )}
      </div>
      {locked && (
        <span className="masthead__mark" aria-hidden="true">
          <IconLock />
        </span>
      )}
    </header>
  );
}
