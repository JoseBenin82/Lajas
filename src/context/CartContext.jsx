/*
 * CartContext.jsx — Proveedor del estado global del carrito.
 * Propósito: gestionar las líneas del carrito (cada una en metros cuadrados),
 * persistirlas en localStorage y exponer acciones (agregar, cambiar cantidad,
 * quitar, vaciar) y derivados (conteo, subtotal). El carrito de laja razona en
 * m², no en piezas: la cantidad de cada línea es el área a comprar de un
 * producto en cierto formato/acabado. El contexto y el hook viven en
 * cart-store.js para no romper el Fast Refresh.
 */

import { useEffect, useMemo, useState } from 'react';
import { CartContext, STORAGE_KEY, makeLineId } from './cart-store.js';

/** Lee el carrito persistido (tolerante a datos corruptos). */
function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Proveedor del carrito: envuelve la app en App.jsx. */
export function CartProvider({ children }) {
  const [items, setItems] = useState(readStorage);

  // Persiste ante cualquier cambio.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible: se ignora silenciosamente */
    }
  }, [items]);

  /**
   * Agrega una línea o suma m² si ya existe la misma combinación.
   * @param {object} line { productId, name, color, pricePerM2, format, finish, m2, thumb }
   */
  function addItem(line) {
    const lineId = makeLineId(line.productId, line.format, line.finish);
    const m2 = Math.max(0, Number(line.m2) || 0);
    if (m2 <= 0) return;

    setItems((prev) => {
      const idx = prev.findIndex((it) => it.lineId === lineId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], m2: +(next[idx].m2 + m2).toFixed(2) };
        return next;
      }
      return [...prev, { ...line, lineId, m2: +m2.toFixed(2) }];
    });
  }

  /** Fija la cantidad de m² de una línea (mínimo 0.5 m²). */
  function setQty(lineId, m2) {
    const value = Math.max(0.5, Number(m2) || 0.5);
    setItems((prev) =>
      prev.map((it) =>
        it.lineId === lineId ? { ...it, m2: +value.toFixed(2) } : it
      )
    );
  }

  /** Quita una línea del carrito. */
  function removeItem(lineId) {
    setItems((prev) => prev.filter((it) => it.lineId !== lineId));
  }

  /** Vacía el carrito (tras pago confirmado, por ejemplo). */
  function clear() {
    setItems([]);
  }

  // Derivados memorizados.
  const { count, subtotal } = useMemo(
    () => ({
      count: items.length,
      subtotal: items.reduce((sum, it) => sum + it.pricePerM2 * it.m2, 0),
    }),
    [items]
  );

  const value = { items, count, subtotal, addItem, setQty, removeItem, clear };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
