/*
 * Confirmacion.jsx — Confirmación de pedido (orden simulada).
 * Propósito: cerrar el flujo de compra mostrando el número de orden generado,
 * el resumen de lo comprado y los siguientes pasos (te contactamos para cerrar
 * la entrega). Lee la orden persistida por el checkout; si no hay, ofrece volver.
 */

import { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import { IconCheck } from '../components/Icons.jsx';
import { formatMXN } from '../lib/money.js';
import { readLastOrder } from '../lib/order-store.js';
import { BUSINESS } from '../data/business.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import './Confirmacion.css';

export default function Confirmacion() {
  useDocumentTitle('Pedido confirmado');

  // Se lee una sola vez al montar (la orden ya no cambia).
  const [order] = useState(readLastOrder);

  // Lleva el foco al encabezado para anunciar el cambio a lectores de pantalla.
  useEffect(() => {
    document.getElementById('confirm-title')?.focus();
  }, []);

  if (!order) {
    return (
      <section
        className="section"
        style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', textAlign: 'center' }}
      >
        <div className="container container--narrow">
          <span className="eyebrow">Confirmación</span>
          <h1>No encontramos tu pedido</h1>
          <p className="lead" style={{ margin: '1rem 0 2rem' }}>
            Es posible que ya se haya confirmado o que la sesión haya expirado.
          </p>
          <Button to="/catalogo" size="lg">
            Volver al catálogo
          </Button>
        </div>
      </section>
    );
  }

  const mensajeWa = `Hola, acabo de hacer el pedido ${order.orderId} en la web y quiero coordinar la entrega.`;

  return (
    <section
      className="confirm"
      style={{ paddingTop: 'calc(var(--nav-height) + 3rem)' }}
    >
      <div className="container container--narrow">
        <div className="confirm__check" aria-hidden="true">
          <IconCheck size={32} />
        </div>
        <span className="eyebrow">Pedido confirmado</span>
        <h1 id="confirm-title" tabIndex={-1}>
          {order.customer?.nombre?.trim()
            ? `Gracias, ${order.customer.nombre.split(' ')[0]}`
            : 'Gracias por tu pedido'}
        </h1>
        <p className="lead">
          Tu pedido <strong>{order.orderId}</strong> quedó registrado. Te
          enviamos una copia a <strong>{order.customer?.email}</strong>.
        </p>

        <div className="confirm__card">
          <div className="confirm__row">
            <span>Número de orden</span>
            <strong>{order.orderId}</strong>
          </div>
          <div className="confirm__row">
            <span>Subtotal material</span>
            <strong>{formatMXN(order.subtotal)}</strong>
          </div>
          <ul className="confirm__items">
            {order.items?.map((it) => (
              <li key={it.lineId}>
                <span>
                  {it.name} · {it.m2} m² · {it.format}
                </span>
                <span>{formatMXN(it.pricePerM2 * it.m2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="confirm__next">
          <h2>¿Qué sigue?</h2>
          <ol className="confirm__steps">
            <li>
              <strong>Te contactamos.</strong> Un asesor confirma disponibilidad
              del lote y la entrega a {order.customer?.ciudad},{' '}
              {order.customer?.estado}.
            </li>
            <li>
              <strong>Cierras el envío.</strong> Acordamos la fecha de despacho
              desde Tepexi.
            </li>
            <li>
              <strong>Recibes tu laja.</strong> Embalada y lista para instalar.
            </li>
          </ol>
        </div>

        <div className="confirm__cta">
          <Button href={BUSINESS.whatsappLink(mensajeWa)} size="lg">
            Coordinar entrega por WhatsApp
          </Button>
          <Button to="/catalogo" variant="secondary" size="lg">
            Seguir comprando
          </Button>
        </div>

        <p className="confirm__note">
          Este es un pedido de prueba: no se realizó ningún cargo real.
        </p>
      </div>
    </section>
  );
}
