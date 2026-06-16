/*
 * NotFound.jsx — Página 404.
 * Propósito: ruta no encontrada con mensaje claro y caminos de regreso.
 */

import Button from '../components/Button.jsx';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Página no encontrada');

  return (
    <section
      className="section"
      style={{
        paddingTop: 'calc(var(--nav-height) + 4rem)',
        textAlign: 'center',
      }}
    >
      <div className="container container--narrow">
        <span className="eyebrow">Error 404</span>
        <h1>Esta página se nos perdió en la cantera.</h1>
        <p className="lead" style={{ margin: '1rem auto 2rem' }}>
          La dirección que buscas no existe o cambió de lugar.
        </p>
        <div
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Button to="/">Ir al inicio</Button>
          <Button to="/catalogo" variant="secondary">
            Ver catálogo
          </Button>
        </div>
      </div>
    </section>
  );
}
