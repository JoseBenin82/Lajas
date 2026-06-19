/*
 * Navbar.jsx — Barra de navegación superior, fija y adaptable al scroll.
 * Propósito: ofrecer navegación principal entre páginas, marca (wordmark) y
 * accesos a carrito y cotización. Arranca transparente sobre el hero y se
 * vuelve sólida al hacer scroll; incluye menú móvil accesible. El contador del
 * carrito se conecta en el Paso 3 vía CartContext.
 */

import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/cart-store.js';
import { BUSINESS } from '../data/business.js';
import Button from './Button.jsx';
import './Navbar.css';

/** Enlaces principales del sitio. */
const LINKS = [
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/cotizacion', label: 'Cotizar' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { pathname } = useLocation();
  // El home arranca con el hero oscuro a pantalla completa: mientras no haya
  // scroll ni menú abierto, el navbar va en claro para leerse sobre el video.
  const overHero = pathname === '/' && !scrolled && !open;

  // Detecta scroll para alternar el fondo sólido.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del body cuando el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`nav ${scrolled || open ? 'nav--solid' : ''} ${
        overHero ? 'nav--over-hero' : ''
      }`}
    >
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true" />
          <span className="nav__name">
            Laja <strong>Tepexi</strong>
          </span>
        </Link>

        <nav
          className={`nav__menu ${open ? 'is-open' : ''}`}
          aria-label="Navegación principal"
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `nav__link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              <span>{l.label}</span>
            </NavLink>
          ))}

          {/* Pie del menú: solo visible en móvil (oculto en escritorio por CSS).
              Llena el panel con un CTA principal y contacto directo para que el
              menú se sienta terminado y no una lista suelta. */}
          <div className="nav__menu-footer">
            <Button to="/cotizacion" full size="lg" onClick={() => setOpen(false)}>
              Cotizar por volumen
            </Button>
            <a
              className="nav__menu-contact"
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.07-1.33A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .79.8-2.93-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.13c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
                />
              </svg>
              WhatsApp · {BUSINESS.whatsappDisplay}
            </a>
          </div>
        </nav>

        <div className="nav__actions">
          <Link
            to="/carrito"
            className="nav__cart"
            aria-label={`Carrito, ${count} artículo(s)`}
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 8H6"
              />
              <circle cx="9.5" cy="20.5" r="1.4" fill="currentColor" />
              <circle cx="18" cy="20.5" r="1.4" fill="currentColor" />
            </svg>
            {count > 0 && <span className="nav__badge">{count}</span>}
          </Link>

          <button
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
