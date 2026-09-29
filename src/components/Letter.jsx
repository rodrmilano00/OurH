import { Fragment, useLayoutEffect, useMemo, useRef, useState } from "react";
import { IconChevron } from "./icons.jsx";

/* Texto de autor: \n\n separa párrafos, \n corta línea. */
function toParagraphs(text) {
  return String(text)
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export default function Letter({ text }) {
  const bodyRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [needsClamp, setNeedsClamp] = useState(true);

  const blocks = useMemo(() => toParagraphs(text), [text]);

  /* Se monta ya con la pinza puesta; si la carta cabe, se quita. */
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (body && body.scrollHeight - body.clientHeight <= 4) {
      setNeedsClamp(false);
    }
  }, []);

  const clamped = needsClamp && !expanded;

  return (
    <section className="letter" aria-label="Carta de este mes">
      <span className="letter__mark" aria-hidden="true">
        &ldquo;
      </span>
      <div
        className={"letter__body" + (clamped ? " is-clamped" : "")}
        id="letter-body"
        ref={bodyRef}
      >
        {blocks.map((block, i) => (
          <p key={i}>
            {block.split("\n").map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
        ))}
      </div>
      <button
        className="letter__more"
        id="letter-more"
        type="button"
        aria-expanded={expanded ? "true" : "false"}
        aria-controls="letter-body"
        hidden={!needsClamp}
        onClick={() => setExpanded((v) => !v)}
      >
        <span>{expanded ? "Cerrar la carta" : "Leer la carta completa"}</span>
        <IconChevron />
      </button>
    </section>
  );
}
