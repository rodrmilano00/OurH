# Product

## Register

brand

## Users

Una pareja. Lo escribe una persona y lo lee su pareja, mes a mes. Uso íntimo:
abrir el capítulo nuevo cuando llega su fecha, leer la carta despacio, ampliar
las fotos.

## Product Purpose

Un scrapbook digital que crece con la relación: cada mes guarda una carta y
fotos con leyenda. Los capítulos no se abren antes de tiempo; el candado
desaparece solo. Cada mes se asocia a una canción y adopta la identidad
gráfica de su álbum.

## Brand Personality

Editorial con filo. La base es papel y tipografía cuidada; cada capítulo puede
virar hacia la identidad de su álbum (el mes 1 es blanco y negro agresivo,
a lo Helmut Newton). Tres palabras: íntimo, editorial, afilado.

## Anti-references

Nada de look tech/SaaS: sin cards con borde + sombra suave, sin gradientes,
sin glassmorphism, sin dashboards ni jerga técnica en los textos visibles.

## Design Principles

- El contenido manda: cada capítulo hereda la identidad del álbum de su
  canción; la base editorial es el marco, no el límite.
- La espera es parte del diseño: candados, "?" y cuentas atrás son elementos
  emocionales, no técnicos.
- Sin notas técnicas en la UI: ninguna ruta de archivo ni instrucciones de
  edición en textos visibles.
- Movimiento sutil y con propósito: fundidos cortos, nada elástico.
- La carta y los textos principales mantienen legibilidad alta; los elementos
  decorativos del tema pueden relajar contraste.

## Accessibility & Inclusion

La carta y el texto principal mantienen contraste alto (≥4.5:1); lo decorativo
del tema puede relajarlo. `prefers-reduced-motion` desactiva fundidos.
Navegación completa por teclado (rail con roving tabindex, lightbox con focus
trap). Capítulos bloqueados inertes con `aria-disabled`.
