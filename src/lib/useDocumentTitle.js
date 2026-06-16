/*
 * useDocumentTitle.js — Hook de SEO básico por página.
 * Propósito: actualizar el <title> y la meta description al montar cada página,
 * sin depender de librerías externas (react-helmet). Restaura el título base al
 * desmontar para no dejar títulos colgados al navegar.
 */

import { useEffect } from 'react';

const TITULO_BASE = 'Laja Tepexi';

/**
 * Fija el título del documento y, opcionalmente, la meta description.
 * @param {string} title Título de la página (se le antepone la marca).
 * @param {string} [description] Texto para <meta name="description">.
 */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ${TITULO_BASE}` : TITULO_BASE;

    let metaEl;
    if (description) {
      metaEl = document.querySelector('meta[name="description"]');
      if (metaEl) metaEl.setAttribute('content', description);
    }
    // No restauramos la description (el siguiente página la sobreescribe);
    // sí dejamos el título base como cortesía.
    return () => {
      document.title = TITULO_BASE;
    };
  }, [title, description]);
}
