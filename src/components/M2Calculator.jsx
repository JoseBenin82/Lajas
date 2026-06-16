/*
 * M2Calculator.jsx — Calculadora de metros cuadrados con merma.
 * Propósito: pieza central de la UX de venta de laja. Permite al comprador
 * ingresar el área de su proyecto (por dimensiones largo×ancho o por área
 * directa), sumar un porcentaje de merma y ver el m² total a comprar y el
 * estimado de material. Notifica el resultado al padre para precargar el
 * carrito. La lógica vive en lib/coverage.js.
 */

import { useEffect, useState } from 'react';
import { calcCoverage, MERMA_DEFAULT } from '../lib/coverage.js';
import { formatMXN } from '../lib/money.js';
import './M2Calculator.css';

/**
 * @param {object} props
 * @param {number} props.pricePerM2 Precio por m² del producto.
 * @param {(coverage:object)=>void} [props.onChange] Recibe el cálculo en cada cambio.
 */
export default function M2Calculator({ pricePerM2, onChange }) {
  const [modo, setModo] = useState('dimensiones');
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [area, setArea] = useState('');
  const [mermaPct, setMermaPct] = useState(MERMA_DEFAULT);

  const cobertura = calcCoverage({
    modo,
    largo: Number(largo),
    ancho: Number(ancho),
    area: Number(area),
    mermaPct,
    pricePerM2,
  });

  // Informa al padre del resultado (para el botón "Agregar al carrito").
  useEffect(() => {
    onChange?.(cobertura);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modo, largo, ancho, area, mermaPct, pricePerM2]);

  return (
    <div className="m2calc">
      <div className="m2calc__head">
        <h3 className="m2calc__title">Calcula tu metraje</h3>
        <div className="m2calc__modes" role="tablist" aria-label="Modo de cálculo">
          <button
            role="tab"
            aria-selected={modo === 'dimensiones'}
            className={`m2calc__mode ${modo === 'dimensiones' ? 'is-on' : ''}`}
            onClick={() => setModo('dimensiones')}
          >
            Por medidas
          </button>
          <button
            role="tab"
            aria-selected={modo === 'area'}
            className={`m2calc__mode ${modo === 'area' ? 'is-on' : ''}`}
            onClick={() => setModo('area')}
          >
            Por área
          </button>
        </div>
      </div>

      {modo === 'dimensiones' ? (
        <div className="m2calc__row">
          <label className="m2calc__field">
            <span>Largo (m)</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              placeholder="0.0"
              value={largo}
              onChange={(e) => setLargo(e.target.value)}
            />
          </label>
          <span className="m2calc__times" aria-hidden="true">
            ×
          </span>
          <label className="m2calc__field">
            <span>Ancho (m)</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              placeholder="0.0"
              value={ancho}
              onChange={(e) => setAncho(e.target.value)}
            />
          </label>
        </div>
      ) : (
        <label className="m2calc__field">
          <span>Área a cubrir (m²)</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            placeholder="0.0"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>
      )}

      <label className="m2calc__merma">
        <span>
          Merma sugerida · <strong>{mermaPct}%</strong>
        </span>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={mermaPct}
          onChange={(e) => setMermaPct(Number(e.target.value))}
          aria-label="Porcentaje de merma"
        />
      </label>

      <dl className="m2calc__result">
        <div>
          <dt>Área neta</dt>
          <dd>{cobertura.areaNeta} m²</dd>
        </div>
        <div>
          <dt>+ Merma</dt>
          <dd>{cobertura.mermaM2} m²</dd>
        </div>
        <div className="m2calc__total">
          <dt>Total a comprar</dt>
          <dd>{cobertura.areaTotal} m²</dd>
        </div>
        <div className="m2calc__estimate">
          <dt>Estimado de material</dt>
          <dd>{formatMXN(cobertura.estimado)}</dd>
        </div>
      </dl>

      <p className="m2calc__note">
        Estimado solo de material. El flete se cotiza por separado según tu
        ubicación.
      </p>
    </div>
  );
}
