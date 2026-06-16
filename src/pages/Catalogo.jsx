/*
 * Catalogo.jsx — Catálogo de lajas con filtros y orden.
 * Propósito: listar todos los productos en un grid de ProductCard, permitiendo
 * filtrar por color, uso, formato y precio máximo, y ordenar el resultado.
 * Lee un filtro de uso inicial desde el query string (?uso=Fachadas) para los
 * accesos directos del footer/home.
 */

import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Filters from '../components/Filters.jsx';
import ProductCard from '../components/ProductCard.jsx';
import {
  PRODUCTS,
  COLORES,
  USOS,
  FORMATOS,
  PRICE_RANGE,
} from '../data/products.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';
import './Catalogo.css';

/** Opciones de orden disponibles. */
const ORDENES = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'nombre', label: 'Nombre (A–Z)' },
];

export default function Catalogo() {
  useDocumentTitle(
    'Catálogo de lajas',
    'Trece tonos de laja natural de Tepexi: blanca, roja, negra, verdes, dorada y más. Filtra por color, uso, formato y precio por m².'
  );

  const [searchParams] = useSearchParams();
  const usoInicial = searchParams.get('uso');

  // Estado de filtros (uso inicial puede venir del query string).
  const [filters, setFilters] = useState({
    colores: [],
    usos: usoInicial && USOS.includes(usoInicial) ? [usoInicial] : [],
    formatos: [],
    precioMax: PRICE_RANGE.max,
  });
  const [orden, setOrden] = useState('destacados');

  const onChange = (partial) => setFilters((f) => ({ ...f, ...partial }));
  const onReset = () =>
    setFilters({
      colores: [],
      usos: [],
      formatos: [],
      precioMax: PRICE_RANGE.max,
    });

  // Aplica filtros + orden (memorizado).
  const resultados = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (filters.colores.length && !filters.colores.includes(p.color))
        return false;
      if (filters.usos.length && !filters.usos.some((u) => p.uses.includes(u)))
        return false;
      if (
        filters.formatos.length &&
        !filters.formatos.some((fm) => p.formats.includes(fm))
      )
        return false;
      if (p.pricePerM2 > filters.precioMax) return false;
      return true;
    });

    switch (orden) {
      case 'precio-asc':
        list = [...list].sort((a, b) => a.pricePerM2 - b.pricePerM2);
        break;
      case 'precio-desc':
        list = [...list].sort((a, b) => b.pricePerM2 - a.pricePerM2);
        break;
      case 'nombre':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'es'));
        break;
      default:
        // Destacados primero, resto por precio descendente.
        list = [...list].sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
    }
    return list;
  }, [filters, orden]);

  return (
    <div className="catalogo">
      <header
        className="catalogo__hero"
        style={{ paddingTop: 'calc(var(--nav-height) + 2.5rem)' }}
      >
        <div className="container">
          <span className="eyebrow">Catálogo</span>
          <h1>Lajas naturales de Tepexi</h1>
          <p className="lead" style={{ maxWidth: '56ch', marginTop: '0.75rem' }}>
            Diez tonos reales extraídos en la Mixteca poblana. Todas se venden
            por m², con despacho a todo México.
          </p>
        </div>
      </header>

      <div className="container catalogo__layout">
        <Filters
          filters={filters}
          options={{
            colores: COLORES,
            usos: USOS,
            formatos: FORMATOS,
            priceRange: PRICE_RANGE,
          }}
          onChange={onChange}
          onReset={onReset}
          resultCount={resultados.length}
        />

        <section className="catalogo__main" aria-label="Resultados del catálogo">
          <div className="catalogo__toolbar">
            <span className="catalogo__resumen">
              Mostrando <strong>{resultados.length}</strong> de {PRODUCTS.length}
            </span>
            <label className="catalogo__orden">
              Ordenar por
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
              >
                {ORDENES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {resultados.length ? (
            <div className="grid grid--auto catalogo__grid">
              {resultados.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="catalogo__empty">
              <p>No hay lajas con esos filtros.</p>
              <button className="filters__reset" onClick={onReset}>
                Limpiar filtros
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
