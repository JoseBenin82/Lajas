/*
 * Cotizacion.jsx — Solicitud de cotización por volumen.
 * Propósito: capturar pedidos grandes de proyecto/obra. Formulario
 * (nombre, contacto, proyecto, m², ubicación/CP, mensaje) con envío simulado y
 * CTA de WhatsApp con el resumen prellenado. Acepta ?producto= y ?m2= para
 * precargar desde la ficha de producto.
 */

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Button from '../components/Button.jsx';
import { IconCheck } from '../components/Icons.jsx';
import { BUSINESS } from '../data/business.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import './Formularios.css';

export default function Cotizacion() {
  useDocumentTitle(
    'Cotizar por volumen',
    'Cotiza tu pedido de laja por volumen. Ideal para proyectos grandes con despacho a obra.'
  );

  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    producto: searchParams.get('producto') || '',
    m2: searchParams.get('m2') || '',
    ciudad: '',
    cp: '',
    mensaje: '',
  });
  const [touched, setTouched] = useState({});
  const [enviado, setEnviado] = useState(false);

  const setField = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur = (e) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  const emailValido = /.+@.+\..+/.test(form.email);
  const hayContacto = form.telefono.trim() || emailValido;

  // Errores por campo (cadena vacía = válido). El medio de contacto es
  // cruzado (teléfono O correo): su aviso cuelga del campo teléfono.
  const errors = {
    nombre: form.nombre.trim() ? '' : 'Escribe tu nombre.',
    ciudad: form.ciudad.trim() ? '' : 'Indica la ciudad de destino.',
    email: form.email.trim() && !emailValido ? 'Revisa el formato del correo.' : '',
    telefono: hayContacto
      ? ''
      : 'Déjanos un teléfono o un correo para responderte.',
  };
  const valido =
    !errors.nombre && !errors.ciudad && !errors.email && hayContacto;
  const showError = (name) => touched[name] && errors[name];

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ nombre: true, ciudad: true, email: true, telefono: true });
    if (!valido) return;
    // Envío simulado (sin backend). TODO: conectar a un endpoint/CRM real.
    setEnviado(true);
  }

  // Mensaje de WhatsApp con el resumen de la cotización.
  const mensajeWa = [
    'Hola, quiero una cotización por volumen de laja.',
    form.producto && `Producto: ${form.producto}`,
    form.m2 && `Metros: ${form.m2} m²`,
    form.ciudad && `Destino: ${form.ciudad}${form.cp ? ` (CP ${form.cp})` : ''}`,
    form.nombre && `Soy ${form.nombre}.`,
  ]
    .filter(Boolean)
    .join(' ');

  if (enviado) {
    return (
      <section
        className="section"
        style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', textAlign: 'center' }}
      >
        <div className="container container--narrow">
          <div className="form__check" aria-hidden="true">
            <IconCheck size={28} />
          </div>
          <span className="eyebrow">Cotización enviada</span>
          <h1>Recibimos tu solicitud</h1>
          <p className="lead" style={{ margin: '1rem auto 2rem', maxWidth: '46ch' }}>
            Un asesor revisará tu proyecto y te enviará tu cotización. Para
            agilizarlo, también puedes escribirnos por WhatsApp con tu resumen ya
            listo.
          </p>
          <div className="form__actions form__actions--center">
            <Button href={BUSINESS.whatsappLink(mensajeWa)} size="lg">
              Enviar por WhatsApp
            </Button>
            <Button to="/catalogo" size="lg" variant="secondary">
              Seguir explorando
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="formpage"
      style={{ paddingTop: 'calc(var(--nav-height) + 2.5rem)' }}
    >
      <div className="container form__layout">
        <div className="form__intro">
          <span className="eyebrow">Cotización</span>
          <h1>Cotiza por volumen</h1>
          <p className="lead">
            ¿Pedido grande o proyecto a obra? Cuéntanos qué necesitas y a dónde va.
            Preparamos una cotización por volumen con el mejor precio para tu
            proyecto.
          </p>
          <ul className="form__perks">
            <li>Ideal para proyectos desde 20 m².</li>
            <li>Precio por volumen cerrado.</li>
            <li>Respuesta de un asesor real.</li>
          </ul>
          <p className="form__alt">
            ¿Prefieres comprar directo? Revisa el{' '}
            <Link to="/catalogo">catálogo</Link> y paga en línea.
          </p>
        </div>

        <form className="form__card" onSubmit={handleSubmit} noValidate>
          <div className="form__grid2">
            <label className={`field${showError('nombre') ? ' field--error' : ''}`}>
              <span>Nombre *</span>
              <input
                name="nombre"
                value={form.nombre}
                onChange={setField}
                onBlur={onBlur}
                aria-invalid={showError('nombre') ? 'true' : undefined}
                aria-describedby={showError('nombre') ? 'cot-nombre' : undefined}
              />
              {showError('nombre') && (
                <span className="field__error" id="cot-nombre">
                  {errors.nombre}
                </span>
              )}
            </label>
            <label className={`field${showError('telefono') ? ' field--error' : ''}`}>
              <span>Teléfono / WhatsApp</span>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={setField}
                onBlur={onBlur}
                aria-invalid={showError('telefono') ? 'true' : undefined}
                aria-describedby={showError('telefono') ? 'cot-telefono' : undefined}
              />
              {showError('telefono') && (
                <span className="field__error" id="cot-telefono">
                  {errors.telefono}
                </span>
              )}
            </label>
            <label className={`field${showError('email') ? ' field--error' : ''}`}>
              <span>Correo</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={setField}
                onBlur={onBlur}
                aria-invalid={showError('email') ? 'true' : undefined}
                aria-describedby={showError('email') ? 'cot-email' : undefined}
              />
              {showError('email') && (
                <span className="field__error" id="cot-email">
                  {errors.email}
                </span>
              )}
            </label>
            <label className="field">
              <span>Laja de interés</span>
              <input
                name="producto"
                value={form.producto}
                onChange={setField}
                placeholder="Ej. Galarza Blanca"
              />
            </label>
            <label className="field">
              <span>Metros cuadrados aprox.</span>
              <input
                type="number"
                name="m2"
                min="0"
                step="1"
                value={form.m2}
                onChange={setField}
                placeholder="Ej. 45"
              />
            </label>
            <label className={`field${showError('ciudad') ? ' field--error' : ''}`}>
              <span>Ciudad / municipio destino *</span>
              <input
                name="ciudad"
                value={form.ciudad}
                onChange={setField}
                onBlur={onBlur}
                aria-invalid={showError('ciudad') ? 'true' : undefined}
                aria-describedby={showError('ciudad') ? 'cot-ciudad' : undefined}
              />
              {showError('ciudad') && (
                <span className="field__error" id="cot-ciudad">
                  {errors.ciudad}
                </span>
              )}
            </label>
            <label className="field">
              <span>Código postal</span>
              <input name="cp" value={form.cp} onChange={setField} />
            </label>
            <label className="field field--full">
              <span>Cuéntanos sobre tu proyecto</span>
              <textarea
                name="mensaje"
                rows="3"
                value={form.mensaje}
                onChange={setField}
                placeholder="Tipo de obra, fechas, dudas…"
              />
            </label>
          </div>

          <p className="form__hint">* Campos obligatorios.</p>
          <div className="form__actions">
            <Button type="submit" size="lg">
              Solicitar cotización
            </Button>
            <Button href={BUSINESS.whatsappLink(mensajeWa)} size="lg" variant="secondary">
              Cotizar por WhatsApp
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
