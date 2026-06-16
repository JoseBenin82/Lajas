/*
 * mockProvider.js — Proveedor de pago simulado ("pago de prueba").
 * Propósito: implementar la interfaz PaymentProvider sin pasarela real, para
 * poder probar el flujo completo de compra. Simula un pago exitoso tras un
 * pequeño retardo y devuelve un número de orden generado en el cliente.
 *
 * TODO (integración real): reemplazar/duplicar este archivo con un proveedor de
 * Mercado Pago o Stripe. La pasarela real requiere un backend que cree la
 * preferencia/intent y reciba el webhook de confirmación; este front ya está
 * desacoplado para enchufarlo cambiando solo el provider seleccionado.
 */

/** Genera un número de orden legible tipo LT-AB12CD. */
function generarNumeroOrden() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `LT-${code}`;
}

/**
 * Proveedor mock que cumple la interfaz PaymentProvider.
 * @type {import('./index.js').PaymentProvider}
 */
export const mockProvider = {
  id: 'mock',
  label: 'Pago de prueba',
  enabled: true,

  /**
   * Simula el cobro: espera ~1.4 s y responde con éxito.
   * @param {object} order { items, subtotal, customer, msi }
   * @returns {Promise<{status:'approved', orderId:string, paidAt:string}>}
   */
  async createPayment(order) {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    return {
      status: 'approved',
      orderId: generarNumeroOrden(),
      paidAt: new Date().toISOString(),
      provider: 'mock',
      amount: order?.subtotal ?? 0,
    };
  },
};
