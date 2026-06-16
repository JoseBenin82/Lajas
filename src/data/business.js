/*
 * business.js — Datos de negocio centralizados (provisionales).
 * Propósito: un único lugar para nombre, teléfono, WhatsApp, correo y dirección,
 * de modo que sustituirlos cuando el cliente confirme sea un solo cambio.
 * TODO (cliente): confirmar marca definitiva, número real de WhatsApp, teléfono,
 * correo, dirección fiscal y RFC.
 */

/** Número de WhatsApp en formato internacional sin signos (placeholder). */
const WHATSAPP_E164 = '5212221234567';

export const BUSINESS = {
  name: 'Laja Tepexi',
  // Contacto (PLACEHOLDERS — sustituir con datos reales del cliente)
  phone: '+522221234567',
  phoneDisplay: '+52 222 123 4567',
  email: 'ventas@lajatepexi.mx',
  whatsappDisplay: '+52 222 123 4567',
  whatsappNumber: WHATSAPP_E164,
  address: 'Tepexi de Rodríguez, Puebla, México',

  /**
   * Construye una URL de WhatsApp con mensaje opcional.
   * @param {string} [message] Texto prellenado del chat.
   * @returns {string} URL https://wa.me/...
   */
  whatsappLink(message) {
    const base = `https://wa.me/${WHATSAPP_E164}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  },

  /** URL de WhatsApp por defecto (sin mensaje). */
  get whatsappUrl() {
    return `https://wa.me/${WHATSAPP_E164}`;
  },
};
