/*
 * coverage.js — Cálculo de cobertura en m² con merma y estimado.
 * Propósito: lógica reutilizable para convertir el área de un proyecto a metros
 * cuadrados de laja a comprar, sumando un porcentaje de merma (desperdicio por
 * cortes) y estimando el costo de material. Es el corazón de la M2Calculator y
 * se usa también para precargar cantidades en el carrito.
 *
 * El comprador de laja piensa en "área a cubrir", no en piezas. La merma típica
 * recomendada es 10%.
 */

/** Porcentaje de merma sugerido por defecto. */
export const MERMA_DEFAULT = 10;

/**
 * Calcula la cobertura a partir de dimensiones o de un área directa.
 * @param {object} input
 * @param {'dimensiones'|'area'} [input.modo='dimensiones'] Cómo se ingresa el área.
 * @param {number} [input.largo] Largo en metros (modo dimensiones).
 * @param {number} [input.ancho] Ancho en metros (modo dimensiones).
 * @param {number} [input.area] Área directa en m² (modo area).
 * @param {number} [input.mermaPct=10] Porcentaje de merma a sumar.
 * @param {number} [input.pricePerM2=0] Precio por m² para el estimado.
 * @returns {{areaNeta:number, mermaM2:number, areaTotal:number, estimado:number}}
 */
export function calcCoverage({
  modo = 'dimensiones',
  largo = 0,
  ancho = 0,
  area = 0,
  mermaPct = MERMA_DEFAULT,
  pricePerM2 = 0,
}) {
  const safe = (n) => (Number.isFinite(n) && n > 0 ? n : 0);

  const areaNeta =
    modo === 'area' ? safe(area) : +(safe(largo) * safe(ancho)).toFixed(2);

  const merma = Math.max(0, Number(mermaPct) || 0);
  const areaTotal = +(areaNeta * (1 + merma / 100)).toFixed(2);
  const mermaM2 = +(areaTotal - areaNeta).toFixed(2);
  const estimado = Math.round(areaTotal * (safe(pricePerM2) || 0));

  return { areaNeta, mermaM2, areaTotal, estimado };
}
