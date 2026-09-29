import { pad } from "../utils/dates.js";

const LEGEND = [
  "Cada mes empieza con una carta escrita para ti. Léela despacio: está pensada para ese momento, no para antes.",
  "Cada foto guarda su leyenda: lo que pasó y lo que sentimos. Púlsala y se abre grande, con su pie.",
  "Ningún capítulo se abre antes de tiempo. Cuando llega su fecha, el candado desaparece solo: lo bueno no se fuerza.",
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
