import { useEffect, useRef } from "react";

/* Humo procedural del tema bocanada.
   Partículas-sprite que nacen cerca del borde inferior visible, suben,
   rizan con ruido pseudo-curl y se desvanecen. Se dibuja en documento,
   así que el humo queda donde se emitió al hacer scroll. */

function makeSprite(seed) {
  const s = 160;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d");
  let rnd = seed * 9973 + 1;
  const rand = () => (rnd = (rnd * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 9; i++) {
    const r = 26 + rand() * 40;
    const x = s / 2 + (rand() - 0.5) * 52;
    const y = s / 2 + (rand() - 0.5) * 52;
    const a = 0.1 + rand() * 0.12;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(236, 242, 255, ${a})`);
    grad.addColorStop(0.6, `rgba(226, 236, 255, ${a * 0.45})`);
    grad.addColorStop(1, "rgba(226, 236, 255, 0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
  }
  return c;
}

export default function Smoke({ reduceMotion }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const sprites = [makeSprite(3), makeSprite(17), makeSprite(42)];
    const parts = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let emitAcc = 0;
    let last = performance.now();

    const resize = () => {
      const box = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.round(box.width));
      h = canvas.height = Math.max(1, Math.round(box.height));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();

    const spawn = (x, y) => {
      parts.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 16,
        vy: -(26 + Math.random() * 30),
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.7,
        size: 70 + Math.random() * 120,
        growth: 16 + Math.random() * 18,
        life: 7 + Math.random() * 4,
        age: 0,
        peak: 0.5 + Math.random() * 0.5,
        sprite: sprites[(Math.random() * sprites.length) | 0],
      });
    };

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      /* Emisores anclados a la zona visible del capítulo */
      const rect = canvas.getBoundingClientRect();
      const viewBase = -rect.top + window.innerHeight;
      emitAcc += dt * 15;
      while (emitAcc >= 1) {
        emitAcc -= 1;
        const ex = w * (0.15 + Math.random() * 0.7);
        const ey = Math.min(h - 40, Math.max(80, viewBase - 60 - Math.random() * innerHeight * 0.3));
        if (parts.length < 130) spawn(ex, ey);
      }

      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.age += dt;
        if (p.age >= p.life || p.size > 900) {
          parts.splice(i, 1);
          continue;
        }
        /* Rizo: deriva lateral pseudo-curl según posición y tiempo */
        const curl =
          Math.sin(p.y * 0.006 + t * 1.1) +
          Math.cos(p.x * 0.005 - t * 0.8) +
          Math.sin((p.x + p.y) * 0.002 + t * 0.5);
        p.vx += curl * 26 * dt;
        p.vy += Math.sin(t * 1.4 + p.x * 0.01) * 4 * dt;
        p.vx *= 0.982;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.size += p.growth * dt;

        const k = p.age / p.life;
        const alpha = Math.sin(Math.PI * Math.min(1, k)) * 0.22 * p.peak;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.drawImage(p.sprite, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    };

    if (reduceMotion) {
      /* Un fotograma quieto: unas volutas tenues, sin movimiento */
      resize();
      for (let i = 0; i < 26; i++) {
        spawn(w * (0.1 + Math.random() * 0.8), h * (0.15 + Math.random() * 0.7));
        parts[i].age = parts[i].life * (0.3 + Math.random() * 0.4);
      }
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.drawImage(p.sprite, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduceMotion]);

  return <canvas className="smoke" ref={ref} aria-hidden="true" />;
}
