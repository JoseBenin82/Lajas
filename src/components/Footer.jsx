/*
 * Footer.jsx — Pie de página corporativo.
 * Propósito: cierre de marca con navegación secundaria, datos de contacto,
 * usos populares y aviso legal. Los datos (WhatsApp, teléfono, dirección) son
 * provisionales y están centralizados para sustituir cuando el cliente confirme.
 */

import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/business.js';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            Laja <strong>Tepexi</strong>
          </Link>
          <p className="footer__tagline">
            Laja natural extraída en Tepexi de Rodríguez, Puebla. Piedra real
            para fachadas, pisos y muros con carácter.
          </p>
          <p className="footer__origin">Origen · Tepexi de Rodríguez, México</p>
        </div>

        <nav className="footer__col" aria-label="Explorar">
          <h4>Explorar</h4>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/cotizacion">Cotizar por volumen</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>

        <nav className="footer__col" aria-label="Usos">
          <h4>Usos</h4>
          <Link to="/catalogo?uso=Fachadas">Fachadas</Link>
          <Link to="/catalogo?uso=Pisos">Pisos</Link>
          <Link to="/catalogo?uso=Muros%20decorativos">Muros decorativos</Link>
          <Link to="/catalogo?uso=Albercas">Albercas</Link>
        </nav>

        <div className="footer__col">
          <h4>Contacto</h4>
          <a href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp {BUSINESS.whatsappDisplay}
          </a>
          <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          <span className="footer__muted">{BUSINESS.address}</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>
          © {year} Laja Tepexi · Hecho con piedra de la Mixteca poblana.
        </span>
        <span className="footer__muted">
          Los tonos naturales pueden variar entre lotes.
        </span>
      </div>
    </footer>
  );
}
