/*
 * Testimonials.jsx — Prueba social editorial.
 * Propósito: mostrar reseñas de clientes. La primera se destaca como pull-quote
 * grande (cita protagonista) y el resto va en una fila secundaria. En lugar de
 * estrellas Unicode (que renderizan distinto según fuente), usa una comilla
 * decorativa SVG. Los datos provienen de data/testimonials.js.
 */

import { TESTIMONIALS } from '../data/testimonials.js';
import { IconQuote } from './Icons.jsx';
import './Testimonials.css';

export default function Testimonials() {
  const [destacado, ...resto] = TESTIMONIALS;

  return (
    <div className="testimonials">
      {/* Cita protagonista */}
      <figure className="tcard tcard--lead" data-reveal>
        <IconQuote className="tcard__mark" size={52} />
        <blockquote className="tcard__quote">{destacado.quote}</blockquote>
        <figcaption className="tcard__author">
          <strong>{destacado.author}</strong>
          <span>{destacado.role}</span>
        </figcaption>
      </figure>

      {/* Resto de reseñas */}
      <div className="testimonials__rest">
        {resto.map((t, i) => (
          <figure
            key={t.id}
            className="tcard"
            data-reveal
            style={{ '--reveal-delay': `${i * 80}ms` }}
          >
            <IconQuote className="tcard__mark" size={34} />
            <blockquote className="tcard__quote">{t.quote}</blockquote>
            <figcaption className="tcard__author">
              <strong>{t.author}</strong>
              <span>{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
