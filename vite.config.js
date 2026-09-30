import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  /* GitHub Pages sirve el proyecto bajo /OurH/ */
  base: "/OurH/",
  plugins: [react()],
});
