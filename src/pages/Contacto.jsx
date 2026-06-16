/*
 * Contacto.jsx — Página de contacto.
 * Propósito: ofrecer múltiples vías de contacto (formulario simulado, WhatsApp,
 * teléfono, correo) más la ubicación en un mapa embebido. El formulario hace un
 * envío simulado; los datos de negocio vienen de data/business.js.
 */

import { useState } from 'react';

import Button from '../components/Button.jsx';
import { IconCheck } from '../components/Icons.jsx';
import { BUSINESS } from '../data/business.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import './Formularios.css';
import './Contacto.css';

export default function Contacto() {
  useDocumentTitle(
    'Contacto',
    'Contáctanos por WhatsApp, teléfono o correo para comprar laja natural de Tepexi. Atención y asesoría de metraje.'
  );

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });
  const [touched, setTouched] = useState({});
  const [enviado, setEnviado] = useState(false);

  const setField = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  // Marca el campo como "tocado" al salir de él para mostrar su error si aplica.
  const onBlur = (e) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  // Errores por campo (cadena vacía = válido).
  const errors = {
    nombre: form.nombre.trim() ? '' : 'Escribe tu nombre.',
    email: !form.email.trim()
      ? 'Escribe tu correo.'
      : /.+@.+\..+/.test(form.email)
      ? ''
      : 'Revisa el formato del correo.',
    mensaje: form.mensaje.trim() ? '' : 'Cuéntanos brevemente tu mensaje.',
  };
  const valido = !errors.nombre && !errors.email && !errors.mensaje;
  // Muestra el error solo si el campo fue tocado (o ya se intentó enviar).
  const showError = (name) => touched[name] && errors[name];

  function handleSubmit(e) {
    e.preventDefault();
    // Al enviar, marca todo como tocado para revelar los errores pendientes.
    setTouched({ nombre: true, email: true, mensaje: true });
    if (!valido) return;
    // Envío simulado. TODO: conectar a un endpoint/CRM o servicio de correo.
    setEnviado(true);
  }

  return (
    <section
      className="formpage"
      style={{ paddingTop: 'calc(var(--nav-height) + 2.5rem)' }}
    >
      <div className="container">
        <div className="contacto__head">
          <span className="eyebrow">Contacto</span>
          <h1>Hablemos de tu proyecto</h1>
          <p className="lead" style={{ maxWidth: '56ch' }}>
            ¿Dudas sobre tonos, formatos o envío? Escríbenos por el medio que
            prefieras. Respondemos rápido.
          </p>
        </div>

        <div className="contacto__layout">
          {/* Vías de contacto */}
          <aside className="contacto__info">
            <a
              className="contacto__via contacto__via--wa"
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contacto__vialabel">WhatsApp</span>
              <span className="contacto__viavalue">{BUSINESS.whatsappDisplay}</span>
              <span className="contacto__viahint">La vía más rápida →</span>
            </a>
            <a className="contacto__via" href={`tel:${BUSINESS.phone}`}>
              <span className="contacto__vialabel">Teléfono</span>
              <span className="contacto__viavalue">{BUSINESS.phoneDisplay}</span>
            </a>
            <a className="contacto__via" href={`mailto:${BUSINESS.email}`}>
              <span className="contacto__vialabel">Correo</span>
              <span className="contacto__viavalue">{BUSINESS.email}</span>
            </a>
            <div className="contacto__via">
              <span className="contacto__vialabel">Cantera / oficina</span>
              <span className="contacto__viavalue">{BUSINESS.address}</span>
            </div>
          </aside>

          {/* Formulario o confirmación */}
          <div className="contacto__formwrap">
            {enviado ? (
              <div className="contacto__sent">
                <div className="form__check" aria-hidden="true">
                  <IconCheck size={28} />
                </div>
                <h2>Mensaje enviado</h2>
                <p className="lead">
                  Gracias, {form.nombre.split(' ')[0]}. Te responderemos al correo
                  que nos dejaste. Si es urgente, escríbenos por WhatsApp.
                </p>
                <Button href={BUSINESS.whatsappUrl} size="lg">
                  Abrir WhatsApp
                </Button>
              </div>
            ) : (
              <form className="form__card" onSubmit={handleSubmit} noValidate>
                <div className="form__grid2">
                  <label
                    className={`field${showError('nombre') ? ' field--error' : ''}`}
                  >
                    <span>Nombre *</span>
                    <input
                      name="nombre"
                      value={form.nombre}
                      onChange={setField}
                      onBlur={onBlur}
                      aria-invalid={showError('nombre') ? 'true' : undefined}
                      aria-describedby={showError('nombre') ? 'err-nombre' : undefined}
                    />
                    {showError('nombre') && (
                      <span className="field__error" id="err-nombre">
                        {errors.nombre}
                      </span>
                    )}
                  </label>
                  <label
                    className={`field${showError('email') ? ' field--error' : ''}`}
                  >
                    <span>Correo *</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={setField}
                      onBlur={onBlur}
                      aria-invalid={showError('email') ? 'true' : undefined}
                      aria-describedby={showError('email') ? 'err-email' : undefined}
                    />
                    {showError('email') && (
                      <span className="field__error" id="err-email">
                        {errors.email}
                      </span>
                    )}
                  </label>
                  <label className="field field--full">
                    <span>Teléfono (opcional)</span>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={setField}
                    />
                  </label>
                  <label
                    className={`field field--full${
                      showError('mensaje') ? ' field--error' : ''
                    }`}
                  >
                    <span>Mensaje *</span>
                    <textarea
                      name="mensaje"
                      rows="4"
                      value={form.mensaje}
                      onChange={setField}
                      onBlur={onBlur}
                      aria-invalid={showError('mensaje') ? 'true' : undefined}
                      aria-describedby={
                        showError('mensaje') ? 'err-mensaje' : undefined
                      }
                    />
                    {showError('mensaje') && (
                      <span className="field__error" id="err-mensaje">
                        {errors.mensaje}
                      </span>
                    )}
                  </label>
                </div>
                <p className="form__hint">* Campos obligatorios.</p>
                <div className="form__actions">
                  <Button type="submit" size="lg">
                    Enviar mensaje
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Mapa */}
        <div className="contacto__mapa">
          <iframe
            title="Ubicación: Tepexi de Rodríguez, Puebla"
            src="https://www.google.com/maps?q=Tepexi%20de%20Rodr%C3%ADguez%2C%20Puebla&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
