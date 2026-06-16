/*
 * Carrito.jsx — Carrito de compra.
 * Propósito: mostrar las líneas (cada una en m²), permitir ajustar la cantidad
 * de metros o eliminar, y resumir el subtotal de material. Comunica que el
 * flete se cotiza aparte y conduce al checkout. Estado vía CartContext.
 */

import { Link } from 'react-router-dom';
import StoneSwatch from '../components/StoneSwatch.jsx';
import Button from '../components/Button.jsx';
import { IconClose } from '../components/Icons.jsx';
import { useCart } from '../context/cart-store.js';
import { formatMXN } from '../lib/money.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import './Carrito.css';

export default function Carrito() {
  const { items, subtotal, setQty, removeItem } = useCart();
  useDocumentTitle('Tu carrito');

  if (items.length === 0) {
    return (
      <section
        className="section"
        style={{ paddingTop: 'calc(var(--nav-height) + 3rem)' }}
      >
        <div className="container container--narrow carrito__empty">
          <span className="eyebrow">Carrito</span>
          <h1>Tu carrito está vacío</h1>
          <p className="lead">
            Explora el catálogo, calcula los metros de tu proyecto y agrégalos
            aquí.
          </p>
          <Button to="/catalogo" size="lg">
            Ver catálogo
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="carrito"
      style={{ paddingTop: 'calc(var(--nav-height) + 2.5rem)' }}
    >
      <div className="container">
        <span className="eyebrow">Carrito</span>
        <h1>Tu carrito</h1>

        <div className="carrito__layout">
          <ul className="carrito__list">
            {items.map((it) => (
              <li key={it.lineId} className="carrito__item">
                <Link to={`/producto/${it.slug}`} className="carrito__thumb">
                  <StoneSwatch
                    swatch={it.swatch}
                    image={it.image}
                    name={it.name}
                    size="thumb"
                  />
                </Link>

                <div className="carrito__info">
                  <Link to={`/producto/${it.slug}`} className="carrito__name">
                    {it.name}
                  </Link>
                  <span className="carrito__meta">
                    {it.format} · {it.finish}
                  </span>
                  <span className="carrito__unit">
                    {formatMXN(it.pricePerM2)}/m²
                  </span>
                </div>

                <div className="carrito__qty">
                  <label>
                    <span className="sr-only">Metros cuadrados</span>
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={it.m2}
                      onChange={(e) => setQty(it.lineId, e.target.value)}
                      aria-label={`Metros cuadrados de ${it.name}`}
                    />
                    <span>m²</span>
                  </label>
                </div>

                <div className="carrito__line">
                  {formatMXN(it.pricePerM2 * it.m2)}
                </div>

                <button
                  className="carrito__remove"
                  onClick={() => removeItem(it.lineId)}
                  aria-label={`Quitar ${it.name} del carrito`}
                >
                  <IconClose size={18} />
                </button>
              </li>
            ))}
          </ul>

          {/* Resumen */}
          <aside className="carrito__summary" aria-label="Resumen del pedido">
            <h2>Resumen</h2>
            <div className="carrito__sumrow">
              <span>Subtotal material</span>
              <strong>{formatMXN(subtotal)}</strong>
            </div>
            <div className="carrito__sumrow carrito__sumrow--muted">
              <span>Flete</span>
              <span>Se cotiza por separado</span>
            </div>
            <p className="carrito__flete">
              El costo de envío depende de tu ubicación y volumen. Lo confirmamos
              antes de cerrar tu pedido.
            </p>
            <Button to="/checkout" size="lg" full>
              Continuar a pago
            </Button>
            <Link to="/catalogo" className="carrito__continue">
              ← Seguir comprando
            </Link>
            <p className="carrito__msi">
              Pagos a <strong>Meses Sin Intereses</strong> disponibles en el
              checkout para pedidos de ticket alto.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
