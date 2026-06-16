/*
 * Icons.jsx — Set de íconos SVG propios.
 * Propósito: reemplazar los glifos tipográficos (✕ ✓ ★) por SVG consistentes,
 * con un único grosor de trazo (1.5) y `currentColor`, para que hereden color y
 * se rendericen igual en cualquier fuente/sistema. `aria-hidden` por defecto: son
 * decorativos; el significado lo da el texto o el aria-label del contenedor.
 */

/** Línea base compartida por los íconos de trazo. */
const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/** Palomita (✓) — confirmaciones y listas. */
export function IconCheck({ size = 24, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...rest}>
      <path d="M5 12.5 10 17.5 19 7" {...strokeProps} />
    </svg>
  );
}

/** Cruz (✕) — cerrar / quitar. */
export function IconClose({ size = 24, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...rest}>
      <path d="M6 6 18 18M18 6 6 18" {...strokeProps} />
    </svg>
  );
}

/** Comilla decorativa de apertura — pull-quotes editoriales (relleno, no trazo). */
export function IconQuote({ size = 48, ...rest }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" {...rest}>
      <path
        fill="currentColor"
        d="M20 14c-6 2-10 7-10 14v6h11V23h-6c0-3 2-5 5-6zm18 0c-6 2-10 7-10 14v6h11V23h-6c0-3 2-5 5-6z"
      />
    </svg>
  );
}
