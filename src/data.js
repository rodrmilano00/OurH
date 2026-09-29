/* =============================================================
   data.js — ÚNICO archivo que tocas cada mes.
   -------------------------------------------------------------
   Para añadir un mes nuevo: copia un objeto del array "months",
   sube el "number" (1, 2, 3...), escribe la carta y añade las fotos
   dentro de "photos". No hace falta tocar index.html, styles.css
   ni app.js: la cabecera, la home, la ficha y el índice se
   reconstruyen solos.

   TOKENS disponibles dentro de "letter" y de las leyendas:
     {n}      → número de mes        (ej.: 3)
     {fecha}  → fecha del capítulo   (ej.: 14 de mayo de 2026)
     {meses}  → meses juntos a hoy   (ej.: 5)
   ============================================================= */

const SCRAPBOOK = {
  meta: {
    title: 'Nuestra Historia',
    subtitle: 'Mes a mes',
    lede:
      'Un archivo que crece con nosotros: un capítulo, una carta y una leyenda por foto de cada mes que llevamos juntos.',

    // ↓↓↓  CAMBIA ESTA FECHA (AAAA-MM-DD). El contador y los candados se recalculan solos ↓↓↓
    startDate: '2026-04-14',

    // Si quieres una fecha exacta para un capítulo, déjala escrita: date: '2026-04-14'.
    // Si la borras, se calcula sola: startDate + (number - 1) meses.
    dateLocale: 'es-ES',
  },

  months: [
    {
      number: 1,
      title: 'El mes en que empezó todo',
      place: 'Primera cita',
      letter: `Ese día no tenía ninguna importancia en el calendario y, sin embargo, lo he repasado tantas veces que ya me sé de memoria hasta la lluvia del camino de vuelta.

Hablamos medio rato para no meter prisa y, cuando te despidiste en la puerta, tardé tres minutos en arrancar. Ese café no era el plan de nadie y acabó siendo el principio de esta página.

Aquí empieza el primer capítulo. Gracias por estar.`,
      photos: [
        {
          src: 'assets/photos/photo-01.svg',
          alt: 'Marcador de la primera foto del mes 1, pendiente de sustituir por vuestra imagen.',
          caption: 'La primera foto',
        },
        {
          src: 'assets/photos/photo-02.svg',
          alt: 'Marcador de la segunda foto del mes 1, pendiente de sustituir por vuestra imagen.',
          caption: 'Café y conversación',
        },
        {
          src: 'assets/photos/photo-03.svg',
          alt: 'Marcador de la tercera foto del mes 1, pendiente de sustituir por vuestra imagen.',
          caption: 'La vuelta a casa',
        },
        {
          src: 'assets/photos/photo-04.svg',
          alt: 'Marcador de la cuarta foto del mes 1, pendiente de sustituir por vuestra imagen.',
          caption: 'La despedida en la puerta',
        },
      ],
    },

    {
      number: 2,
      title: 'El mes en que dejó de ser raro',
      place: 'Rutina nueva',
      letter: `Este mes descubrimos que juntos se construye una rutina muy concreta: un café a la misma hora, un mensaje que no significa nada y que los dos releemos igual, y una serie que vemos a la vez.

Empezamos a decir "el mes que viene" sin que sonara a despedida. Y eso, para mí, fue la manera más bonita de decir que esto iba en serio.`,
      photos: [
        {
          src: 'assets/photos/photo-05.svg',
          alt: 'Marcador de la primera foto del mes 2, pendiente de sustituir por vuestra imagen.',
          caption: 'La misma hora, siempre',
        },
        {
          src: 'assets/photos/photo-06.svg',
          alt: 'Marcador de la segunda foto del mes 2, pendiente de sustituir por vuestra imagen.',
          caption: 'La mesa de siempre',
        },
        {
          src: 'assets/photos/photo-02.svg',
          alt: 'Marcador de la tercera foto del mes 2, pendiente de sustituir por vuestra imagen.',
          caption: 'Paseo sin destino',
        },
      ],
    },

    {
      number: 3,
      title: 'El mes de improvisar',
      place: 'Viaje corto',
      letter: `Nos alejamos un poco de casa, que fue exactamente lo que necesitábamos.

Volvimos con más fotos de las previstas y con la certeza de que podemos con cualquier plan improvisado. Este mes no tuvo nada especial y, por eso, me gustó más que ninguno.`,
      photos: [
        {
          src: 'assets/photos/photo-03.svg',
          alt: 'Marcador de la primera foto del mes 3, pendiente de sustituir por vuestra imagen.',
          caption: 'Puerto de salida',
        },
        {
          src: 'assets/photos/photo-06.svg',
          alt: 'Marcador de la segunda foto del mes 3, pendiente de sustituir por vuestra imagen.',
          caption: 'Comida improvisada',
        },
        {
          src: 'assets/photos/photo-01.svg',
          alt: 'Marcador de la tercera foto del mes 3, pendiente de sustituir por vuestra imagen.',
          caption: 'La vuelta, de noche',
        },
      ],
    },

    {
      number: 4,
      title: 'El mes que se nos fue de las manos',
      place: 'Casa',
      letter: `Se juntaron tres semanas de trabajo, la mudanza a medias y un cumpleaños que acabamos celebrando dos días tarde, en un bar, con la misma gente. No se rompió nada, pero estábamos demasiado ocupados para notar cómo se fue el mes.

La foto del final es del domingo en que por fin paramos. La elegí como cierre porque me hizo reírme de todo lo anterior.`,
      photos: [
        {
          src: 'assets/photos/photo-04.svg',
          alt: 'Marcador de la primera foto del mes 4, pendiente de sustituir por vuestra imagen.',
          caption: 'Cajas por todas partes',
        },
        {
          src: 'assets/photos/photo-05.svg',
          alt: 'Marcador de la segunda foto del mes 4, pendiente de sustituir por vuestra imagen.',
          caption: 'El cumpleaños, dos días tarde',
        },
      ],
    },

    {
      number: 5,
      title: 'El mes en que empezó a ser costumbre',
      place: 'Casa',
      letter: `Ya no contamos las cosas buenas porque han dejado de ser excepciones: el domingo sin móvil, los desayunos largos, la serie compartida.

Llevamos {meses} meses y este es el primero en el que no eché de menos nada de cómo era antes. No es que haya pasado algo grande: es que se ha ido aclimatando todo.`,
      photos: [
        {
          src: 'assets/photos/photo-06.svg',
          alt: 'Marcador de la primera foto del mes 5, pendiente de sustituir por vuestra imagen.',
          caption: 'El domingo sin móvil',
        },
        {
          src: 'assets/photos/photo-01.svg',
          alt: 'Marcador de la segunda foto del mes 5, pendiente de sustituir por vuestra imagen.',
          caption: 'Desayuno largo',
        },
        {
          src: 'assets/photos/photo-04.svg',
          alt: 'Marcador de la tercera foto del mes 5, pendiente de sustituir por vuestra imagen.',
          caption: 'La serie compartida',
        },
        {
          src: 'assets/photos/photo-02.svg',
          alt: 'Marcador de la cuarta foto del mes 5, pendiente de sustituir por vuestra imagen.',
          caption: 'Sin ninguna intención de salir',
        },
      ],
    },

    {
      number: 6,
      title: 'Medio año',
      place: 'El sitio de siempre',
      letter: `Seis meses. Es la primera vez que el número me para en seco al leerlo, porque hasta ahora me parecía una cifra de calendario y hoy ya es una distancia real.

He puesto la fecha a propósito: {fecha}. Quiero que dentro de un año aparezca aquí esta misma frase y me recuerde que este fue el mes en el que entendimos que esto ya no es una etapa.`,
      photos: [
        {
          src: 'assets/photos/photo-07.svg',
          alt: 'Marcador de la primera foto del mes 6, pendiente de sustituir por vuestra imagen.',
          caption: 'La mesa de la esquina',
        },
        {
          src: 'assets/photos/photo-03.svg',
          alt: 'Marcador de la segunda foto del mes 6, pendiente de sustituir por vuestra imagen.',
          caption: 'La tarta que sobró',
        },
        {
          src: 'assets/photos/photo-05.svg',
          alt: 'Marcador de la tercera foto del mes 6, pendiente de sustituir por vuestra imagen.',
          caption: 'Medio año, por fin',
        },
      ],
    },

    {
      number: 7,
      title: 'El mes que viene',
      place: 'Por decidir',
      letter: `Este capítulo todavía no está escrito. Se abrirá solo el {fecha}, y para entonces lo voy a escribir de verdad y no deprisa.`,
      photos: [
        {
          src: 'assets/photos/photo-08.svg',
          alt: 'Marcador de la primera foto del mes 7, pendiente de sustituir por vuestra imagen.',
          caption: 'Foto pendiente',
        },
      ],
    },

    {
      number: 8,
      title: 'Un mes sin fotos, a propósito',
      place: 'Por decidir',
      letter: `Este capítulo no tiene galería todavía. Cuando lo escribas, añade las fotos en el array "photos" y aparecerán solas.`,
      photos: [],
    },
  ],
};

export default SCRAPBOOK;
