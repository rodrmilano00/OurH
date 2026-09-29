import { useEffect, useState } from "react";

/* Reloj compartido: un solo intervalo alimenta contador, cuentas
   atrás y candados. */
export function useNow(interval = 1000) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(id);
  }, [interval]);

  return now;
}
