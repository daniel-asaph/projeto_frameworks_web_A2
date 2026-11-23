import { useState } from 'react';
import type { FormEvent } from 'react';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { getApiErrorMessage } from '../../api/api';
import type { CriarLocacaoPayload, Veiculo } from '../../types';
import { addDaysIso, daysBetween, formatCurrency, todayIso } from '../../utils/format';
import './NewRentalPage.css';

export interface NewRentalPageProps {
  vehicle: Veiculo;
  onConfirmRental?: (payload: CriarLocacaoPayload) => Promise<void> | void;
}

export function NewRentalPage({ vehicle, onConfirmRental }: NewRentalPageProps) {
  const [dataInicio, setDataInicio] = useState(todayIso());
  const [dataDevolucaoPrevista, setDataDevolucaoPrevista] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dias = daysBetween(dataInicio, dataDevolucaoPrevista);
  const valorTotal = dias * vehicle.valorDiaria;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!vehicle.disponibilidade) {
      setError('Este veículo não está disponível para locação.');
      return;
    }
    if (dias <= 0) {
      setError('A data de devolução deve ser posterior à data de início.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await onConfirmRental?.({
        veiculoId: vehicle.id,
        dataInicio,
        dataDevolucaoPrevista,
      });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Erro ao confirmar locação.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="new-rental-page">
      <h1 className="new-rental-title">Nova locação</h1>

      <div className="new-rental-grid">
        <aside className="new-rental-vehicle-summary">
          <div className="summary-top-row">
            <span className="summary-category">{vehicle.marca.toUpperCase()}</span>
            <span className="summary-badge">
              {vehicle.disponibilidade ? 'Disponível' : 'Locado'}
            </span>
          </div>

          <h2 className="summary-vehicle-name">{vehicle.modelo}</h2>

          <div className="summary-divider" />

          <div className="summary-specs-list">
            <div className="summary-spec-row">
              <span className="summary-spec-label">Marca</span>
              <span className="summary-spec-value">{vehicle.marca}</span>
            </div>
            <div className="summary-spec-row">
              <span className="summary-spec-label">Placa do veículo</span>
              <span className="summary-spec-value">{vehicle.placa}</span>
            </div>
            <div className="summary-spec-row">
              <span className="summary-spec-label">Ano</span>
              <span className="summary-spec-value">{vehicle.ano}</span>
            </div>
          </div>

          <div className="summary-divider" />

          <div className="summary-price-block">
            <span className="summary-price-caption">Valor da diária</span>
            <div className="summary-price-line">
              <span className="summary-price-amount">{formatCurrency(vehicle.valorDiaria)}</span>
              <span className="summary-price-unit">/ dia</span>
            </div>
          </div>
        </aside>

        <form className="new-rental-form-card" onSubmit={handleSubmit}>
          <div className="new-rental-field">
            <label className="new-rental-label" htmlFor="dataInicio">
              Data de início
            </label>
            <Input
              id="dataInicio"
              type="date"
              icon="calendar"
              iconPosition="right"
              className="new-rental-date-input"
              value={dataInicio}
              min={todayIso()}
              onChange={(e) => {
                const novaDataInicio = e.target.value;
                setDataInicio(novaDataInicio);
                if (dataDevolucaoPrevista && dataDevolucaoPrevista <= novaDataInicio) {
                  setDataDevolucaoPrevista(addDaysIso(novaDataInicio, 1));
                }
              }}
              required
            />
          </div>

          <div className="new-rental-field">
            <label className="new-rental-label" htmlFor="dataDevolucaoPrevista">
              Data de devolução prevista
            </label>
            <Input
              id="dataDevolucaoPrevista"
              type="date"
              icon="calendar"
              iconPosition="right"
              className="new-rental-date-input"
              value={dataDevolucaoPrevista}
              min={addDaysIso(dataInicio, 1) || dataInicio}
              onChange={(e) => setDataDevolucaoPrevista(e.target.value)}
              required
            />
          </div>

          <div className="new-rental-totals">
            <p className="new-rental-total-main">Total: {formatCurrency(valorTotal)}</p>
            <p className="new-rental-total-sub">
              {dias}x {formatCurrency(vehicle.valorDiaria)}
            </p>
          </div>

          {error && <p className="new-rental-error">{error}</p>}

          <Button
            type="submit"
            className="new-rental-confirm-btn"
            disabled={!vehicle.disponibilidade || loading}
          >
            {loading ? 'Confirmando...' : 'Confirmar locação'}
          </Button>
        </form>
      </div>
    </section>
  );
}
