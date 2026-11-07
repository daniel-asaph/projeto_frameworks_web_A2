import { useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { VehicleCard } from '../../components/VehicleCard/VehicleCard';
import type { Veiculo } from '../../types';
import chevronDownIcon from '../../assets/chevron-down.svg';
import './VehiclesPage.css';

export interface VehiclesPageProps {
  vehicles: Veiculo[];
  onSelectVehicleToRent: (vehicle: Veiculo) => void;
}

export type AvailabilityFilter = 'all' | 'available' | 'rented';

export function VehiclesPage({ vehicles, onSelectVehicleToRent }: VehiclesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [availability, setAvailability] = useState<AvailabilityFilter>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredVehicles = vehicles.filter((v) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      v.modelo.toLowerCase().includes(query) ||
      v.marca.toLowerCase().includes(query) ||
      v.placa.toLowerCase().includes(query);

    const matchesAvailability =
      availability === 'all' ||
      (availability === 'available' && v.disponibilidade) ||
      (availability === 'rented' && !v.disponibilidade);

    return matchesSearch && matchesAvailability;
  });

  const getFilterLabel = () => {
    if (availability === 'available') return 'Disponíveis';
    if (availability === 'rented') return 'Locados';
    return 'Disponibilidade';
  };

  return (
    <section className="vehicles-page">
      <div className="vehicles-toolbar">
        <h1 className="vehicles-page-title">Veículos</h1>

        <div className="vehicles-controls">
          <div className="availability-dropdown-wrapper">
            <button
              type="button"
              className="availability-filter-btn"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <span>{getFilterLabel()}</span>
              <img src={chevronDownIcon} alt="" className="availability-chevron" />
            </button>

            {dropdownOpen && (
              <div className="availability-dropdown-menu">
                <button
                  type="button"
                  className={`availability-option ${availability === 'all' ? 'selected' : ''}`}
                  onClick={() => {
                    setAvailability('all');
                    setDropdownOpen(false);
                  }}
                >
                  Todos
                </button>
                <button
                  type="button"
                  className={`availability-option ${availability === 'available' ? 'selected' : ''}`}
                  onClick={() => {
                    setAvailability('available');
                    setDropdownOpen(false);
                  }}
                >
                  Disponível
                </button>
                <button
                  type="button"
                  className={`availability-option ${availability === 'rented' ? 'selected' : ''}`}
                  onClick={() => {
                    setAvailability('rented');
                    setDropdownOpen(false);
                  }}
                >
                  Locado
                </button>
              </div>
            )}
          </div>

          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar"
          />
        </div>
      </div>

      <div className="vehicles-grid">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onRentClick={onSelectVehicleToRent}
          />
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <p className="vehicles-empty">Nenhum veículo encontrado.</p>
      )}
    </section>
  );
}
