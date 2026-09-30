# Design

## Theme

Papel editorial cálido con filetes de 1px y grano sutil (`body::after`). Sin
cajas ni sombras. La base es compartida y cada capítulo puede activar un tema
propio con `theme` en `src/data.js`, que añade la clase `.month--<tema>` al
artículo y `.lightbox--<tema>` al lightbox.

## Palette

Tokens en `src/styles.css`:

- `--paper #f7f5f0`, `--paper-2 #fbfaf7`, `--paper-3 #f1ede5`
- `--ink #26221e`, `--ink-2 #4a443c`, `--ink-3 #6b6459`, `--ink-4 #918a7d`
- `--line #e4dfd5`, `--line-2 #d3ccbe`, `--line-ink #33526f`
- `--accent #c2d2de`, `--accent-ink #33526f`, `--accent-deep #27405a`
- `--sage #c7d3be`, `--sage-ink #3f5340`

Tema `sting` (mes 1 · Still Loving You · Love at First Sting): monocromo duro.
Negro `#111`, filetes de 2px, fotos en B&W (`grayscale(1) contrast(1.12)`),
título en display itálica mayúscula evocando el logo del álbum.

## Typography

- Display: "Open Sauce Sans" 800, uppercase, tracking -0.02em.
- Serif: "Instrument Serif" para título de capítulo, cita y cuerpo de carta.
- Body: Open Sauce Sans 17px / 1.7, measure 66ch.
- Mono del sistema para metadatos (`--fs-micro`, uppercase, tracking .09em).
- `.masthead__song`: crédito de la canción en mono uppercase.

## Components

- `SiteHeader` sticky: marca + readout + rail de chips con roving tabindex.
- `Hero` a dos columnas con `LiveCounter`; `NextUp` + `Countdown`; `Legend`
  fija; `ChapterIndex` de filas.
- `MonthView`: `MonthMasthead` (número + título + fecha + canción), `Letter`
  con clamp a 7 líneas, `Gallery` 3→1 columnas, nav de capítulo.
- `Lightbox`: scrim, navegación circular, focus trap.
- Estados bloqueados: por fecha (cuenta atrás) o manual `locked: true` ("?",
  inerte, sin navegación).

## Layout

`.wrap` 1120px (1200px ≥1440px), gutter fluido, ritmo de 8px (`--sp-1`…`--sp-11`),
responsive a <1023px y <767px.
