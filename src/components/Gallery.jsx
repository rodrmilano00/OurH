export default function Gallery({ month, fill, onOpenPhoto }) {
  const count = month.photos.length;

  return (
    <section className="gallery" aria-label="Fotos de este mes">
      <div className="gallery__grid">
        {!count ? (
          <p className="gallery__empty">
            Este mes todavía no tiene fotos. Cuando lleguen, aparecerán aquí
            con su leyenda.
          </p>
        ) : (
          month.photos.map((photo, i) => {
            const caption = fill(photo.caption || `Foto ${i + 1}`, month);
            return (
              <figure className="photo" key={i}>
                <button
                  className="photo__btn"
                  type="button"
                  data-month={month.index}
                  data-photo={i}
                  aria-label={`Ampliar: ${caption}`}
                  onClick={(e) =>
                    onOpenPhoto(month.index, i, e.currentTarget)
                  }
                >
                  <img
                    className="photo__img"
                    src={photo.src}
                    alt={fill(photo.alt || "", month)}
                    width="900"
                    height="1200"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <figcaption className="photo__cap">{caption}</figcaption>
              </figure>
            );
          })
        )}
      </div>
      <p className="gallery__count mono">
        {count} {count === 1 ? "foto" : "fotos"}
      </p>
    </section>
  );
}
