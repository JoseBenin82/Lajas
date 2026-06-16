/*
 * Filters.jsx — Panel de filtros del catálogo.
 * Propósito: controles para filtrar por color, uso y formato (chips de
 * selección múltiple) y por precio máximo por m² (slider). Es presentacional:
 * recibe el estado de filtros y notifica cambios al catálogo mediante onChange.
 */

import { formatMXN } from '../lib/money.js';
import './Filters.css';

/**
 * @param {object} props
 * @param {object} props.filters Estado actual { colores[], usos[], formatos[], precioMax }.
 * @param {object} props.options Opciones { colores[], usos[], formatos[], priceRange{min,max} }.
 * @param {(partial:object)=>void} props.onChange Aplica un cambio parcial.
 * @param {()=>void} props.onReset Limpia todos los filtros.
 * @param {number} props.resultCount Número de resultados actuales.
 */
export default function Filters({
  filters,
  options,
  onChange,
  onReset,
  resultCount,
}) {
  // Alterna un valor dentro de un arreglo de filtro (colores/usos/formatos).
  function toggle(key, value) {
    const set = new Set(filters[key]);
    set.has(value) ? set.delete(value) : set.add(value);
    onChange({ [key]: [...set] });
  }

  const hasActive =
    filters.colores.length ||
    filters.usos.length ||
    filters.formatos.length ||
    filters.precioMax < options.priceRange.max;

  return (
    <aside className="filters" aria-label="Filtros del catálogo">
      <div className="filters__top">
        <h2 className="filters__title">Filtrar</h2>
        {hasActive ? (
          <button className="filters__reset" onClick={onReset}>
            Limpiar
          </button>
        ) : null}
      </div>
      <p className="filters__count">{resultCount} resultados</p>

      <fieldset className="filters__group">
        <legend>Color</legend>
        <div className="filters__chips">
          {options.colores.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${filters.colores.includes(c) ? 'is-on' : ''}`}
              aria-pressed={filters.colores.includes(c)}
              onClick={() => toggle('colores', c)}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend>Uso</legend>
        <div className="filters__chips">
          {options.usos.map((u) => (
            <button
              key={u}
              type="button"
              className={`chip ${filters.usos.includes(u) ? 'is-on' : ''}`}
              aria-pressed={filters.usos.includes(u)}
              onClick={() => toggle('usos', u)}
            >
              {u}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend>Formato</legend>
        <div className="filters__chips">
          {options.formatos.map((f) => (
            <button
              key={f}
              type="button"
              className={`chip ${filters.formatos.includes(f) ? 'is-on' : ''}`}
              aria-pressed={filters.formatos.includes(f)}
              onClick={() => toggle('formatos', f)}
            >
              {f}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend>
          Precio máx · <strong>{formatMXN(filters.precioMax)}/m²</strong>
        </legend>
        <input
          type="range"
          className="filters__range"
          min={options.priceRange.min}
          max={options.priceRange.max}
          step={5}
          value={filters.precioMax}
          onChange={(e) => onChange({ precioMax: Number(e.target.value) })}
          aria-label="Precio máximo por metro cuadrado"
        />
        <div className="filters__rangelabels">
          <span>{formatMXN(options.priceRange.min)}</span>
          <span>{formatMXN(options.priceRange.max)}</span>
        </div>
      </fieldset>
    </aside>
  );
}
