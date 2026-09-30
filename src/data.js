/* =============================================================
   data.js — ÚNICO archivo que tocas cada mes.
   -------------------------------------------------------------
   Para añadir un mes nuevo: copia un objeto del array "months",
   sube el "number" (1, 2, 3...), escribe la carta y añade las fotos
   dentro de "photos". No hace falta tocar index.html, styles.css
   ni app.js: la cabecera, la home, la ficha y el índice se
   reconstruyen solos.

   CANDADO MANUAL: pon  locked: true  en un mes para mantenerlo
   cerrado con "?" hasta que lo escribas. Quita la línea cuando
   esté listo: se abrirá solo si ya llegó su fecha.

   TOKENS disponibles dentro de "letter" y de las leyendas:
     {n}      → número de mes        (ej.: 3)
     {fecha}  → fecha del capítulo   (ej.: 14 de mayo de 2026)
     {meses}  → meses juntos a hoy   (ej.: 5)
   ============================================================= */

const SCRAPBOOK = {
  meta: {
    title: 'Our Turntable',
    subtitle: 'Mes a mes lo vamos armando',
    lede:
      'Mes a mes lo vamos armando: cada capítulo es un disco, y cada disco lleva una canción que nos marcó.',

    // ↓↓↓  CAMBIA ESTA FECHA (AAAA-MM-DD). El contador y los candados se recalculan solos ↓↓↓
    startDate: '2026-08-30',

    // Si quieres una fecha exacta para un capítulo, déjala escrita: date: '2026-04-14'.
    // Si la borras, se calcula sola: startDate + (number - 1) meses.
    dateLocale: 'es-ES',
  },

  months: [
    {
      number: 1,
      title: 'Un mes que no parecía el primero',
      place: '30 de septiembre',
      theme: 'sting',
      song: {
        title: 'Still Loving You',
        artist: 'Scorpions',
        album: 'Love at First Sting',
        year: 1984,
        cover: 'assets/covers/love-at-first-sting.jpg',
        src: 'audio/still-loving-you.mp3',
      },
      letter: `La situación con esta canción me ha parecido muy particular. Still Loving You suele usarse para describir el capítulo final, cuando la historia de un amor se rompe y alguien ruega por volver al inicio. Pero para nosotros fue todo lo contrario: es nuestra canción de apertura.

Si esta canción habla de cruzar paredes y de luchar hasta el final por conservar un amor, usarla como nuestro "kickstarter" significa que no estamos esperando a que las cosas se rompan para valorarnos. Decidimos empezar nuestra historia directamente en el nivel más alto de intensidad, sabiendo que si un día llegan las tormentas, la respuesta ya está escrita en nuestra canción desde el día uno: siempre volveremos a apostar por nosotros.

Tiene algo de nostálgica: me recuerda a cuando estaba nervioso al invitarte a salir y me emocionaba cada vez que contestabas. Me recuerda al chai que probé en el Josefina aquel día. A los primeros raites que me dabas a la escuela en fines de semana. Al aroma de tu carro. Al aroma de tu depa la primera vez que fui. A nuestro primer beso.

Digo que este primer mes no se siente como el primero porque la química y la confianza que hemos construido nos han permitido ir más allá y cruzar las barreras del tiempo. Siento que llevo conociéndote toda una vida. Agradezco al cielo y a Dios porque estás en mi vida: te has convertido en una parte tan importante de mi rutina y de mí. Entre lágrimas mientras escribo esto, no me queda más que decirte gracias — por seguirme el juego, por escucharme, por reírte conmigo, por enseñarme lo que es el arte a través de ti y por ser lo mejor que me ha pasado.

Esta canción refleja lo que somos y lo que estamos por ser: una pareja que transforma la melancolía en energía pura y que entra a esta historia con el compromiso total de luchar por lo nuestro.`,
      photos: [
        {
          src: 'assets/photos/mes-01/foto-01.jpg',
          alt: 'Foto del mes 1.',
          caption: 'El pingüino tonto del Miniso',
        },
        {
          src: 'assets/photos/mes-01/foto-02.jpg',
          alt: 'Foto del mes 1.',
          caption: 'Date en el SnackTime',
        },
        {
          src: 'assets/photos/mes-01/foto-03.jpg',
          alt: 'Foto del mes 1.',
          caption: 'Tu cumpleaños',
        },
        {
          src: 'assets/photos/mes-01/foto-04.jpg',
          alt: 'Foto del mes 1.',
          caption: 'Siempre será divertido hacerte flores',
        },
        {
          src: 'assets/photos/mes-01/foto-05.jpg',
          alt: 'Foto del mes 1.',
          caption: 'Siempre tendrás un fan que te tome fotos',
        },
        {
          src: 'assets/photos/mes-01/foto-06.jpg',
          alt: 'Foto del mes 1.',
          caption: 'Gracias por robarte mi cel, así sales más en mi galería',
        },
      ],
    },

    {
      number: 2,
      locked: true,
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
      locked: true,
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
      locked: true,
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
      locked: true,
      title: 'El mes en que empezó a ser costumbre',
      place: 'Casa',
      letter: `Ya no contamos las cosas buenas porque han dejado de ser excepciones: el domingo sin celular, los desayunos largos, la serie compartida.

Llevamos {meses} meses y este es el primero en el que no eché de menos nada de cómo era antes. No es que haya pasado algo grande: es que se ha ido aclimatando todo.`,
      photos: [
        {
          src: 'assets/photos/photo-06.svg',
          alt: 'Marcador de la primera foto del mes 5, pendiente de sustituir por vuestra imagen.',
          caption: 'El domingo sin celular',
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
      locked: true,
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
      locked: true,
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
      locked: true,
      title: 'Un mes sin fotos, a propósito',
      place: 'Por decidir',
      letter: `Este capítulo no tiene galería todavía. Cuando lo escribas, añade las fotos en el array "photos" y aparecerán solas.`,
      photos: [],
    },

    {
      number: 9,
      locked: true,
      title: 'Capítulo por escribir',
      place: 'Por decidir',
      letter: `Este capítulo todavía no está escrito.`,
      photos: [],
    },

    {
      number: 10,
      locked: true,
      title: 'Capítulo por escribir',
      place: 'Por decidir',
      letter: `Este capítulo todavía no está escrito.`,
      photos: [],
    },

    {
      number: 11,
      locked: true,
      title: 'Capítulo por escribir',
      place: 'Por decidir',
      letter: `Este capítulo todavía no está escrito.`,
      photos: [],
    },

    {
      number: 12,
      locked: true,
      title: 'Capítulo por escribir',
      place: 'Por decidir',
      letter: `Este capítulo todavía no está escrito.`,
      photos: [],
    },
  ],
};

export default SCRAPBOOK;
