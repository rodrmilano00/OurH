/* =============================================================
   navidrome.js — cliente mínimo de la API Subsonic de Navidrome.
   -------------------------------------------------------------
   Lee la config de variables de entorno de Vite (ver .env.example):
     VITE_NAVIDROME_URL   → http://192.168.1.10:4533
     VITE_NAVIDROME_USER  → usuario de Navidrome
     VITE_NAVIDROME_PASS  → contraseña (viaja como p=enc:hex)

   Solo se usa dentro de meses con `song` definido. Si falta la
   config, el reproductor no se pinta y nada se rompe.
   ============================================================= */

const BASE = (import.meta.env.VITE_NAVIDROME_URL || "").replace(/\/+$/, "");
const USER = import.meta.env.VITE_NAVIDROME_USER || "";
const PASS = import.meta.env.VITE_NAVIDROME_PASS || "";

export const NAVIDROME_READY = Boolean(BASE && USER && PASS);

/* Auth Subsonic con contraseña hex (`p=enc:…`), válida en Navidrome. */
function authParams() {
  const hex = Array.from(new TextEncoder().encode(PASS))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return new URLSearchParams({
    u: USER,
    p: `enc:${hex}`,
    v: "1.16.1",
    c: "our-scrapbook",
  });
}

/* Busca la canción por título + artista y devuelve su track id.
   Prefiere una coincidencia exacta de título; si no, la primera. */
export async function searchTrackId(title, artist) {
  const params = authParams();
  params.set("f", "json");
  params.set("query", `${title} ${artist}`);
  params.set("songCount", "10");
  params.set("albumCount", "0");
  params.set("artistCount", "0");

  const res = await fetch(`${BASE}/rest/search3.view?${params}`);
  if (!res.ok) throw new Error(`Navidrome HTTP ${res.status}`);

  const data = await res.json();
  const response = data?.["subsonic-response"];
  if (response?.status !== "ok") {
    throw new Error(response?.error?.message || "Navidrome respondió error");
  }

  const songs = response.searchResult3?.song || [];
  if (!songs.length) throw new Error("Canción no encontrada");

  const wanted = title.toLowerCase();
  const match = songs.find((s) => (s.title || "").toLowerCase() === wanted);
  return (match || songs[0]).id;
}

/* URL de streaming directa para usar como src de <audio>. */
export function streamUrl(trackId) {
  const params = authParams();
  params.set("id", trackId);
  return `${BASE}/rest/stream.view?${params}`;
}
