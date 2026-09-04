import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      /* Aplikace se staví do dist/port/index.html.
         Kořen webu obsluhuje public/index.html — chybovou stránku. */
      input: resolve(__dirname, "port/index.html"),
    },
  },
});
