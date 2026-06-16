# Laja Tepexi — Web de venta de laja natural

Sitio web corporativo y tienda para **laja natural de Tepexi de Rodríguez, Puebla**.
Modelo de venta **híbrido**: productos estándar con pago en línea + flujo de
**cotización de flete/volumen** para pedidos grandes. Dirección visual: *editorial
premium tierra* (paleta piedra/arena/terracota, tipografías Fraunces + Manrope).

> Estado: **solo frontend** con datos mock y checkout simulado. La integración real
> de pasarela y backend es un follow-up (ver más abajo).

## Stack

- **Vite + React 19**
- **react-router-dom** (navegación multipágina)
- **Carrito**: React Context + `localStorage` (sin librerías externas)
- **Estilos**: sistema de diseño propio en CSS (design tokens + CSS por componente).
  Sin Tailwind. Fuentes Google: Fraunces (display) + Manrope (sans).
- **Pagos**: módulo desacoplado `src/payments/` con interfaz agnóstica y `mockProvider`.

## Cómo correrlo

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción a /dist
npm run preview  # sirve el build
npm run lint     # ESLint
```

## Recorrido de prueba (end-to-end)

Home → Catálogo (filtra por color/uso/precio) → Producto (calcula m² con merma →
**Agregar al carrito**) → Carrito → Checkout (datos + **Pagar (prueba)**) →
Confirmación. Flujo alterno: Producto → **Cotizar flete/volumen** → Cotización.

## Estructura

```
src/
  styles/      tokens.css (paleta/tipografía/espaciado) + base.css (reset/utilidades)
  data/        products.js (13 lajas reales), testimonials.js, faqs.js, business.js
  context/     CartContext.jsx (+ cart-store.js: contexto/hook)
  payments/    index.js (interfaz PaymentProvider) + mockProvider.js (pago simulado)
  lib/         money.js, coverage.js (m²+merma), order-store.js, useDocumentTitle.js
  components/  Navbar, Footer, Button, Badge, ProductCard, Filters, StoneSwatch,
               M2Calculator, Hero, Section, Testimonials, FAQ, WhatsAppFab
  pages/       Home, Catalogo, Producto, Carrito, Checkout, Confirmacion,
               Cotizacion, Nosotros, Contacto, NotFound
```

## Decisiones de diseño

- **Calculadora de m² con merma** como pieza UX central: el comprador piensa en
  *área a cubrir*, no en piezas. Vive en `lib/coverage.js` + `M2Calculator`.
- **El flete se cotiza aparte** (depende de la distancia a cantera): se comunica
  en producto, carrito, checkout y confirmación.
- **Pasarela agnóstica**: el checkout solo conoce la interfaz de `payments/`. Hoy
  cobra el `mockProvider`; Mercado Pago y Stripe aparecen como "próximamente".
- **Imágenes**: cada laja usa una **fotografía real de piedra natural** (libre de
  licencia, en `public/lajas/<id>.jpg`, ver `CREDITOS.md`), emparejada por color.
  El componente `StoneSwatch` muestra la foto con `object-fit: cover` y **cae al
  swatch CSS** si la imagen falla. Son fotos representativas hasta tener
  fotografía propia del producto.

### Benchmark visual (refero.design)

La dirección "editorial premium tierra" se calibró contra tres design systems de
referencia: **monopo saigon** (restraint editorial, display whisper-weight),
**Apple** (disciplina de un solo acento + elevación por contraste tonal, no
sombras + letter-spacing negativo escalado) y **Mercury** (display ligero como
autoridad). Decisiones adoptadas, conservando la paleta cálida:

- **Tipografía como lujo**: cuerpo a 17px / interlínea 1.55; display en peso
  300–400 (Fraunces) con `letter-spacing` negativo que se aprieta a mayor tamaño
  (tokens `--tracking-display/-heading/-tight`).
- **Elevación por tono, no por sombra**: sombras contenidas y reservadas a
  elementos que flotan (nav, FAB); las tarjetas usan borde + contraste.
- **Acento disciplinado**: la terracota se reserva para acciones primarias y
  señales clave; el ritmo de secciones (arena/blanco/piedra) crea los divisores.

## TODO — integración real (follow-ups)

- [ ] **Pasarela de pago real**: implementar un provider de **Mercado Pago** o
      **Stripe** en `src/payments/`. Requiere backend/serverless que cree la
      preferencia/PaymentIntent y reciba el webhook de confirmación. El front ya
      está desacoplado: basta añadir el provider y marcarlo `enabled`.
- [ ] **Backend / persistencia de órdenes** (hoy la orden vive en `sessionStorage`).
- [ ] **Conectar formularios** de Cotización y Contacto a un endpoint/CRM o servicio
      de correo (hoy son envío simulado).
- [ ] **Fotografía propia** de cantera y producto para reemplazar las fotos
      representativas de `public/lajas/`; optimizarlas (resize ~1280px + WebP/AVIF)
      para acelerar la carga (hoy las del hero pesan ~1 MB en conjunto).
- [ ] **Cálculo de flete por CP** real y, en su caso, panel de administración/inventario.
- [ ] **Imagen Open Graph** `/public/og.png` (1200×630) para compartir en redes.

## Datos por confirmar con el cliente

Centralizados en `src/data/business.js` (marcados como PLACEHOLDER):
nombre de marca definitivo, número real de **WhatsApp**, teléfono, correo,
dirección/RFC fiscal y **precios reales por tipo de laja** (`src/data/products.js`).
