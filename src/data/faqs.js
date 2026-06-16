/*
 * faqs.js — Preguntas frecuentes (mock).
 * Propósito: contenido para la sección FAQ de la home/contacto, centrado en las
 * dudas reales al comprar laja: medición, merma, flete, instalación y pago.
 * TODO (cliente): validar políticas reales (devoluciones, tiempos, garantía).
 */

export const FAQS = [
  {
    id: 'f1',
    q: '¿Cómo se vende la laja, por pieza o por metro?',
    a: 'Se vende por metro cuadrado (m²). En cada producto encontrarás una calculadora para convertir el área de tu proyecto a m², con un margen de merma sugerido del 10%.',
  },
  {
    id: 'f2',
    q: '¿Qué es la merma y por qué debo considerarla?',
    a: 'La merma es el material extra que se pierde en cortes, ajustes y piezas rotas durante la instalación. Recomendamos sumar un 10% al área neta para no quedarte corto a mitad de obra.',
  },
  {
    id: 'f3',
    q: '¿El precio incluye el envío?',
    a: 'No. El precio mostrado es solo del material por m². El flete depende de la distancia a la cantera y del volumen; por eso lo cotizamos aparte. Usa "Cotizar flete/volumen" y te damos el costo de envío a tu ubicación.',
  },
  {
    id: 'f4',
    q: '¿Los tonos son exactamente como se ven en pantalla?',
    a: 'La laja es piedra natural: cada lote varía ligeramente en tono y veta. Las muestras en la web son representativas. Para proyectos grandes podemos enviarte una muestra física antes de comprar.',
  },
  {
    id: 'f5',
    q: '¿Puedo pagar a meses?',
    a: 'En el checkout encontrarás la opción de Meses Sin Intereses (MSI) con tarjetas participantes, ideal para pedidos de ticket alto. (Disponible al activar la pasarela de pago real.)',
  },
  {
    id: 'f6',
    q: '¿Hacen envíos a todo México?',
    a: 'Sí, despachamos a nivel nacional desde Tepexi de Rodríguez, Puebla. El tiempo y costo de entrega se confirman al cotizar el flete.',
  },
];
