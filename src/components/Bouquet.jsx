/* Bouquet de lirios stargazer y orquídeas phalaenopsis.
   Cada flor se dibuja alrededor de su origen local: el grupo exterior
   la coloca (atributo transform) y el interior anima (CSS transform),
   así el florecer pivota en el centro de la flor sin pisar la posición. */

/* Pétalos con la punta curvada hacia fuera, como el lirio real */
const LILY_OUTER =
  "M0 0 C -14 -18 -15 -52 -4 -72 C -2 -77 3 -79 6 -75 C 14 -54 14 -18 0 0 Z";
const LILY_INNER =
  "M0 0 C -20 -16 -21 -50 -5 -68 C -2 -73 4 -75 7 -71 C 20 -50 20 -16 0 0 Z";
const LILY_SHINE = "M-2 -8 C -9 -24 -10 -46 -5 -62 C -3 -44 -2 -24 -2 -8 Z";
const LILY_SPOTS = [
  [-4, -14, 1.1],
  [3, -18, 1.3],
  [-2, -23, 1.4],
  [5, -27, 1.1],
  [-5, -31, 1.2],
  [2, -35, 1],
  [-1, -41, 0.8],
];
const BUD = "M0 0 C -10 -14 -10 -44 -1 -62 C 0 -64 2 -64 3 -61 C 10 -44 10 -14 0 0 Z";
const SEPAL = "M0 0 C -8 -6 -9 -24 0 -31 C 9 -24 8 -6 0 0 Z";
const ORCHID_PETAL = "M0 0 C 6 -18 26 -23 31 -7 C 33 6 16 12 0 0 Z";
const ORCHID_VEINS = [
  "M2 -1 Q 14 -10 26 -10",
  "M2 0 Q 15 -4 29 -3",
  "M2 1 Q 13 4 23 5",
];
const ORCHID_LIP =
  "M-6 4 C -11 14 -4 21 0 21 C 4 21 11 14 6 4 C 3 7 -3 7 -6 4 Z";
const ORCHID_LOBE = "M-5 3 C -12 -3 -13 8 -7 10 C -6 7 -5 5 -5 3 Z";

const STAMENS = [30, 90, 150, 210, 270, 330].map((a) => {
  const rad = ((a - 90) * Math.PI) / 180;
  return { a, x: Math.cos(rad) * 31, y: Math.sin(rad) * 31 };
});

const ms = (d) => ({ "--d": `${d}ms` });

function Lily({ x, y, r = 0, s = 1, d, white = false }) {
  const fill = white ? "url(#bq-lily-white)" : "url(#bq-lily)";
  const edge = white ? "#e3ddc6" : "#e9a4bb";
  const rib = white ? "#c7c09a" : "#b0285c";
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s} ${s * 0.88})`}>
      <g className="bq-bloom" style={ms(d)}>
        {[60, 180, 300, 0, 120, 240].map((a, i) => (
          <g key={a} transform={`rotate(${a})`}>
            <g className="bq-petal" style={ms(d + i * 45)}>
              <path
                d={i < 3 ? LILY_OUTER : LILY_INNER}
                fill={fill}
                stroke={edge}
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
              {i < 3 && (
                <path d={LILY_OUTER} fill="#4a0b22" opacity="0.13" />
              )}
              <path d={LILY_SHINE} fill="#ffffff" opacity="0.4" />
              <path
                d="M0 -6 Q 1.5 -34 -1 -62"
                fill="none"
                stroke={rib}
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.5"
              />
              {!white &&
                LILY_SPOTS.map(([sx, sy, sr]) => (
                  <circle key={sy} cx={sx} cy={sy} r={sr} fill="#8a1c45" />
                ))}
            </g>
          </g>
        ))}
        <circle r="17" fill="url(#bq-throat)" />
        <circle r="6" fill={white ? "#dfe8a8" : "#f3cf6a"} opacity="0.8" />
        {STAMENS.map(({ a, x: sx, y: sy }) => (
          <g key={a}>
            <line
              x1="0"
              y1="0"
              x2={sx}
              y2={sy}
              stroke="#ece5c2"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <ellipse
              cx={sx}
              cy={sy}
              rx="4"
              ry="1.7"
              fill="#9c4a24"
              transform={`rotate(${a} ${sx} ${sy})`}
            />
          </g>
        ))}
        <line
          x1="0"
          y1="0"
          x2="5"
          y2="-36"
          stroke="#a9bf6a"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="5" cy="-36" r="2.6" fill="#86a046" />
      </g>
    </g>
  );
}

function Bud({ x, y, r = 0, s = 1, d }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g className="bq-bud" style={ms(d)}>
        <path d={BUD} fill="url(#bq-bud)" stroke="#86a35a" strokeWidth="0.5" />
        <path
          d="M0 -4 Q 2 -30 0 -58"
          fill="none"
          stroke="#6d8a46"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <path
          d="M-4 -10 C -7 -24 -7 -40 -3 -52"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.4"
        />
      </g>
    </g>
  );
}

function Orchid({ x, y, r = 0, s = 1, d, v = "lav" }) {
  const petal = `url(#bq-orch-p-${v})`;
  const sepal = `url(#bq-orch-s-${v})`;
  const lip = v === "lav" ? "#7b2d8b" : "#c2185b";
  const lobe = v === "lav" ? "#5e1f6c" : "#9c1248";
  const edge = v === "lav" ? "#a46ab3" : "#efb3c9";
  const sepalShape = (
    <>
      <path d={SEPAL} fill={sepal} stroke={edge} strokeWidth="0.5" />
      <path d={SEPAL} fill="#3a0f40" opacity="0.08" />
    </>
  );
  const petalShape = (
    <>
      <path d={ORCHID_PETAL} fill={petal} stroke={edge} strokeWidth="0.5" />
      {ORCHID_VEINS.map((vd) => (
        <path
          key={vd}
          d={vd}
          fill="none"
          stroke={lip}
          strokeWidth="0.55"
          strokeLinecap="round"
          opacity="0.3"
        />
      ))}
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g className="bq-bloom bq-bloom--orchid" style={ms(d)}>
        {sepalShape}
        <g transform="rotate(128)">{sepalShape}</g>
        <g transform="rotate(-128)">{sepalShape}</g>
        {petalShape}
        <g transform="scale(-1 1)">{petalShape}</g>
        <path d={ORCHID_LOBE} fill={lobe} />
        <g transform="scale(-1 1)">
          <path d={ORCHID_LOBE} fill={lobe} />
        </g>
        <path d={ORCHID_LIP} fill={lip} />
        <path
          d="M-3 9 Q 0 16 3 9"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.35"
        />
        <ellipse cx="0" cy="6" rx="3.2" ry="2" fill="#f2c14e" />
        <circle cx="-1.6" cy="5.4" r="0.6" fill="#c2410c" />
        <circle cx="1.6" cy="5.4" r="0.6" fill="#c2410c" />
        <ellipse cx="0" cy="-1" rx="2.6" ry="3.6" fill="#fffaf6" />
        <circle cx="0" cy="-3.4" r="1.3" fill="#f6e3a3" />
      </g>
    </g>
  );
}

const STEMS = [
  ["M210 445 C 200 330 178 200 170 110", 0],
  ["M210 445 C 222 330 255 210 262 120", 60],
  ["M210 445 C 180 360 120 260 95 175", 120],
  ["M210 445 C 208 360 212 260 210 175", 30],
  ["M210 445 C 190 360 150 290 128 225", 90],
  ["M210 445 C 232 360 275 285 296 215", 150],
  ["M210 445 C 220 380 232 330 238 285", 210],
  ["M210 445 C 200 390 185 340 178 300", 240],
];

const LEAVES = [
  ["M210 440 C 150 380 95 330 62 300 C 110 320 165 370 212 430 Z", 280],
  ["M210 440 C 270 380 325 335 360 305 C 312 325 255 370 208 430 Z", 340],
  ["M210 440 C 196 360 160 270 150 180 C 172 262 205 350 214 430 Z", 400],
  ["M210 440 C 230 350 268 268 286 190 C 262 270 222 355 206 430 Z", 460],
];

export default function Bouquet() {
  return (
    <svg
      className="bouquet"
      viewBox="30 36 360 512"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      role="img"
      aria-label="Ramo de lirios rosas y orquídeas blancas y lilas, envuelto en papel con un moño vino."
    >
      <defs>
        <linearGradient id="bq-lily" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff4f6" />
          <stop offset="0.3" stopColor="#f4a9c0" />
          <stop offset="0.5" stopColor="#d6336c" />
          <stop offset="0.7" stopColor="#f4a9c0" />
          <stop offset="1" stopColor="#fff4f6" />
        </linearGradient>
        <linearGradient id="bq-lily-white" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fffdf7" />
          <stop offset="0.5" stopColor="#f1ecd3" />
          <stop offset="1" stopColor="#fffdf7" />
        </linearGradient>
        <linearGradient id="bq-bud" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#7d9a52" />
          <stop offset="0.55" stopColor="#c8d59a" />
          <stop offset="1" stopColor="#f2b9cb" />
        </linearGradient>
        <linearGradient id="bq-leaf" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4a6639" />
          <stop offset="1" stopColor="#7f9d5c" />
        </linearGradient>
        <radialGradient id="bq-orch-p-lav" cx="0.08" cy="0.65" r="1">
          <stop offset="0" stopColor="#8e3f9e" />
          <stop offset="0.45" stopColor="#c48fd1" />
          <stop offset="1" stopColor="#f3e6f6" />
        </radialGradient>
        <radialGradient id="bq-orch-s-lav" cx="0.5" cy="1" r="1.1">
          <stop offset="0" stopColor="#8e3f9e" />
          <stop offset="0.45" stopColor="#c48fd1" />
          <stop offset="1" stopColor="#f3e6f6" />
        </radialGradient>
        <radialGradient id="bq-orch-p-white" cx="0.08" cy="0.65" r="1">
          <stop offset="0" stopColor="#e46a9a" />
          <stop offset="0.3" stopColor="#f6c9db" />
          <stop offset="1" stopColor="#fffafc" />
        </radialGradient>
        <radialGradient id="bq-orch-s-white" cx="0.5" cy="1" r="1.1">
          <stop offset="0" stopColor="#e46a9a" />
          <stop offset="0.3" stopColor="#f6c9db" />
          <stop offset="1" stopColor="#fffafc" />
        </radialGradient>
        <radialGradient id="bq-throat">
          <stop offset="0" stopColor="#b9cf6a" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#d9e39a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#d9e39a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bq-tuck" cx="0.5" cy="0" r="0.9">
          <stop offset="0" stopColor="#5c3a2c" stopOpacity="0.22" />
          <stop offset="1" stopColor="#5c3a2c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bq-ground">
          <stop offset="0" stopColor="#26221e" stopOpacity="0.18" />
          <stop offset="1" stopColor="#26221e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="210" cy="542" rx="54" ry="6" fill="url(#bq-ground)" />

      {/* Papel trasero */}
      <path
        d="M80 300 Q 210 262 340 300 L 210 540 Z"
        fill="#e4cbbd"
      />
      <path
        d="M80 300 Q 210 262 340 300 L 310 356 Q 210 322 110 356 Z"
        fill="url(#bq-tuck)"
      />

      <g className="bq-sway">
        {LEAVES.map(([d, delay]) => (
          <path
            key={d}
            className="bq-leaf"
            d={d}
            fill="url(#bq-leaf)"
            style={ms(delay)}
          />
        ))}

        {STEMS.map(([d, delay]) => (
          <path
            key={d}
            className="bq-stem"
            d={d}
            pathLength="1"
            fill="none"
            stroke="#56733f"
            strokeWidth="3"
            strokeLinecap="round"
            style={ms(delay)}
          />
        ))}

        <Bud x={170} y={110} r={-12} d={820} />
        <Bud x={262} y={120} r={14} s={0.92} d={900} />
        <Bud x={95} y={175} r={-35} s={0.8} d={980} />

        <g className="bq-spray bq-spray--l">
          <path
            className="bq-stem"
            d="M205 440 C 190 360 120 300 58 250"
            pathLength="1"
            fill="none"
            stroke="#5f7d45"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={ms(180)}
          />
          <Orchid x={64} y={250} r={-20} s={0.7} d={1900} />
          <Orchid x={96} y={272} r={-12} s={0.85} d={1820} />
          <Orchid x={132} y={292} r={-6} s={1} d={1740} />
        </g>

        <g className="bq-spray bq-spray--r">
          <path
            className="bq-stem"
            d="M215 440 C 230 360 300 300 366 255"
            pathLength="1"
            fill="none"
            stroke="#5f7d45"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={ms(220)}
          />
          <Orchid x={360} y={254} r={18} s={0.7} d={2040} v="white" />
          <Orchid x={326} y={276} r={10} s={0.85} d={1960} v="white" />
          <Orchid x={290} y={295} r={4} s={1} d={1880} v="white" />
        </g>

        <Lily x={128} y={225} r={-28} s={0.85} d={1180} />
        <Lily x={296} y={215} r={24} s={0.9} d={1300} />
        <Lily x={210} y={175} d={1060} />
        <Lily x={238} y={285} r={10} s={0.7} d={1420} white />
        <Orchid x={178} y={300} r={-8} s={0.95} d={1660} v="white" />
      </g>

      {/* Papel delantero: dos solapas y el moño */}
      <path
        d="M60 330 Q 140 310 202 350 L 210 540 Z"
        fill="#f0dfd5"
      />
      <path
        d="M360 330 Q 280 312 218 352 L 210 540 Z"
        fill="#ead4c8"
      />
      <path
        d="M202 350 L 210 540 L 218 352"
        fill="none"
        stroke="#26221e"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      {/* Bordes y pliegues del papel */}
      <g
        fill="none"
        stroke="#26221e"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M60 330 Q 140 310 202 350" strokeOpacity="0.14" />
        <path d="M360 330 Q 280 312 218 352" strokeOpacity="0.14" />
        <path d="M118 338 Q 150 420 196 500" strokeOpacity="0.06" />
        <path d="M306 340 Q 272 420 224 500" strokeOpacity="0.07" />
      </g>
      <path
        d="M150 448 Q 210 462 270 448 L 266 466 Q 210 480 154 466 Z"
        fill="#7a2342"
      />
      <path
        d="M210 462 C 188 446 170 468 186 478 C 196 482 204 470 210 462 Z"
        fill="#8f2b4f"
      />
      <path
        d="M210 462 C 232 446 250 468 234 478 C 224 482 216 470 210 462 Z"
        fill="#8f2b4f"
      />
      <path d="M207 466 L 196 505 L 203 500 L 209 508 Z" fill="#7a2342" />
      <path d="M213 466 L 226 503 L 219 499 L 212 507 Z" fill="#6b1e3a" />
      <circle cx="210" cy="464" r="5" fill="#6b1e3a" />

      {/* Pétalos que se sueltan de vez en cuando */}
      <g transform="translate(300 232)">
        <g className="bq-fall" style={ms(4200)}>
          <path d={LILY_INNER} fill="url(#bq-lily)" transform="scale(0.32)" />
        </g>
      </g>
      <g transform="translate(132 246)">
        <g className="bq-fall bq-fall--alt" style={ms(9800)}>
          <path d={LILY_INNER} fill="url(#bq-lily)" transform="scale(0.28)" />
        </g>
      </g>
    </svg>
  );
}
