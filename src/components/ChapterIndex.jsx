import { pad, shortDate } from "../utils/dates.js";
import { LOCALE } from "../model.js";
import { IconArrowRight, IconLock } from "./icons.jsx";

function ChapterRow({ month, current, onSelect }) {
  return (
    <li className="chapter-row">
      <button
        className={"chapter" + (month.unlocked ? "" : " chapter--locked")}
        type="button"
        data-index={month.index}
        aria-current={current ? "true" : "false"}
        onClick={() => onSelect(month.index)}
      >
        <span className="chapter__num od-nowrap">{pad(month.number)}</span>
        <span className="chapter__meta">
          <span className="chapter__title od-truncate">
            {month.unlocked ? month.title : "Bloqueado"}
          </span>
          <span className="chapter__date od-truncate">
            {month.unlocked
              ? month.dateLabel
              : `se abre el ${shortDate(month.date, LOCALE)}`}
          </span>
        </span>
        <span className="chapter__mark" aria-hidden="true">
          {month.unlocked ? <IconArrowRight /> : <IconLock />}
        </span>
      </button>
    </li>
  );
}

export default function ChapterIndex({ months, openCount, view, active, onSelect }) {
  return (
    <section className="index" aria-label="Índice de capítulos">
      <p className="index__note mono" id="index-note">
        {openCount} de {months.length} capítulos abiertos.
      </p>
      <ul className="index__grid" id="index-grid">
        {months.map((month) => (
          <ChapterRow
            key={month.number}
            month={month}
            current={view === "month" && month.index === active}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </section>
  );
}
