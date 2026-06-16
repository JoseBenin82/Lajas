/*
 * Checkout.jsx — Checkout agnóstico de pasarela.
 * Propósito: capturar datos de cliente/envío, mostrar el resumen del pedido y
 * ejecutar el cobro a través de la interfaz de pagos desacoplada. Hoy solo el
 * "Pago de prueba" (mock) está activo; Mercado Pago y Stripe se muestran como
 * próximamente. Incluye mención de Meses Sin Intereses (MSI). Al aprobarse el
 * pago, guarda la orden, vacía el carrito y lleva a la confirmación.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../components/Button.jsx';
import { useCart } from '../context/cart-store.js';
import { formatMXN } from '../lib/money.js';
import { PROVIDERS, ACTIVE_PROVIDERS, createPayment } from '../payments/index.js';
import { LAST_ORDER_KEY } from '../lib/order-store.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import './Checkout.css';

/** Estado inicial del formulario de cliente/envío. */
const FORM_INICIAL = {
  nombre: '',
  email: '',
  telefono: '',
  calle: '',
  ciudad: '',
  estado: '',
  cp: '',
  notas: '',
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  useDocumentTitle('Finalizar compra');

  const [form, setForm] = useState(FORM_INICIAL);
  const [provider, setProvider] = useState(ACTIVE_PROVIDERS[0]?.id ?? 'mock');
  const [msi, setMsi] = useState('1'); // 1 = sin meses
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');

  // Carrito vacío: nada que pagar.
  if (items.length === 0) {
    return (
      <section
        className="section"
        style={{ paddingTop: 'calc(var(--nav-height) + 3rem)' }}
      >
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow">Checkout</span>
          <h1>No hay nada que pagar</h1>
          <p className="lead" style={{ margin: '1rem 0 2rem' }}>
            Tu carrito está vacío. Agrega lajas antes de continuar.
          </p>
          <Button to="/catalogo" size="lg">
            Ver catálogo
          </Button>
        </div>
      </section>
    );
  }

  const setField = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const formValido =
    form.nombre.trim() &&
    /.+@.+\..+/.test(form.email) &&
    form.telefono.trim() &&
    form.calle.trim() &&
    form.ciudad.trim() &&
    form.estado.trim() &&
    form.cp.trim();

  async function handlePagar(e) {
    e.preventDefault();
    setError('');
    if (!formValido) {
      setError('Completa los datos de contacto y envío para continuar.');
      return;
    }

    setProcesando(true);
    try {
      const order = {
        items,
        subtotal,
        customer: { ...form },
        msi: Number(msi),
      };
      const result = await createPayment(provider, order);

      // Persiste la orden para la página de confirmación y vacía el carrito.
      const fullOrder = { ...order, ...result };
      sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(fullOrder));
      clear();
      navigate('/confirmacion');
    } catch (err) {
      setError(err.message || 'No se pudo procesar el pago. Intenta de nuevo.');
      setProcesando(false);
    }
  }

  return (
    <section
      className="checkout"
      style={{ paddingTop: 'calc(var(--nav-height) + 2.5rem)' }}
    >
      <div className="container">
        <span className="eyebrow">Checkout</span>
        <h1>Finalizar compra</h1>

        <form className="checkout__layout" onSubmit={handlePagar} noValidate>
          {/* ---- Columna izquierda: datos + pago ---- */}
          <div className="checkout__main">
            <fieldset className="checkout__card">
              <legend>Datos de contacto</legend>
              <div className="checkout__grid2">
                <label className="field">
                  <span>Nombre completo *</span>
                  <input name="nombre" value={form.nombre} onChange={setField} required />
                </label>
                <label className="field">
                  <span>Correo electrónico *</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={setField}
                    required
                  />
                </label>
                <label className="field">
                  <span>Teléfono / WhatsApp *</span>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={setField}
                    required
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="checkout__card">
              <legend>Dirección de envío</legend>
              <div className="checkout__grid2">
                <label className="field field--full">
                  <span>Calle y número *</span>
                  <input name="calle" value={form.calle} onChange={setField} required />
                </label>
                <label className="field">
                  <span>Ciudad *</span>
                  <input name="ciudad" value={form.ciudad} onChange={setField} required />
                </label>
                <label className="field">
                  <span>Estado *</span>
                  <input name="estado" value={form.estado} onChange={setField} required />
                </label>
                <label className="field">
                  <span>Código postal *</span>
                  <input name="cp" value={form.cp} onChange={setField} required />
                </label>
                <label className="field field--full">
                  <span>Notas para la entrega (opcional)</span>
                  <textarea
                    name="notas"
                    rows="2"
                    value={form.notas}
                    onChange={setField}
                  />
                </label>
              </div>
              <p className="checkout__fletehint">
                El flete se calcula y confirma con base en esta dirección antes
                del despacho.
              </p>
            </fieldset>

            <fieldset className="checkout__card">
              <legend>Método de pago</legend>
              <div className="checkout__providers">
                {PROVIDERS.map((p) => (
                  <label
                    key={p.id}
                    className={`checkout__provider ${
                      provider === p.id ? 'is-on' : ''
                    } ${!p.enabled ? 'is-disabled' : ''}`}
                  >
                    <input
                      type="radio"
                      name="provider"
                      value={p.id}
                      checked={provider === p.id}
                      disabled={!p.enabled}
                      onChange={() => setProvider(p.id)}
                    />
                    <span className="checkout__providername">{p.label}</span>
                    {!p.enabled && (
                      <span className="checkout__soon">Próximamente</span>
                    )}
                  </label>
                ))}
              </div>

              <label className="field" style={{ marginTop: 'var(--space-4)' }}>
                <span>Meses Sin Intereses (MSI)</span>
                <select value={msi} onChange={(e) => setMsi(e.target.value)}>
                  <option value="1">Pago en una sola exhibición</option>
                  <option value="3">3 MSI</option>
                  <option value="6">6 MSI</option>
                  <option value="12">12 MSI</option>
                </select>
              </label>
              <p className="checkout__msinote">
                Los MSI con tarjetas participantes se habilitan al conectar la
                pasarela real. En el pago de prueba son solo referenciales.
              </p>
            </fieldset>

            {error && <p className="checkout__error">{error}</p>}
          </div>

          {/* ---- Columna derecha: resumen ---- */}
          <aside className="checkout__summary" aria-label="Resumen del pedido">
            <h2>Tu pedido</h2>
            <ul className="checkout__items">
              {items.map((it) => (
                <li key={it.lineId}>
                  <span className="checkout__itemname">
                    {it.name}
                    <small>
                      {' '}
                      · {it.m2} m² · {it.format}
                    </small>
                  </span>
                  <span>{formatMXN(it.pricePerM2 * it.m2)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout__sumrow">
              <span>Subtotal material</span>
              <strong>{formatMXN(subtotal)}</strong>
            </div>
            <div className="checkout__sumrow checkout__sumrow--muted">
              <span>Flete</span>
              <span>Se cotiza por separado</span>
            </div>

            <Button type="submit" size="lg" full disabled={procesando}>
              {procesando ? 'Procesando…' : `Pagar (prueba) ${formatMXN(subtotal)}`}
            </Button>
            <p className="checkout__safe">
              🔒 Pago simulado. No se realizará ningún cargo real.
            </p>
            <Link to="/carrito" className="checkout__back">
              ← Volver al carrito
            </Link>
          </aside>
        </form>
      </div>
    </section>
  );
}
