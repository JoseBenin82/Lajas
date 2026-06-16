/*
 * WhatsAppFab.jsx — Botón flotante de WhatsApp.
 * Propósito: acción de contacto siempre visible (esquina inferior derecha) que
 * abre un chat con mensaje prellenado. Se oculta durante el checkout para no
 * competir con el flujo de pago.
 */

import { useLocation } from 'react-router-dom';
import { BUSINESS } from '../data/business.js';
import './WhatsAppFab.css';

const MENSAJE =
  'Hola, vengo de la web de Laja Tepexi y me interesa cotizar laja natural.';

export default function WhatsAppFab() {
  const { pathname } = useLocation();

  // No mostrar en checkout/confirmación para no distraer del pago.
  if (pathname.startsWith('/checkout') || pathname.startsWith('/confirmacion')) {
    return null;
  }

  return (
    <a
      className="wa-fab"
      href={BUSINESS.whatsappLink(MENSAJE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.3-.5c-1-1.6-1.5-3.4-1.5-5.3C4.9 9.5 9.9 4.9 16 4.9c5.6 0 10.1 4.5 10.1 10.1S21.6 24.8 16 24.8zm5.6-7.6c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8 0 1.7 1.2 3.3 1.4 3.5.2.2 2.4 3.7 5.9 5.2 2.2.9 3 1 4.1.9.7-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"
        />
      </svg>
      <span className="wa-fab__pulse" aria-hidden="true" />
    </a>
  );
}
