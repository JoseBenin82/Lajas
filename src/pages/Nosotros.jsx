/*
 * Nosotros.jsx — Historia, proceso y valores.
 * Propósito: construir confianza contando el origen en Tepexi de Rodríguez, el
 * proceso de extracción de la laja, los valores de la marca y la garantía.
 * Cierra con un CTA al catálogo.
 */

import Section from '../components/Section.jsx';
import StoneSwatch from '../components/StoneSwatch.jsx';
import Button from '../components/Button.jsx';
import { PRODUCTS } from '../data/products.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import './Nosotros.css';

/** Pasos del proceso de extracción/preparación. */
const PROCESO = [
  {
    t: 'Extracción',
    d: 'Se identifican los mantos de laja en la cantera y se desprenden los bloques siguiendo las vetas naturales de la piedra.',
  },
  {
    t: 'Selección',
    d: 'Cada pieza se revisa por color, espesor y sanidad. La laja natural varía, y ese carácter es parte de su valor.',
  },
  {
    t: 'Corte y formato',
    d: 'Se preparan los formatos: cintilla de 5 y 10 cm o pieza irregular, en los espesores que pide cada proyecto.',
  },
  {
    t: 'Despacho',
    d: 'Se embala y se despacha a obra. El flete se cotiza según la distancia desde Tepexi y el volumen del pedido.',
  },
];

/** Valores de la marca. */
const VALORES = [
  { t: 'Origen real', d: 'Piedra de Tepexi, directo de cantera. Sin reventa ni etiquetas prestadas.' },
  { t: 'Precio honesto', d: 'Cobramos por m² de material; el flete se cotiza claro y por separado.' },
  { t: 'Asesoría', d: 'Te ayudamos a calcular metros y merma para que compres lo justo.' },
  { t: 'Respeto al material', d: 'Aceptamos la variación natural de tonos: cada lote es único.' },
];

export default function Nosotros() {
  useDocumentTitle(
    'Nosotros · Origen Tepexi de Rodríguez',
    'Somos de Tepexi de Rodríguez, Puebla. Conoce qué es la laja, nuestro proceso de extracción, valores y garantía.'
  );

  return (
    <>
      {/* Intro */}
      <section
        className="nosotros__hero"
        style={{ paddingTop: 'calc(var(--nav-height) + 3rem)' }}
      >
        <div className="container nosotros__herogrid">
          <div>
            <span className="eyebrow">Nosotros</span>
            <h1>Piedra de la Mixteca poblana, con nombre y origen.</h1>
            <p className="lead">
              Somos de Tepexi de Rodríguez, Puebla: tierra de canteras. Llevamos
              la laja natural de nuestros cerros a fachadas, pisos y muros de todo
              México, sin perder de vista de dónde viene cada pieza.
            </p>
          </div>
          <div className="nosotros__heromedia" aria-hidden="true">
            {PRODUCTS.slice(0, 4).map((p) => (
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
      </section>

      {/* Qué es la laja */}
      <Section eyebrow="El material" title="¿Qué es la laja?">
        <div className="nosotros__dos">
          <p className="lead">
            La laja es una piedra sedimentaria que se separa en capas delgadas y
            planas, perfectas para revestir superficies. Su dureza la hace ideal
            para exteriores, y su veta natural aporta una textura imposible de
            imitar con materiales industriales.
          </p>
          <p>
            En Tepexi existen distintos mantos que dan colores muy diferentes:
            del blanco Galarza al negro Mixteca, pasando por verdes, dorados y
            hasta una variedad translúcida. Por eso nuestro catálogo es tan
            variado: es la misma tierra mostrando todos sus tonos.
          </p>
        </div>
      </Section>

      {/* Proceso */}
      <Section
        variant="soft"
        eyebrow="De la cantera a tu obra"
        title="Nuestro proceso"
      >
        <ol className="nosotros__proceso">
          {PROCESO.map((step, i) => (
            <li
              key={step.t}
              className="nosotros__paso"
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <span className="nosotros__num">{i + 1}</span>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Valores */}
      <Section eyebrow="Cómo trabajamos" title="Lo que nos importa">
        <div className="nosotros__valores">
          {VALORES.map((v, i) => (
            <div
              key={v.t}
              className="nosotros__valor"
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` }}
            >
              <h3>{v.t}</h3>
              <p>{v.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Garantía */}
      <Section variant="ink">
        <div className="nosotros__garantia">
          <div>
            <span className="eyebrow">Garantía</span>
            <h2>Compras tranquilo</h2>
            <p className="lead">
              Si tu pedido llega con piezas dañadas por el transporte, las
              reponemos. Para proyectos grandes enviamos una muestra física antes
              de cerrar la compra, para que confirmes el tono con tus propios ojos.
            </p>
          </div>
          <div className="nosotros__garantiacta">
            <Button to="/catalogo" size="lg">
              Ver catálogo
            </Button>
            <Button to="/contacto" size="lg" variant="secondary">
              Hablar con un asesor
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
