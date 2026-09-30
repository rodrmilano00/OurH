import { useEffect, useRef, useState } from "react";
import {
  NAVIDROME_READY,
  searchTrackId,
  streamUrl,
} from "../navidrome.js";
import { IconPause, IconPlay } from "./icons.jsx";

const STATUS = {
  idle: "Reproducir",
  loading: "Buscando…",
  playing: "Sonando",
  paused: "En pausa",
  error: "Sin conexión",
};

/* Reproductor del tema del mes contra Navidrome.
   El autoplay con sonido lo bloquean los navegadores: el primer
   click busca la canción, fija el stream y arranca. */
export default function SongPlayer({ song }) {
  const audioRef = useRef(null);
  const trackIdRef = useRef(null);
  const [state, setState] = useState("idle");

  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    []
  );

  if (!song || !NAVIDROME_READY) return null;

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || state === "loading") return;

    if (state === "playing") {
      audio.pause();
      return;
    }

    try {
      if (!audio.src) {
        setState("loading");
        trackIdRef.current ??= await searchTrackId(song.title, song.artist);
        audio.src = streamUrl(trackIdRef.current);
      }
      await audio.play();
    } catch {
      setState("error");
    }
  }

  const playing = state === "playing";

  return (
    <div
      className={"player" + (playing ? " is-playing" : "")}
      role="group"
      aria-label={`Reproducir ${song.title} de ${song.artist}`}
    >
      {song.cover ? (
        <button
          className="player__vinyl"
          type="button"
          aria-label={playing ? "Pausar la canción" : "Reproducir la canción"}
          aria-pressed={playing}
          disabled={state === "loading"}
          onClick={toggle}
        >
          <span className="player__disc" aria-hidden="true">
            <span className="player__label" />
          </span>
          <img
            className="player__cover"
            src={song.cover}
            alt={`Portada del álbum ${song.album}`}
            width="640"
            height="640"
            loading="lazy"
            decoding="async"
          />
        </button>
      ) : (
        <button
          className="player__toggle"
          type="button"
          aria-label={playing ? "Pausar la canción" : "Reproducir la canción"}
          aria-pressed={playing}
          disabled={state === "loading"}
          onClick={toggle}
        >
          {playing ? <IconPause /> : <IconPlay />}
        </button>
      )}
      <p className="player__track">
        <span className="player__title">{song.title}</span>
        <span className="player__artist">{song.artist}</span>
      </p>
      <span className="player__vu" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="player__status" role="status">
        {STATUS[state]}
      </span>
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setState("playing")}
        onPause={() => setState("paused")}
        onEnded={() => setState("paused")}
        onError={() => setState("error")}
      />
    </div>
  );
}
