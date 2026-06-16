/*
 * products.js — Catálogo mock de lajas naturales.
 * Propósito: única fuente de verdad del catálogo. Cada producto describe una
 * laja real de Tepexi de Rodríguez con su color, precio por m², formatos,
 * espesores, acabados y usos. Mientras no haya fotografía real, cada laja trae
 * un "swatch" (dos colores + patrón de textura) que el componente StoneSwatch
 * usa para representar visualmente la piedra con gradientes CSS.
 *
 * TODO (cliente): sustituir swatches por fotografía real y confirmar precios.
 */

/** Taxonomías compartidas (para construir filtros del catálogo). */
export const USOS = [
  'Fachadas',
  'Pisos',
  'Muros decorativos',
  'Chimeneas',
  'Terrazas',
  'Albercas',
  'Andadores',
];

export const FORMATOS = ['5 cm x largo libre', '10 cm x largo libre', 'Irregular'];

export const ACABADOS = ['Natural'];


/**
 * Catálogo. `swatch.pattern` ∈ veta | capas | moteado | cristal | fosil | liso
 * y determina cómo StoneSwatch dibuja la textura.
 */
export const PRODUCTS = [
  {
    id: 'galarza',
    slug: 'galarza-blanca',
    name: 'Galarza Blanca',
    color: 'Blanco',
    tagline: 'Luminosa y serena, la favorita para fachadas claras.',
    description:
      'Laja de tono crema con vetas suaves que aporta luz a fachadas y muros. Su superficie refleja la luz natural y mantiene los espacios frescos. Ideal para arquitectura contemporánea y mediterránea.',
    pricePerM2: 230,
    formats: ['5 cm x largo libre', '10 cm x largo libre', 'Irregular'],
    finishes: ['Natural'],
    uses: ['Fachadas', 'Muros decorativos', 'Terrazas', 'Albercas'],
    featured: true,
    badge: 'Más vendida',
    swatch: { c1: '#e9e3d5', c2: '#d2c9b5', pattern: 'veta' },
  },
  {
    id: 'roja-tlayua',
    slug: 'roja-tlayua',
    name: 'Roja Tlayúa',
    color: 'Rojo',
    tagline: 'Terracota intensa con carácter rústico.',
    description:
      'Tonos rojizos y ocres profundos que evocan la tierra de la Mixteca. Da calidez inmediata a chimeneas, muros de acento y fachadas con personalidad. Cada pieza varía en intensidad.',
    pricePerM2: 210,
    formats: ['5 cm x largo libre', '10 cm x largo libre', 'Irregular'],
    finishes: ['Natural'],
    uses: ['Fachadas', 'Chimeneas', 'Muros decorativos', 'Andadores'],
    featured: true,
    badge: null,
    swatch: { c1: '#9a4434', c2: '#5e2820', pattern: 'capas' },
  },
  {
    id: 'negra-mixteca',
    slug: 'negra-mixteca',
    name: 'Negra Mixteca',
    color: 'Negro',
    tagline: 'Elegancia profunda para interiores de autor.',
    description:
      'Negro mate uniforme con sutiles destellos minerales. Aporta dramatismo a muros interiores, pisos de diseño y chimeneas modernas. Contrasta de maravilla con maderas claras.',
    pricePerM2: 245,
    formats: ['5 cm x largo libre', '10 cm x largo libre', 'Irregular'],
    finishes: ['Natural'],
    uses: ['Muros decorativos', 'Pisos', 'Chimeneas', 'Fachadas'],
    featured: true,
    badge: 'Premium',
    swatch: { c1: '#34322f', c2: '#161513', pattern: 'veta' },
  },
  {
    id: 'verde-militar',
    slug: 'verde-militar',
    name: 'Verde Militar',
    color: 'Verde',
    tagline: 'Olivo sobrio para exteriores con temple.',
    description:
      'Verde olivo apagado, sobrio y muy versátil. Excelente para fachadas amplias y andadores que buscan integrarse con vegetación sin protagonismo excesivo.',
    pricePerM2: 185,
    formats: ['5 cm x largo libre', '10 cm x largo libre', 'Irregular'],
    finishes: ['Natural'],
    uses: ['Fachadas', 'Andadores', 'Pisos', 'Terrazas'],
    featured: false,
    badge: null,
    swatch: { c1: '#4a5440', c2: '#333a2b', pattern: 'capas' },
  },
  {
    id: 'oro-viejo',
    slug: 'oro-viejo',
    name: 'Oro Viejo',
    color: 'Dorado',
    tagline: 'Dorado cálido que envejece con gracia.',
    description:
      'Ocres dorados con vetas tostadas. Da una pátina señorial a fachadas y terrazas. Bajo el sol del atardecer adquiere reflejos miel inconfundibles.',
    pricePerM2: 220,
    formats: ['5 cm x largo libre', '10 cm x largo libre', 'Irregular'],
    finishes: ['Natural'],
    uses: ['Fachadas', 'Terrazas', 'Pisos', 'Muros decorativos'],
    featured: true,
    badge: null,
    swatch: { c1: '#bd9354', c2: '#8f6a33', pattern: 'veta' },
  },
  {
    id: 'canela',
    slug: 'canela',
    name: 'Canela',
    color: 'Café',
    tagline: 'Café cálido y acogedor para pisos.',
    description:
      'Tonos canela y café con leche, suaves y envolventes. Muy demandada en pisos interiores y terrazas por su calidez y su antiderrapante natural.',
    pricePerM2: 175,
    formats: ['5 cm x largo libre', '10 cm x largo libre', 'Irregular'],
    finishes: ['Natural'],
    uses: ['Pisos', 'Terrazas', 'Andadores', 'Fachadas'],
    featured: false,
    badge: null,
    swatch: { c1: '#a9794f', c2: '#7e5635', pattern: 'capas' },
  },
  {
    id: 'pizarra-negra',
    slug: 'pizarra-negra',
    name: 'Pizarra Negra',
    color: 'Negro',
    tagline: 'Pizarra clásica, textura y aplomo.',
    description:
      'Gris pizarra muy oscuro con relieve natural. Un clásico para pisos exteriores, andadores y muros de jardín por su resistencia y su elegancia atemporal.',
    pricePerM2: 165,
    formats: ['5 cm x largo libre', '10 cm x largo libre', 'Irregular'],
    finishes: ['Natural'],
    uses: ['Pisos', 'Andadores', 'Muros decorativos', 'Terrazas'],
    featured: false,
    badge: null,
    swatch: { c1: '#3a3b40', c2: '#1d1e22', pattern: 'capas' },
  },
  {
    id: 'oreja-de-elefante',
    slug: 'oreja-de-elefante',
    name: 'Oreja de Elefante',
    color: 'Gris',
    tagline: 'Ondas grises y beige de gran formato natural.',
    description:
      'Piedra de tonos gris-arena con ondulaciones amplias que recuerdan el pliegue de una oreja de elefante. Sus piezas grandes e irregulares lucen en muros de jardín, fachadas rústicas y andadores donde se busca textura generosa.',
    pricePerM2: 190,
    formats: ['Irregular', '10 cm x largo libre'],
    finishes: ['Natural'],
    uses: ['Fachadas', 'Muros decorativos', 'Andadores', 'Terrazas'],
    featured: false,
    badge: null,
    swatch: { c1: '#b0a692', c2: '#867c69', pattern: 'veta' },
  },
  {
    id: 'verde-pistache',
    slug: 'verde-pistache',
    name: 'Verde Pistache',
    color: 'Verde',
    tagline: 'Verde claro y fresco para espacios luminosos.',
    description:
      'Verde pistache suave con vetas tenues que aporta frescura sin oscurecer los ambientes. Ideal para fachadas claras, terrazas y muros de jardín que buscan un verde más luminoso que los tonos militar o jade.',
    pricePerM2: 205,
    formats: ['5 cm x largo libre', '10 cm x largo libre', 'Irregular'],
    finishes: ['Natural'],
    uses: ['Fachadas', 'Terrazas', 'Muros decorativos', 'Andadores'],
    featured: false,
    badge: null,
    swatch: { c1: '#9caa72', c2: '#74894f', pattern: 'capas' },
  },
  {
    id: 'recinto-negro',
    slug: 'recinto-negro',
    name: 'Recinto Negro',
    color: 'Negro',
    tagline: 'Piedra volcánica negra de textura porosa.',
    description:
      'Recinto negro de origen volcánico, con superficie mate y poro abierto característico. Muy resistente a la intemperie, es un clásico para fachadas, zócalos y muros exteriores que buscan un negro sobrio y rústico.',
    pricePerM2: 180,
    formats: ['Irregular', '10 cm x largo libre'],
    finishes: ['Natural'],
    uses: ['Fachadas', 'Muros decorativos', 'Andadores', 'Pisos'],
    featured: false,
    badge: null,
    swatch: { c1: '#3d3a38', c2: '#211f1e', pattern: 'moteado' },
  },
];

// Foto real por laja: archivo en `public/lajas/<id>.jpg` (fotografía libre de
// licencia, representativa, ver public/lajas/CREDITOS.md). El `swatch` CSS queda
// como respaldo si la imagen no carga. TODO (cliente): sustituir por fotografía
// propia del producto/cantera.
// import.meta.env.BASE_URL = '/Lajas/' en producción (GitHub Pages) y '/' en
// local. Sin este prefijo, las fotos en /lajas/... darían 404 al desplegar bajo
// la subruta del repo.
PRODUCTS.forEach((p) => {
  p.image = `${import.meta.env.BASE_URL}lajas/${p.id}.jpg`;
});

/** Lista de colores únicos presentes en el catálogo (para filtros). */
export const COLORES = [...new Set(PRODUCTS.map((p) => p.color))].sort();

/** Rango global de precios por m² del catálogo. */
export const PRICE_RANGE = {
  min: Math.min(...PRODUCTS.map((p) => p.pricePerM2)),
  max: Math.max(...PRODUCTS.map((p) => p.pricePerM2)),
};

/**
 * Busca un producto por su slug.
 * @param {string} slug
 * @returns {object|undefined}
 */
export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Productos destacados para la home. */
export const FEATURED = PRODUCTS.filter((p) => p.featured);
