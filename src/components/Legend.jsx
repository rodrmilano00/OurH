import { pad } from "../utils/dates.js";

const LEGEND = [
  "Cada mes añadimos un disco al tocadiscos: una canción que nos marcó y una carta escrita para ti.",
  "Cada foto es una pista de ese mes: lo que pasó y lo que sentimos. Tócala y se abre.",
  "Los demás discos se van desbloqueando mes con mes: cuando llega su fecha, el candado desaparece solo.",
];

export default function Legend() {
  return (
    <section className="legend" aria-label="Cómo se lee este archivo">
      <ul className="legend__list">
        {LEGEND.map((text, i) => (
          <li className="legend__item" key={i}>
            <p className="legend__num mono" aria-hidden="true">
              {pad(i + 1)}
            </p>
            <p className="legend__text">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
