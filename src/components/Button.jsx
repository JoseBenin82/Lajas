/*
 * Button.jsx — Botón/CTA reutilizable del sistema de diseño.
 * Propósito: ofrecer un único componente de acción con variantes (primary,
 * secondary, ghost) y tamaños, capaz de renderizarse como <button>, como enlace
 * interno (<Link> de react-router) o como <a> externo, manteniendo estilos y
 * accesibilidad consistentes en toda la app.
 */

import { Link } from 'react-router-dom';
import './Button.css';

/**
 * @param {object} props
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary'] Estilo visual.
 * @param {'sm'|'md'|'lg'} [props.size='md'] Tamaño.
 * @param {string} [props.to] Ruta interna; si está, se renderiza como <Link>.
 * @param {string} [props.href] URL externa; si está, se renderiza como <a>.
 * @param {boolean} [props.full=false] Ocupa el ancho completo del contenedor.
 * @param {React.ReactNode} props.children Contenido del botón.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  full = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    full ? 'btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Enlace interno (SPA) vía react-router
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  // Enlace externo (abre en pestaña nueva de forma segura)
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Botón nativo
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
