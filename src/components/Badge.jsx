/*
 * Badge.jsx — Etiqueta breve (chip) reutilizable.
 * Propósito: resaltar atributos como "Más vendida", "Premium", "Translúcida" o
 * un color/uso, con variantes de tono. Puramente presentacional.
 */

import './Badge.css';

/**
 * @param {object} props
 * @param {'accent'|'neutral'|'dark'} [props.tone='accent'] Tono visual.
 * @param {React.ReactNode} props.children Texto de la etiqueta.
 */
export default function Badge({ tone = 'accent', className = '', children }) {
  return (
    <span className={`badge badge--${tone} ${className}`}>{children}</span>
  );
}
