import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'

// https://vite.dev/config/
//
// `base` apunta a la subruta del repo en GitHub Pages: el sitio se sirve en
// https://josebenin82.github.io/Lajas/ , así que todos los assets se referencian
// bajo /Lajas/. En local (npm run dev) Vite ignora `base` y sirve en /.
//
// El plugin `spa-404-fallback` copia el index.html generado a 404.html. GitHub
// Pages no conoce las rutas del cliente (BrowserRouter): al refrescar
// /Lajas/catalogo devuelve 404.html, que al ser idéntico a index.html arranca la
// app y React Router resuelve la ruta. Así deep-links y refresh funcionan con
// URLs limpias (sin #).
export default defineConfig({
  base: '/Lajas/',
  plugins: [
    react(),
    {
      name: 'spa-404-fallback',
      closeBundle() {
        copyFileSync('dist/index.html', 'dist/404.html')
      },
    },
  ],
})
