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
              {l.label}
            </NavLink>
          ))}
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
