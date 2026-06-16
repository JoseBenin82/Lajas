/*
 * Section.jsx — Bloque de sección con encabezado editorial.
 * Propósito: estandarizar el ritmo vertical y los encabezados (antetítulo +
 * título + bajada) de las secciones de contenido, evitando repetir markup en
 * cada página. Acepta variantes de fondo y alineación.
 */

import './Section.css';

/**
 * @param {object} props
 * @param {string} [props.eyebrow] Antetítulo en mayúsculas.
 * @param {string} [props.title] Título de la sección.
 * @param {string} [props.subtitle] Bajada descriptiva.
 * @param {'default'|'soft'|'ink'} [props.variant='default'] Fondo.
 * @param {'left'|'center'} [props.align='left'] Alineación del encabezado.
 * @param {string} [props.id] id para anclas.
 * @param {React.ReactNode} props.children Contenido.
 */
export default function Section({
  eyebrow,
  title,
  subtitle,
  variant = 'default',
  align = 'left',
  id,
  children,
}) {
  const variantClass =
    variant === 'soft'
      ? 'section--soft'
      : variant === 'ink'
      ? 'section--ink'
      : '';

  return (
    <section id={id} className={`section ${variantClass}`}>
      <div className="container">
        {(eyebrow || title || subtitle) && (
          <header className={`sectionhead sectionhead--${align}`} data-reveal>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
            {subtitle && <p className="lead sectionhead__sub">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
