import { useEffect, useState } from 'react';
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
  Usuario,
  Veiculo,
} from './types';
import { authService } from './services/authService';
import { veiculoService } from './services/veiculoService';
import { locacaoService } from './services/locacaoService';
import './App.css';

type PageState = 'login' | 'register' | AppRoute;

function getStoredUser(): Usuario | null {
  const raw = localStorage.getItem('usuario');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Usuario;
  } catch {
    return null;
  }
}

function App() {
  const [user, setUser] = useState<Usuario | null>(() => getStoredUser());
  const [currentPage, setCurrentPage] = useState<PageState>(() =>
    getStoredUser() ? 'vehicles' : 'login'
  );
  const [vehicles, setVehicles] = useState<Veiculo[]>([]);
  const [rentals, setRentals] = useState<Locacao[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Veiculo | null>(null);

  useEffect(() => {
    if (!user) return;

    veiculoService
      .listar()
      .then(setVehicles)
      .catch((err) => console.error('Erro ao carregar veículos:', err));

    locacaoService
      .listarPorUsuario(user.id)
      .then(setRentals)
      .catch((err) => console.error('Erro ao carregar locações:', err));
  }, [user]);

  const handleLogin = async (credentials: LoginPayload) => {
    const { usuario, token } = await authService.login(credentials);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    setUser(usuario);
    setCurrentPage('vehicles');
  };

  const handleRegister = async (data: CadastroUsuarioPayload) => {
    await authService.cadastrar(data);
    await handleLogin({ email: data.email, senha: data.senha });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUser(null);
    setVehicles([]);
    setRentals([]);
    setSelectedVehicle(null);
    setCurrentPage('login');
  };

  const handleSelectVehicleToRent = (vehicle: Veiculo) => {
    setSelectedVehicle(vehicle);
    setCurrentPage('new-rental');
  };

  const handleRegisterVehicle = async (payload: CriarVeiculoPayload) => {
    const newVehicle = await veiculoService.criar(payload);
    setVehicles((prev) => [newVehicle, ...prev]);
    setCurrentPage('vehicles');
  };

  const handleConfirmRental = async (payload: CriarLocacaoPayload) => {
    if (!user) return;
    const newRental = await locacaoService.criar(user.id, payload);

    setRentals((prev) => [newRental, ...prev]);
    setVehicles((prev) =>
      prev.map((v) => (v.id === payload.veiculoId ? { ...v, disponibilidade: false } : v))
    );
    setSelectedVehicle(null);
    setCurrentPage('my-rentals');
  };

  const handleFinishRental = async (rentalId: number) => {
    if (!user) return;
    const updatedRental = await locacaoService.finalizar(rentalId, user.id);

    setRentals((prev) =>
      prev.map((r) => (r.id === rentalId ? updatedRental : r))
    );
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === updatedRental.veiculoId ? { ...v, disponibilidade: true } : v
      )
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
      onLogout={handleLogout}
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
