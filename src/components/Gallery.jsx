import { useEffect, useRef } from "react";

export default function Gallery({ month, fill, onOpenPhoto }) {
  const count = month.photos.length;
  const gridRef = useRef(null);

  /* En táctil no hay hover: la foto se enciende solo cuando el usuario
     la tiene entera en pantalla (threshold 1), no al asomar */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !window.matchMedia("(hover: none)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle("photo--lit", entry.isIntersecting)
        );
      },
      { rootMargin: "-2% 0px -2% 0px", threshold: 1 }
    );

    grid.querySelectorAll(".photo").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [month.index]);

  return (
    <section className="gallery" aria-label="Fotos de este mes">
      <div className="gallery__grid" ref={gridRef}>
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
