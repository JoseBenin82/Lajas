/*
 * FAQ.jsx — Acordeón de preguntas frecuentes.
 * Propósito: resolver dudas clave de compra (merma, envío, tonos, MSI) en un
 * acordeón accesible basado en <details>/<summary>. Datos desde data/faqs.js.
 */

import { FAQS } from '../data/faqs.js';
import './FAQ.css';

export default function FAQ() {
  return (
    <div className="faq">
      {FAQS.map((f) => (
        <details key={f.id} className="faq__item">
          <summary className="faq__q">
            {f.q}
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <p className="faq__a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
