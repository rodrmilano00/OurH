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
- `locked: true` en un mes lo mantiene cerrado con "?" hasta que lo quites.
- Si un mes no lleva `date`, su fecha se calcula como `startDate + (number - 1)` meses.
- Las fotos viven en `public/assets/photos/`.
- Un capítulo bloqueado muestra cuenta atrás y se desbloquea solo al llegar su fecha.
- `theme: "nombre"` + `song: { title, artist, album, year }` tematizan el capítulo
  (clases `.month--<tema>`, `.month-view--<tema>`, `.lightbox--<tema>`) y
  habilitan el reproductor de la canción.

## Despliegue (GitHub Pages)

Hay un workflow en `.github/workflows/deploy.yml` que construye y publica
automáticamente en cada push a `main`. Para activarlo:

1. En GitHub: **Settings → Pages → Source → GitHub Actions**.
2. `git push` a `main` — la página queda en `https://rodrmilano00.github.io/OurH/`.

`vite.config.js` ya lleva `base: "/OurH/"`. Si renombras el repo, cambia ahí el
`base` para que las rutas sigan resolviendo.

**Audio empaquetado**: si el `song` de un mes lleva `src` (ej.
`src: 'audio/still-loving-you.mp3'` con el archivo en `public/audio/`), el
reproductor usa ese archivo y funciona también en la versión desplegada — sin
necesidad de Navidrome. Ten en cuenta que el repo es público: el audio queda
descargable por cualquiera.

**Navidrome en la versión desplegada**: para canciones sin `src` el streaming
solo funciona con un servidor Navidrome alcanzable públicamente por HTTPS.
Defínelo como secrets del repo (`Settings → Secrets and variables → Actions`):
`VITE_NAVIDROME_URL`, `VITE_NAVIDROME_USER`, `VITE_NAVIDROME_PASS`.

## Streaming con Navidrome

Los meses con `song` muestran un botón de reproducción que busca el tema en tu
servidor Navidrome (API Subsonic) y lo reproduce en streaming. Copia
`.env.example` a `.env.local` y rellena:

```bash
VITE_NAVIDROME_URL=http://localhost:4533
VITE_NAVIDROME_USER=usuario
VITE_NAVIDROME_PASS=contraseña
```

La contraseña viaja como `p=enc:hex` (Subsonic). Reinicia `npm run dev` tras
editar `.env.local`. Si falta alguna variable, el reproductor no se muestra.
El navegador exige un click para arrancar audio: no hay autoplay.

## Estructura

- `src/App.jsx` — estado de la vista, routing por hash (`#inicio`, `#mes-N`), tick de 1 s.
- `src/model.js` — parseo de `data.js`, cálculo de fechas y candados, tokens.
- `src/components/` — SiteHeader, Hero, LiveCounter, NextUp, Countdown, Legend, ChapterIndex, MonthView, MonthMasthead, SongPlayer, Letter, Gallery, Lightbox, SiteFooter.
- `src/navidrome.js` — cliente Subsonic (búsqueda + stream) del tema de cada mes.
- `reference/` — HTML original y fichas de diseño usadas para el port.
