/*
 * App.jsx — Raíz de la aplicación: layout + enrutado.
 * Propósito: envolver la app en el proveedor del carrito, fijar el layout común
 * (Navbar + main + Footer + WhatsApp FAB) y declarar todas las rutas. Incluye
 * un helper que regresa el scroll al inicio en cada cambio de página.
 */

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { CartProvider } from './context/CartContext.jsx';
import { useReveal } from './lib/useReveal.js';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFab from './components/WhatsAppFab.jsx';

import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Producto from './pages/Producto.jsx';
import Carrito from './pages/Carrito.jsx';
import Checkout from './pages/Checkout.jsx';
import Confirmacion from './pages/Confirmacion.jsx';
import Cotizacion from './pages/Cotizacion.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Contacto from './pages/Contacto.jsx';
import NotFound from './pages/NotFound.jsx';

/** Devuelve el scroll al tope cuando cambia la ruta. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useReveal();
  return (
    <CartProvider>
      <ScrollToTop />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:slug" element={<Producto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/cotizacion" element={<Cotizacion />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </CartProvider>
  );
}
