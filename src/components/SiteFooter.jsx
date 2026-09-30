export default function SiteFooter({ startLabel }) {
  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <p className="foot__line">
          <span id="foot-date">
            Disco a disco, desde el {startLabel}.
          </span>
        </p>
        <p className="foot__hint">
          Una colección que se arma mes a mes, canción a canción.
        </p>
      </div>
    </footer>
  );
}
