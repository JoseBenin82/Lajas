/*
 * cart-store.js — Contexto y hook del carrito (sin componentes).
 * Propósito: alojar el objeto Context y el hook useCart en un archivo separado
 * del proveedor, para que cada archivo exporte una sola categoría (componente
 * vs. utilidades) y el Fast Refresh de Vite funcione sin avisos de lint.
 */

import { createContext, useContext } from 'react';

/** Clave de persistencia del carrito en localStorage. */
export const STORAGE_KEY = 'laja-tepexi:cart:v1';

/** Contexto del carrito; lo consume el proveedor en CartContext.jsx. */
export const CartContext = createContext(null);

/** Hook de acceso al carrito. Lanza si se usa fuera del proveedor. */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de <CartProvider>');
  }
  return ctx;
}

/**
 * Construye el identificador único de una línea a partir de la combinación
 * producto + formato + acabado (así dos formatos del mismo producto conviven).
 * @param {string} productId
 * @param {string} [format]
 * @param {string} [finish]
 * @returns {string}
 */
export function makeLineId(productId, format, finish) {
  return `${productId}__${format ?? ''}__${finish ?? ''}`;
}
