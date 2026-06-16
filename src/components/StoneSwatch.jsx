/*
 * StoneSwatch.jsx — Representación visual de una laja.
 * Propósito: mostrar la fotografía real de la piedra (prop `image`) con
 * `object-fit: cover`. Si no hay imagen o falla la carga, cae con elegancia a un
 * placeholder de textura CSS generado a partir de dos colores y un `pattern`
 * (veta, capas, moteado, cristal, madera, fosil). Así la UI nunca queda vacía.
 */

import { useState } from 'react';
import './StoneSwatch.css';

/**
 * @param {object} props
 * @param {{c1:string, c2:string, pattern:string}} props.swatch Colores y patrón (respaldo).
 * @param {string} [props.image] URL de la foto real de la laja.
 * @param {string} props.name Nombre de la laja (para el alt accesible).
 * @param {'card'|'hero'|'thumb'} [props.size='card'] Variante de tamaño.
 */
export default function StoneSwatch({ swatch, image, name, size = 'card' }) {
  // Arranca intentando mostrar la imagen; ante error, revela el swatch CSS.
  const [showImg, setShowImg] = useState(Boolean(image));

  const { c1, c2, pattern } = swatch || {};
  const style = { '--s1': c1, '--s2': c2 };
  const patternClass = pattern ? `swatch--${pattern}` : '';

  return (
    <div
      className={`swatch swatch--${size} ${patternClass}`}
      style={style}
      role="img"
      aria-label={`Laja ${name}`}
    >
      {image && showImg ? (
        <img
          className="swatch__img"
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() => setShowImg(false)}
        />
      ) : (
        <span className="swatch__grain" aria-hidden="true" />
      )}
    </div>
  );
}
