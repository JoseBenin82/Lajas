/*
 * order-store.js — Persistencia de la última orden simulada.
 * Propósito: puente entre el checkout y la página de confirmación. Guarda la
 * orden aprobada en sessionStorage para que la confirmación la muestre aunque
 * se recargue la página, sin acoplar ambas vistas por estado de router.
 */

/** Clave en sessionStorage donde vive la última orden. */
export const LAST_ORDER_KEY = 'laja-tepexi:last-order';

/**
 * Lee la última orden guardada.
 * @returns {object|null} Orden o null si no hay/está corrupta.
 */
export function readLastOrder() {
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Elimina la última orden (al salir de la confirmación, por ejemplo). */
export function clearLastOrder() {
  try {
    sessionStorage.removeItem(LAST_ORDER_KEY);
  } catch {
    /* ignorar */
  }
}
