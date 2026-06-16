/*
 * payments/index.js — Interfaz agnóstica de pasarela de pago.
 * Propósito: desacoplar el checkout de cualquier proveedor concreto. El front
 * solo conoce esta interfaz y una lista de proveedores; hoy solo está activo el
 * mock, y Mercado Pago / Stripe aparecen como "próximamente". Para integrar una
 * pasarela real basta con añadir su provider aquí y marcarlo enabled.
 */

import { mockProvider } from './mockProvider.js';

/**
 * @typedef {object} PaymentProvider
 * @property {string} id Identificador único ('mock' | 'mercadopago' | 'stripe').
 * @property {string} label Nombre visible.
 * @property {boolean} enabled Si está disponible para cobrar.
 * @property {(order:object)=>Promise<object>} [createPayment] Inicia el cobro.
 */

/**
 * Proveedores conocidos. Mercado Pago y Stripe quedan declarados pero
 * deshabilitados hasta tener backend; el mock permite probar el flujo.
 * @type {PaymentProvider[]}
 */
export const PROVIDERS = [
  mockProvider,
  {
    id: 'mercadopago',
    label: 'Mercado Pago',
    enabled: false, // TODO: requiere backend (preferencia + webhook)
  },
  {
    id: 'stripe',
    label: 'Stripe',
    enabled: false, // TODO: requiere backend (PaymentIntent + webhook)
  },
];

/** Proveedores listos para cobrar (hoy: solo el mock). */
export const ACTIVE_PROVIDERS = PROVIDERS.filter((p) => p.enabled);

/**
 * Devuelve un proveedor por id.
 * @param {string} id
 * @returns {PaymentProvider|undefined}
 */
export function getProvider(id) {
  return PROVIDERS.find((p) => p.id === id);
}

/**
 * Ejecuta el cobro con el proveedor indicado.
 * @param {string} providerId
 * @param {object} order Datos del pedido.
 * @returns {Promise<object>} Resultado del pago.
 */
export async function createPayment(providerId, order) {
  const provider = getProvider(providerId);
  if (!provider || !provider.enabled || !provider.createPayment) {
    throw new Error(`Proveedor de pago no disponible: ${providerId}`);
  }
  return provider.createPayment(order);
}
