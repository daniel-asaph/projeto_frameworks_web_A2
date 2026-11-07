import { useState } from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { MainLayout } from './components/MainLayout/MainLayout';
import type { AppRoute } from './components/Header/Header';
import { VehiclesPage } from './pages/VehiclesPage/VehiclesPage';
import { RegisterVehiclePage } from './pages/RegisterVehiclePage/RegisterVehiclePage';
import { NewRentalPage } from './pages/NewRentalPage/NewRentalPage';
import { MyRentalsPage } from './pages/MyRentalsPage/MyRentalsPage';
import type {
  CadastroUsuarioPayload,
  CriarLocacaoPayload,
  CriarVeiculoPayload,
  Locacao,
  LoginPayload,
  Veiculo,
} from './types';
import { MOCK_LOCACOES, MOCK_USUARIO_ID, MOCK_VEICULOS } from './mocks/data';
import { daysBetween, todayIso } from './utils/format';
import './App.css';

type PageState = 'login' | 'register' | AppRoute;

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('login');
  const [vehicles, setVehicles] = useState<Veiculo[]>(MOCK_VEICULOS);
  const [rentals, setRentals] = useState<Locacao[]>(MOCK_LOCACOES);
  const [selectedVehicle, setSelectedVehicle] = useState<Veiculo | null>(null);

  const handleLogin = (credentials: LoginPayload) => {
    void credentials;
    setCurrentPage('vehicles');
  };

  const handleRegister = (data: CadastroUsuarioPayload) => {
    void data;
    setCurrentPage('vehicles');
  };

  const handleSelectVehicleToRent = (vehicle: Veiculo) => {
    setSelectedVehicle(vehicle);
    setCurrentPage('new-rental');
  };

  const handleRegisterVehicle = (payload: CriarVeiculoPayload) => {
    const newVehicle: Veiculo = {
      ...payload,
      id: Math.max(0, ...vehicles.map((v) => v.id)) + 1,
      disponibilidade: true,
    };
    setVehicles((prev) => [newVehicle, ...prev]);
    setCurrentPage('vehicles');
  };

  const handleConfirmRental = (payload: CriarLocacaoPayload) => {
    const veiculo = vehicles.find((v) => v.id === payload.veiculoId);
    if (!veiculo) return;

    const newRental: Locacao = {
      id: Math.max(0, ...rentals.map((r) => r.id)) + 1,
      dataInicio: payload.dataInicio,
      dataDevolucaoPrevista: payload.dataDevolucaoPrevista,
      dataDevolucaoEfetiva: null,
      valorTotal: null,
      status: 'ATIVA',
      usuarioId: MOCK_USUARIO_ID,
      veiculoId: veiculo.id,
      veiculo: { ...veiculo, disponibilidade: false },
    };

    setRentals((prev) => [newRental, ...prev]);
    setVehicles((prev) =>
      prev.map((v) => (v.id === veiculo.id ? { ...v, disponibilidade: false } : v))
    );
    setSelectedVehicle(null);
    setCurrentPage('my-rentals');
  };

  const handleFinishRental = (rentalId: number) => {
    const rental = rentals.find((r) => r.id === rentalId);
    if (!rental) return;

    const dataDevolucaoEfetiva = todayIso();
    const dias = Math.max(1, daysBetween(rental.dataInicio, dataDevolucaoEfetiva));
    const valorDiaria = rental.veiculo?.valorDiaria ?? 0;

    setRentals((prev) =>
      prev.map((r) =>
        r.id === rentalId
          ? {
              ...r,
              status: 'FINALIZADA',
              dataDevolucaoEfetiva,
              valorTotal: dias * valorDiaria,
            }
          : r
      )
    );
    setVehicles((prev) =>
      prev.map((v) => (v.id === rental.veiculoId ? { ...v, disponibilidade: true } : v))
    );
  };

  if (currentPage === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onNavigateToRegister={() => setCurrentPage('register')}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onNavigateToLogin={() => setCurrentPage('login')}
      />
    );
  }

  return (
    <MainLayout
      activeRoute={currentPage}
      onNavigate={(route) => setCurrentPage(route)}
      onLogout={() => setCurrentPage('login')}
    >
      {currentPage === 'vehicles' && (
        <VehiclesPage
          vehicles={vehicles}
          onSelectVehicleToRent={handleSelectVehicleToRent}
        />
      )}

      {currentPage === 'register-vehicle' && (
        <RegisterVehiclePage onRegisterVehicle={handleRegisterVehicle} />
      )}

      {currentPage === 'new-rental' &&
        (selectedVehicle ? (
          <NewRentalPage
            vehicle={selectedVehicle}
            onConfirmRental={handleConfirmRental}
          />
        ) : (
          <VehiclesPage
            vehicles={vehicles}
            onSelectVehicleToRent={handleSelectVehicleToRent}
          />
        ))}

      {currentPage === 'my-rentals' && (
        <MyRentalsPage
          rentals={rentals}
          onFinishRental={handleFinishRental}
        />
      )}
    </MainLayout>
  );
}

export default App;
