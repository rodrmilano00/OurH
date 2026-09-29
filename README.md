# Our Scrapbook · Mes a Mes

Un scrapbook que crece mes a mes: un capítulo, una carta y una leyenda por
foto que se abre solo cuando llega su fecha. React 19 + Vite.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview  # sirve el build
npm run lint
```

## Añadir un mes

Edita `src/data.js` y añade un objeto más al array `months`:

```js
{
  number: 9,
  title: "Título del capítulo",
  place: "Lugar",
  letter: `Texto de la carta. Tokens disponibles: {n} {fecha} {meses}.`,
  photos: [{ src: "assets/photos/photo-09.jpg", alt: "…", caption: "…" }],
}
```

- `meta.startDate` (formato `AAAA-MM-DD`) controla el contador y los candados.
- Si un mes no lleva `date`, su fecha se calcula como `startDate + (number - 1)` meses.
- Las fotos viven en `public/assets/photos/`.
- Un capítulo bloqueado muestra cuenta atrás y se desbloquea solo al llegar su fecha.

## Estructura

- `src/App.jsx` — estado de la vista, routing por hash (`#inicio`, `#mes-N`), tick de 1 s.
- `src/model.js` — parseo de `data.js`, cálculo de fechas y candados, tokens.
- `src/components/` — SiteHeader, Hero, LiveCounter, NextUp, Countdown, Legend, ChapterIndex, MonthView, MonthMasthead, Letter, Gallery, Lightbox, SiteFooter.
- `reference/` — HTML original y fichas de diseño usadas para el port.
