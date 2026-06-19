/*
 * Home.jsx — Página de inicio.
 * Propósito: portada editorial y motor de conversión. Hila hero, propuesta de
 * valor, lajas destacadas, galería de usos, teaser de la calculadora de m²,
 * historia de Tepexi, testimonios, FAQ y un cierre con doble CTA.
 */

import { Link } from 'react-router-dom';

import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import ProductCard from '../components/ProductCard.jsx';
import StoneSwatch from '../components/StoneSwatch.jsx';
import M2Calculator from '../components/M2Calculator.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQ from '../components/FAQ.jsx';
import Button from '../components/Button.jsx';
import { FEATURED, PRODUCTS } from '../data/products.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import './Home.css';

/** Propuesta de valor (4 pilares). */
const PROPS = [
  {
    t: 'Directo de la cantera',
    d: 'Extraída en Tepexi de Rodríguez, Puebla. Sin intermediarios, piedra de origen.',
    icon: 'M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6',
  },
  {
    t: 'Se vende por m²',
    d: 'Pagas el área que necesitas. Calculadora de metraje con merma incluida.',
    icon: 'M4 4h16v16H4zM4 9h16M9 4v16',
  },
  {
    t: 'Asesoría de metraje',
    d: 'Te ayudamos a calcular cuánta laja comprar para no quedarte corto ni sobrar.',
    icon: 'M12 3v18M5 8l7-5 7 5M5 8v8l7 5 7-5V8',
  },
  {
    t: 'Despacho nacional',
    d: 'Enviamos a toda la república desde Tepexi de Rodríguez, Puebla.',
    icon: 'M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 19a2 2 0 104 0M16 19a2 2 0 104 0',
  },
];

/**
 * Galería de inspiración: mapeo CURADO uso → laja, no automático.
 * Cada celda muestra una laja realmente destinada a ese uso (coherencia con la
 * etiqueta) y se priorizan las fotos que son tomas de contexto/instalación
 * (galarza en fachada, oro viejo en muro, canela en piso…). El orden coloca la
 * toma más potente como pieza grande del mosaico (índice 0 = feature).
 */
const INSPIRACION = [
  { uso: 'Fachadas', lajaId: 'galarza' },
  { uso: 'Muros decorativos', lajaId: 'oro-viejo' },
  { uso: 'Chimeneas', lajaId: 'roja-tlayua' },
  { uso: 'Pisos', lajaId: 'canela' },
  { uso: 'Terrazas', lajaId: 'verde-pistache' },
  { uso: 'Andadores', lajaId: 'pizarra-negra' },
];

/** Busca una laja por su id (para el mapeo curado de inspiración). */
function lajaPorId(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export default function Home() {
  useDocumentTitle(
    'Laja natural de Tepexi de Rodríguez, Puebla',
    'Laja natural de Tepexi de Rodríguez para fachadas, pisos y muros. Venta por m², calculadora de cobertura y despacho nacional.'
  );

  return (
    <>
      <Hero />

      {/* Propuesta de valor */}
      <section className="section section--props">
        <div className="container">
          <ul className="props">
            {PROPS.map((p, i) => (
              <li
                key={p.t}
                className="prop"
                data-reveal
                style={{ '--reveal-delay': `${i * 80}ms` }}
              >
                <svg className="prop__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d={p.icon}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="prop__t">{p.t}</h3>
                <p className="prop__d">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lajas destacadas */}
      <Section
        eyebrow="Selección"
        title="Lajas destacadas"
        subtitle="Los tonos que más eligen nuestros clientes para fachadas, pisos y muros de acento."
      >
        <div className="grid grid--auto">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="home__more">
          <Button to="/catalogo" variant="ghost">
            Ver las {PRODUCTS.length} lajas →
          </Button>
        </div>
      </Section>

      {/* Galería de usos */}
      <Section
        variant="soft"
        eyebrow="Inspiración"
        title="Para cada rincón de tu proyecto"
        subtitle="De fachadas a andadores: la laja natural se adapta a interiores y exteriores."
      >
        <div className="usos">
          {INSPIRACION.map(({ uso, lajaId }, i) => {
            const laja = lajaPorId(lajaId);
            // Mosaico bento: el primero manda como pieza grande (2×2) y otro
            // rompe el ritmo a lo ancho; el resto son celdas simples.
            const modifier =
              i === 0 ? ' uso--feature' : i === 5 ? ' uso--wide' : '';
            return (
              <Link
                key={uso}
                to={`/catalogo?uso=${encodeURIComponent(uso)}`}
                className={`uso${modifier}`}
                data-reveal
                style={{ '--reveal-delay': `${i * 70}ms` }}
              >
                {laja && (
                  <StoneSwatch
                    swatch={laja.swatch}
                    image={laja.image}
                    name={uso}
                    size="card"
                  />
                )}
                <span className="uso__label">{uso}</span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Teaser calculadora */}
      <section className="section">
        <div className="container home__calc">
          <div className="home__calctext" data-reveal="left">
            <span className="eyebrow">Calcula sin sorpresas</span>
            <h2>¿Cuánta laja necesito?</h2>
            <p className="lead">
              Ingresa las medidas de tu muro o piso y te decimos los m² a comprar
              —con merma incluida— y un estimado de material. Pruébalo aquí con un
              precio promedio.
            </p>
            <ul className="home__calcbullets">
              <li>Convierte largo × ancho a metros cuadrados.</li>
              <li>Suma la merma recomendada (10%).</li>
              <li>Te da el estimado de material al instante.</li>
            </ul>
          </div>
          <div className="home__calcbox" data-reveal="right">
            <M2Calculator pricePerM2={200} />
          </div>
        </div>
      </section>

      {/* Historia de Tepexi */}
      <Section variant="ink">
        <div className="home__historia">
          <div className="home__historiatext" data-reveal="left">
            <span className="eyebrow">Nuestro origen</span>
            <h2>Piedra de la Mixteca poblana</h2>
            <p className="lead">
              Tepexi de Rodríguez es tierra de canteras. Durante generaciones, de
              sus cerros se ha extraído laja: una piedra sedimentaria que se
              separa en capas finas, ideal para revestir. Cada pieza guarda el
              color y la veta del lugar donde nació.
            </p>
            <Button to="/nosotros" variant="primary">
              Conoce la historia
            </Button>
          </div>
          <div className="home__historiamedia" aria-hidden="true" data-reveal="right">
            {PRODUCTS.slice(0, 3).map((p) => (
              <StoneSwatch
                key={p.id}
                swatch={p.swatch}
                image={p.image}
                name={p.name}
                size="card"
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonios */}
      <Section
        eyebrow="Clientes"
        title="Proyectos que ya cambiaron de piel"
        align="center"
      >
        <Testimonials />
      </Section>

      {/* FAQ */}
      <Section
        variant="soft"
        eyebrow="Dudas frecuentes"
        title="Todo sobre comprar laja"
        align="center"
      >
        <FAQ />
      </Section>

      {/* Cierre CTA */}
      <section className="home__closing">
        <div className="container home__closinginner">
          <h2>¿Empezamos tu proyecto?</h2>
          <p className="lead">
            Elige tu laja y paga en línea, o pide una cotización por volumen para pedidos grandes.
          </p>
          <div className="home__closingcta">
            <Button to="/catalogo" size="lg">
              Ver catálogo
            </Button>
            <Button to="/cotizacion" size="lg" variant="secondary">
              Cotizar por volumen
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
