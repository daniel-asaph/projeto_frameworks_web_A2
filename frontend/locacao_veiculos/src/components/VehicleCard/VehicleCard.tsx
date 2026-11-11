import { Button } from '../Button/Button';
import type { Veiculo } from '../../types';
import { formatCurrency } from '../../utils/format';
import './VehicleCard.css';

export interface VehicleCardProps {
  vehicle: Veiculo;
  onRentClick?: (vehicle: Veiculo) => void;
}

export function VehicleCard({ vehicle, onRentClick }: VehicleCardProps) {
  return (
    <article className="vehicle-card">
      <div className="vehicle-card-top">
        <span className="vehicle-card-brand">{vehicle.marca}</span>
        <span
          className={`vehicle-card-status ${
            vehicle.disponibilidade ? 'status-available' : 'status-rented'
          }`}
        >
          {vehicle.disponibilidade ? 'Disponível' : 'Locado'}
        </span>
      </div>

      <h2 className="vehicle-card-model">{vehicle.modelo}</h2>

      <div className="vehicle-card-meta">
        <span>Placa {vehicle.placa}</span>
        <span>Ano {vehicle.ano}</span>
      </div>

      <div className="vehicle-card-price-row">
        <span className="vehicle-card-price">{formatCurrency(vehicle.valorDiaria)}</span>
        <span className="vehicle-card-period"> / diária</span>
      </div>

      {vehicle.disponibilidade ? (
        <Button
          variant="primary"
          className="vehicle-card-btn"
          onClick={() => onRentClick?.(vehicle)}
        >
          Alugar este veículo
        </Button>
      ) : (
        <Button variant="disabled-muted" className="vehicle-card-btn" disabled>
          Indisponível
        </Button>
      )}
    </article>
  );
}
