/*
 * useReveal.js — Observador global de scroll-reveal.
 * Propósito: un único IntersectionObserver que detecta los elementos marcados con
 * el atributo [data-reveal] y les añade la clase `is-visible` al entrar en
 * viewport, disparando el fundido + desplazamiento definido en base.css. Se monta
 * una sola vez (en App) y re-escanea el DOM en cada cambio de ruta, porque al
 * navegar montan elementos nuevos. Respeta `prefers-reduced-motion`: en ese caso
 * marca todo visible de inmediato sin observar.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Activa el reveal global de elementos [data-reveal].
 * Debe invocarse una sola vez, dentro de un componente bajo <BrowserRouter>.
 */
export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const items = Array.from(document.querySelectorAll('[data-reveal]'));
    if (items.length === 0) return;

    // Sin animación para quien la desactiva: todo visible al instante.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // una sola vez por elemento
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );

    items.forEach((el) => {
      // Lo ya visible (above-the-fold) se revela en el primer frame sin esperar.
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);
}
