export default function SiteFooter({ startLabel }) {
  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <p className="foot__line">
          <span id="foot-date">
            Capítulo a capítulo, desde el {startLabel}.
          </span>
        </p>
        <p className="foot__hint">
          Hecho a mano, mes a mes, para que ningún recuerdo se quede sin sitio.
        </p>
      </div>
    </footer>
  );
}
