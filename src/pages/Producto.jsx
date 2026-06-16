/*
 * Producto.jsx — Detalle de una laja.
 * Propósito: ficha completa del producto: muestra visual, specs (formato,
 * espesor, acabado, usos), precio por m², calculadora de metraje y los dos CTAs
 * del modelo híbrido: "Agregar al carrito" (pago online) y "Cotizar
 * flete/volumen" (pedidos grandes). Incluye aviso de variación natural de tonos
 * y lajas relacionadas.
 */

import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import StoneSwatch from '../components/StoneSwatch.jsx';
import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';
import { IconCheck } from '../components/Icons.jsx';
import M2Calculator from '../components/M2Calculator.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { getProductBySlug, PRODUCTS } from '../data/products.js';
import { formatMXN } from '../lib/money.js';
import { useCart } from '../context/cart-store.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import NotFound from './NotFound.jsx';
import './Producto.css';

export default function Producto() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = getProductBySlug(slug);

  // Selecciones del usuario (siempre se llama useState aunque el producto no
  // exista; el early-return va después para no romper las reglas de hooks).
  const [formato, setFormato] = useState(product?.formats[0] ?? '');
  const [acabado, setAcabado] = useState(product?.finishes[0] ?? '');
  const [cobertura, setCobertura] = useState({ areaTotal: 0, estimado: 0 });
  const [agregado, setAgregado] = useState(false);

  // Lajas relacionadas: mismo color o algún uso en común (máx. 3).
  const relacionadas = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) =>
        p.id !== product.id &&
        (p.color === product.color ||
          p.uses.some((u) => product.uses.includes(u)))
    ).slice(0, 3);
  }, [product]);

  useDocumentTitle(
    product ? `${product.name} · Laja ${product.color.toLowerCase()}` : 'Producto',
    product
      ? `${product.name}: laja natural ${product.color.toLowerCase()} de Tepexi desde ${product.pricePerM2} MXN/m². ${product.tagline}`
      : undefined
  );

  if (!product) return <NotFound />;

  const puedeAgregar = cobertura.areaTotal > 0;

  function handleAgregar() {
    if (!puedeAgregar) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      color: product.color,
      pricePerM2: product.pricePerM2,
      format: formato,
      finish: acabado,
      m2: cobertura.areaTotal,
      swatch: product.swatch,
      image: product.image,
    });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2600);
  }

  // Mensaje prellenado para cotización de este producto.
  const cotizarUrl = `/cotizacion?producto=${encodeURIComponent(
    product.name
  )}&m2=${cobertura.areaTotal || ''}`;

  return (
    <article className="producto">
      <div className="container">
        <nav className="producto__crumbs" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to="/catalogo">Catálogo</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="producto__layout">
          {/* ---- Galería ---- */}
          <div className="producto__media">
            <StoneSwatch
              swatch={product.swatch}
              image={product.image}
              name={product.name}
              size="hero"
            />
            <p className="producto__aviso">
              <strong>Tonos naturales:</strong> al ser piedra natural, el color y
              la veta varían entre piezas y lotes. La muestra es representativa.
            </p>
          </div>

          {/* ---- Información y compra ---- */}
          <div className="producto__info">
            <div className="producto__head">
              {product.badge && <Badge>{product.badge}</Badge>}
              <span className="producto__color">Color {product.color}</span>
            </div>
            <h1>{product.name}</h1>
            <p className="producto__tagline lead">{product.tagline}</p>

            <p className="producto__price">
              {formatMXN(product.pricePerM2)}
              <small> / m²</small>
            </p>

            <p className="producto__desc">{product.description}</p>

            {/* Formato */}
            <div className="producto__spec">
              <span className="producto__speclabel">Formato</span>
              <div className="filters__chips">
                {product.formats.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`chip ${formato === f ? 'is-on' : ''}`}
                    aria-pressed={formato === f}
                    onClick={() => setFormato(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Acabado */}
            <div className="producto__spec">
              <span className="producto__speclabel">Acabado</span>
              <div className="filters__chips">
                {product.finishes.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`chip ${acabado === f ? 'is-on' : ''}`}
                    aria-pressed={acabado === f}
                    onClick={() => setAcabado(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Specs informativos */}
            <dl className="producto__specsheet">
              <div>
                <dt>Espesores</dt>
                <dd>{product.thicknesses.join(' · ')}</dd>
              </div>
              <div>
                <dt>Usos recomendados</dt>
                <dd>{product.uses.join(' · ')}</dd>
              </div>
            </dl>

            {/* Calculadora */}
            <M2Calculator
              pricePerM2={product.pricePerM2}
              onChange={setCobertura}
            />

            {/* CTAs híbridos */}
            <div className="producto__cta">
              <Button
                size="lg"
                full
                onClick={handleAgregar}
                disabled={!puedeAgregar}
              >
                {agregado ? (
                  <span className="btn__withicon">
                    <IconCheck size={18} /> Agregado al carrito
                  </span>
                ) : (
                  'Agregar al carrito'
                )}
              </Button>
              <Button size="lg" variant="secondary" full to={cotizarUrl}>
                Cotizar flete/volumen
              </Button>
            </div>
            {!puedeAgregar && (
              <p className="producto__hint">
                Ingresa el área de tu proyecto en la calculadora para agregarlo
                al carrito.
              </p>
            )}
            {agregado && (
              <p className="producto__hint producto__hint--ok">
                Agregado.{' '}
                <button
                  className="producto__link"
                  onClick={() => navigate('/carrito')}
                >
                  Ir al carrito →
                </button>
              </p>
            )}
          </div>
        </div>

        {/* ---- Relacionadas ---- */}
        {relacionadas.length > 0 && (
          <section className="producto__related">
            <h2>También te puede gustar</h2>
            <div className="grid grid--auto">
              {relacionadas.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
