import { pad } from "../utils/dates.js";

const LEGEND = [
  "Cada mes abro con una carta escrita para ese mes. Se lee entera, sin prisa, y con la opción de desplegarla si se hace larga.",
  "La foto es el recuerdo y la leyenda es lo que ocurrió en ella. Al pulsarla se abre grande, con su pie de foto.",
  "Un mes no se puede abrir antes de tiempo. Cuando llega su fecha, el candado desaparece por su cuenta.",
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
