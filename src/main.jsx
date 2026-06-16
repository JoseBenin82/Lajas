/*
 * main.jsx — Punto de entrada de la aplicación.
 * Propósito: montar React en #root dentro de BrowserRouter (navegación SPA) y
 * cargar el sistema de diseño (tokens + base) antes que cualquier estilo de
 * componente.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/tokens.css';
import './styles/base.css';
import App from './App.jsx';

// basename alinea las rutas con la subruta del despliegue (/Lajas/ en GitHub
// Pages, / en local). import.meta.env.BASE_URL lo provee Vite desde `base`; se
// le quita la barra final porque React Router la normaliza sin ella.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
