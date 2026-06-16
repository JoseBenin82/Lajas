/*
 * money.js — Utilidades de formato monetario (MXN).
 * Propósito: centralizar el formateo de precios en pesos mexicanos para que toda
 * la app muestre cantidades de forma consistente. Reutilizable en catálogo,
 * producto, carrito y checkout.
 */

/** Formateador base en pesos mexicanos sin decimales (precios de material). */
const formatterMXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

/** Formateador con 2 decimales para totales/subtotales precisos. */
const formatterMXN2 = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Da formato a una cantidad como precio en MXN.
 * @param {number} amount Cantidad numérica en pesos.
 * @param {boolean} [withCents=false] Si true, muestra dos decimales.
 * @returns {string} Cadena como "$1,234" o "$1,234.50".
 */
export function formatMXN(amount, withCents = false) {
  const value = Number.isFinite(amount) ? amount : 0;
  return (withCents ? formatterMXN2 : formatterMXN).format(value);
}

/**
 * Formatea un rango de precios "$min – $max" (usado para precio por m²).
 * @param {number} min Precio mínimo.
 * @param {number} max Precio máximo.
 * @returns {string} Rango formateado.
 */
export function formatRangeMXN(min, max) {
  if (min === max) return formatMXN(min);
  return `${formatMXN(min)} – ${formatMXN(max)}`;
}
