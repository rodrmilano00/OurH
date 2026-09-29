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
          Para añadir un mes, edita <code>src/data.js</code> y añade un objeto
          más al array <code>months</code>. No hace falta tocar nada más.
        </p>
      </div>
    </footer>
  );
}
