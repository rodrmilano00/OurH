import { GIFT } from "../model.js";
import Bouquet from "./Bouquet.jsx";
import { IconArrowLeft } from "./icons.jsx";

/* Pestaña especial fuera de la colección de discos.
   Se monta solo al abrirla, así el ramo florece en cada visita. */
export default function GiftView({ hidden }) {
  const blocks = String(GIFT.message || "")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <section
      className="view gift"
      id="view-gift"
      aria-labelledby="gift-title"
      hidden={hidden}
    >
      {!hidden && (
        <div className="wrap gift__grid">
          <figure className="gift__art">
            <Bouquet />
            <figcaption className="gift__label mono">
              Lilium &lsquo;Stargazer&rsquo; · Phalaenopsis
            </figcaption>
          </figure>

          <div className="gift__copy">
            {GIFT.kicker && (
              <p className="gift__kicker mono">{GIFT.kicker}</p>
            )}
            <h2 className="gift__title" id="gift-title">
              {GIFT.title}
            </h2>
            <div className="gift__message">
              {blocks.map((block, i) => (
                <p key={i}>{block}</p>
              ))}
            </div>
            {GIFT.signature && (
              <p className="gift__sign">{GIFT.signature}</p>
            )}
            <a className="ghostbtn gift__back" href="#inicio">
              <IconArrowLeft />
              <span>Volver al tocadiscos</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
