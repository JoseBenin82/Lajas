/*
 * ProductCard.jsx — Tarjeta de producto para el catálogo y secciones destacadas.
 * Propósito: mostrar una laja con su muestra visual, nombre, precio por m² y
 * usos principales, enlazando al detalle. Incluye la etiqueta destacada si la hay.
 */

import { Link } from 'react-router-dom';
import StoneSwatch from './StoneSwatch.jsx';
import Badge from './Badge.jsx';
import { formatMXN } from '../lib/money.js';
import './ProductCard.css';

/**
 * @param {object} props
 * @param {object} props.product Producto del catálogo (ver data/products.js).
 */
export default function ProductCard({ product }) {
  const { slug, name, color, pricePerM2, uses, badge, swatch, image, tagline } =
    product;

  return (
    <Link to={`/producto/${slug}`} className="pcard" aria-label={`Ver ${name}`} data-reveal>
      <div className="pcard__media">
        <StoneSwatch swatch={swatch} image={image} name={name} size="card" />
        {badge && <Badge className="pcard__badge">{badge}</Badge>}
      </div>

      <div className="pcard__body">
        <div className="pcard__head">
          <h3 className="pcard__name">{name}</h3>
          <span className="pcard__color">{color}</span>
        </div>
        <p className="pcard__tagline">{tagline}</p>

        <div className="pcard__foot">
          <span className="pcard__price">
            {formatMXN(pricePerM2)}
            <small> /m²</small>
          </span>
          <span className="pcard__uses">{uses.slice(0, 2).join(' · ')}</span>
        </div>
      </div>
    </Link>
  );
}
