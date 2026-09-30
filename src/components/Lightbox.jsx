import { useEffect, useRef, useState } from "react";
import { pad } from "../utils/dates.js";
import { IconArrowLeft, IconArrowRight, IconClose } from "./icons.jsx";

const FOCUSABLE =
  "button:not([disabled]), a[href], input, [tabindex]:not([tabindex='-1'])";

export default function Lightbox({
  box,
  months,
  fill,
  reduceMotion,
  onClose,
  onStep,
}) {
  /* `current` retiene la foto durante el fundido de salida. */
  const [current, setCurrent] = useState(box);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const boxRef = useRef(box);
  boxRef.current = box;

  const isOpen = Boolean(box);

  useEffect(() => {
    if (box) setCurrent(box);
  }, [box]);

  useEffect(() => {
    if (isOpen) {
      openerRef.current = boxRef.current?.opener || null;
      document.documentElement.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => {
        setOpen(true);
        closeRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
    setOpen(false);
    document.documentElement.style.overflow = "";
    const finish = () => {
      setCurrent(null);
      const opener = openerRef.current;
      openerRef.current = null;
      if (opener && document.contains(opener)) opener.focus();
    };
    const t = setTimeout(finish, reduceMotion ? 0 : 140);
    return () => clearTimeout(t);
  }, [isOpen, reduceMotion]);

  if (!current) return null;
  const month = months[current.monthIndex];
  if (!month || !month.photos.length) return null;
  const photo = month.photos[current.photoIndex];
  const single = month.photos.length < 2;

  function onKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onStep(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onStep(1);
      return;
    }
    if (event.key === "Tab") {
      const focusables = rootRef.current?.querySelectorAll(FOCUSABLE);
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <div
      className={
        "lightbox" +
        (open ? " is-open" : "") +
        (month.theme ? ` lightbox--${month.theme}` : "")
      }
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      ref={rootRef}
      onKeyDown={onKeyDown}
    >
      <div className="lightbox__scrim" onClick={onClose}></div>
      <figure className="lightbox__figure">
        <img
          className="lightbox__img"
          id="lightbox-img"
          src={photo.src}
          alt={fill(photo.alt || "", month)}
          width="900"
          height="1200"
          decoding="async"
        />
        <figcaption className="lightbox__bar">
          <span className="lightbox__count mono" id="lightbox-count">
            Mes {pad(month.number)} · {current.photoIndex + 1} /{" "}
            {month.photos.length}
          </span>
          <span className="lightbox__caption" id="lightbox-caption">
            {fill(photo.caption || "", month)}
          </span>
        </figcaption>
      </figure>

      <button
        className="lightbox__nav lightbox__nav--prev"
        id="lightbox-prev"
        type="button"
        aria-label="Foto anterior"
        disabled={single}
        onClick={() => onStep(-1)}
      >
        <IconArrowLeft />
      </button>
      <button
        className="lightbox__nav lightbox__nav--next"
        id="lightbox-next"
        type="button"
        aria-label="Foto siguiente"
        disabled={single}
        onClick={() => onStep(1)}
      >
        <IconArrowRight />
      </button>
      <button
        className="lightbox__close"
        id="lightbox-close"
        type="button"
        aria-label="Cerrar galería"
        ref={closeRef}
        onClick={onClose}
      >
        <IconClose />
      </button>
    </div>
  );
}
