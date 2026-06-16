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
  'Cascadas',
  'Chimeneas',
  'Terrazas',
  'Albercas',
  'Andadores',
];

export const FORMATOS = ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'];

export const ACABADOS = ['Natural', 'Sellado mate', 'Sellado brillante'];

export const ESPESORES = ['3 mm', '5 mm', '10 mm'];

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
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado mate'],
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
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado mate', 'Sellado brillante'],
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
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado mate', 'Sellado brillante'],
    uses: ['Muros decorativos', 'Pisos', 'Chimeneas', 'Fachadas'],
    featured: true,
    badge: 'Premium',
    swatch: { c1: '#34322f', c2: '#161513', pattern: 'veta' },
  },
  {
    id: 'verde-mixteca',
    slug: 'verde-mixteca',
    name: 'Verde Mixteca',
    color: 'Verde',
    tagline: 'Verde natural que conecta con el paisaje.',
    description:
      'Verde terroso con vetas grises que integra la construcción con jardines y terrazas. Muy usada en cascadas y muros exteriores por su resistencia a la intemperie.',
    pricePerM2: 200,
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado mate'],
    uses: ['Fachadas', 'Cascadas', 'Terrazas', 'Andadores'],
    featured: false,
    badge: null,
    swatch: { c1: '#5c6b4a', c2: '#3f4a33', pattern: 'capas' },
  },
  {
    id: 'verde-jade',
    slug: 'verde-jade',
    name: 'Verde Jade',
    color: 'Verde',
    tagline: 'Tono jade fresco, joya para albercas.',
    description:
      'Verde con matices azulados que recuerda al jade. Espectacular en albercas y cascadas, donde el agua realza su profundidad. También luce en muros de acento interiores.',
    pricePerM2: 255,
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado brillante'],
    uses: ['Albercas', 'Cascadas', 'Muros decorativos', 'Terrazas'],
    featured: false,
    badge: 'Premium',
    swatch: { c1: '#4f7a63', c2: '#2f4f3c', pattern: 'veta' },
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
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado mate'],
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
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado mate', 'Sellado brillante'],
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
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado mate'],
    uses: ['Pisos', 'Terrazas', 'Andadores', 'Fachadas'],
    featured: false,
    badge: null,
    swatch: { c1: '#a9794f', c2: '#7e5635', pattern: 'capas' },
  },
  {
    id: 'diamantada',
    slug: 'diamantada',
    name: 'Diamantada',
    color: 'Gris',
    tagline: 'Destellos cristalinos que atrapan la luz.',
    description:
      'Superficie gris plateada con microcristales que brillan con la luz directa. Una pieza de carácter para muros de acento y fachadas que buscan un toque sofisticado.',
    pricePerM2: 240,
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado brillante'],
    uses: ['Muros decorativos', 'Fachadas', 'Chimeneas'],
    featured: false,
    badge: 'Brillante',
    swatch: { c1: '#c9c2b4', c2: '#9d9483', pattern: 'cristal' },
  },
  {
    id: 'madera',
    slug: 'madera',
    name: 'Madera',
    color: 'Café',
    tagline: 'Vetas que imitan la calidez de la madera.',
    description:
      'Bandas longitudinales en tonos café que recuerdan a la madera, con la durabilidad de la piedra. Perfecta para andadores, terrazas y muros que buscan tibieza orgánica.',
    pricePerM2: 195,
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado mate'],
    uses: ['Andadores', 'Terrazas', 'Muros decorativos', 'Pisos'],
    featured: false,
    badge: null,
    swatch: { c1: '#9a6e45', c2: '#6f4d2e', pattern: 'madera' },
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
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['5 mm', '10 mm'],
    finishes: ['Natural', 'Sellado mate'],
    uses: ['Pisos', 'Andadores', 'Muros decorativos', 'Terrazas'],
    featured: false,
    badge: null,
    swatch: { c1: '#3a3b40', c2: '#1d1e22', pattern: 'capas' },
  },
  {
    id: 'azul-translucido',
    slug: 'azul-translucido',
    name: 'Azul Translúcido',
    color: 'Azul',
    tagline: 'Translúcida: cobra vida retroiluminada.',
    description:
      'Laja de tonos azul-gris con cierta translucidez: retroiluminada, se convierte en una pieza luminosa para barras, muros backlight y fachadas de noche. La joya del catálogo.',
    pricePerM2: 260,
    formats: ['Cintilla 5 cm', 'Cintilla 10 cm', 'Irregular'],
    thicknesses: ['3 mm', '5 mm'],
    finishes: ['Natural', 'Sellado brillante'],
    uses: ['Muros decorativos', 'Fachadas', 'Albercas'],
    featured: true,
    badge: 'Translúcida',
    swatch: { c1: '#7d9fb0', c2: '#466573', pattern: 'cristal' },
  },
  {
    id: 'arqueologica',
    slug: 'arqueologica',
    name: 'Arqueológica',
    color: 'Beige',
    tagline: 'Fósiles y huellas del tiempo en cada pieza.',
    description:
      'Beige cálido con improntas fósiles y vetas irregulares; cada laja cuenta una historia geológica única. Para proyectos que buscan textura y autenticidad rústica.',
    pricePerM2: 205,
    formats: ['Cintilla 10 cm', 'Irregular'],
    thicknesses: ['10 mm'],
    finishes: ['Natural', 'Sellado mate'],
    uses: ['Muros decorativos', 'Fachadas', 'Chimeneas', 'Andadores'],
    featured: false,
    badge: null,
    swatch: { c1: '#b3a489', c2: '#8a7a5f', pattern: 'fosil' },
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
