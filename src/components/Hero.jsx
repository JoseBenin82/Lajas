/*
 * Hero.jsx — Portada principal de la home.
 * Propósito: primera impresión editorial. Claim de marca, propuesta de valor y
 * doble CTA (ver catálogo / cotizar), acompañado de un collage de muestras de
 * laja destacadas. Sin fotografía real aún: usa StoneSwatch como visual.
 * TODO (cliente): sustituir el collage por fotografía profesional de cantera.
 */

import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import StoneSwatch from './StoneSwatch.jsx';
import { FEATURED, PRODUCTS } from '../data/products.js';
import './Hero.css';

export default function Hero() {
  // Toma hasta 4 lajas destacadas para el collage.
  const muestras = FEATURED.slice(0, 4);

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="eyebrow">Laja natural · Tepexi de Rodríguez, Puebla</span>
          <h1 className="hero__title">
            Piedra real que le da <em>carácter</em> a tu construcción.
          </h1>
          <p className="hero__lead lead">
            Laja extraída en la Mixteca poblana para fachadas, pisos y muros.
            Se vende por m², con asesoría de metraje y despacho a todo México.
          </p>
          <div className="hero__cta">
            <Button to="/catalogo" size="lg">
              Ver catálogo
            </Button>
            <Button to="/cotizacion" size="lg" variant="secondary">
              Cotizar flete/volumen
            </Button>
          </div>
          <ul className="hero__stats">
            <li>
              <strong>{PRODUCTS.length}</strong>
              <span>tonos naturales</span>
            </li>
            <li>
              <strong>$130–260</strong>
              <span>MXN por m²</span>
            </li>
            <li>
              <strong>Nacional</strong>
              <span>despacho a obra</span>
            </li>
          </ul>
        </div>

        <div className="hero__collage" aria-hidden="true">
          {muestras.map((p, i) => (
            <Link
              key={p.id}
              to={`/producto/${p.slug}`}
              className={`hero__tile hero__tile--${i + 1}`}
              tabIndex={-1}
            >
              <StoneSwatch
                swatch={p.swatch}
                image={p.image}
                name={p.name}
                size="hero"
              />
              <span className="hero__tilelabel">{p.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
