import { useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Button } from '../../components/Button/Button';
import type { Locacao } from '../../types';
import { formatCurrency, formatDate } from '../../utils/format';
import './MyRentalsPage.css';

export interface MyRentalsPageProps {
  rentals: Locacao[];
  onFinishRental?: (id: number) => void;
}

export function MyRentalsPage({ rentals, onFinishRental }: MyRentalsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRentals = rentals.filter((r) => {
    const query = searchQuery.toLowerCase();
    const veiculo = r.veiculo;
    if (!veiculo) return query === '';
    return (
      `${veiculo.marca} ${veiculo.modelo}`.toLowerCase().includes(query) ||
      veiculo.placa.toLowerCase().includes(query)
    );
  });

  return (
    <section className="my-rentals-page">
      <div className="my-rentals-toolbar">
        <h1 className="my-rentals-title">Minhas Locações</h1>

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pesquisar"
        />
      </div>

      <div className="my-rentals-card">
        <h2 className="my-rentals-section-title">Histórico</h2>

        <div className="rentals-table-wrapper">
          <div className="rentals-table-header">
            <span>Veículo</span>
            <span>Início</span>
            <span>Prevista</span>
            <span>Devolução efetiva</span>
            <span>Valor total</span>
            <span>Status</span>
            <span>Ação</span>
          </div>

          <div className="rentals-table-body">
            {filteredRentals.map((rental) => (
              <div key={rental.id} className="rentals-table-row">
                <div className="rental-vehicle-cell">
                  <span className="rental-vehicle-name">
                    {rental.veiculo
                      ? `${rental.veiculo.marca} ${rental.veiculo.modelo}`
                      : `Veículo #${rental.veiculoId}`}
                  </span>
                  <span className="rental-vehicle-plate">{rental.veiculo?.placa ?? '—'}</span>
                </div>

                <span className="rental-date-cell">{formatDate(rental.dataInicio)}</span>
                <span className="rental-date-cell">
                  {formatDate(rental.dataDevolucaoPrevista)}
                </span>
                <span
                  className={`rental-date-cell ${
                    !rental.dataDevolucaoEfetiva ? 'muted-dash' : ''
                  }`}
                >
                  {rental.dataDevolucaoEfetiva ? formatDate(rental.dataDevolucaoEfetiva) : '—'}
                </span>

                <span className="rental-total-cell">
                  {rental.valorTotal != null ? formatCurrency(rental.valorTotal) : '—'}
                </span>

                <div className="rental-status-cell">
                  <span
                    className={`rental-status-badge ${
                      rental.status === 'ATIVA' ? 'badge-active' : 'badge-finished'
                    }`}
                  >
                    {rental.status}
                  </span>
                </div>

                <div className="rental-action-cell">
                  {rental.status === 'ATIVA' ? (
                    <Button
                      variant="primary"
                      className="rental-finish-btn"
                      onClick={() => onFinishRental?.(rental.id)}
                    >
                      Finalizar Locação
                    </Button>
                  ) : (
                    <span className="rental-finished-label">Encerrada</span>
                  )}
                </div>
              </div>
            ))}

            {filteredRentals.length === 0 && (
              <p className="rentals-empty">Nenhuma locação encontrada.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
