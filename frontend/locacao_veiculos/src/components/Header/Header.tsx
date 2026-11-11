import logOutIcon from '../../assets/log-out.svg';
import './Header.css';

export type AppRoute = 'vehicles' | 'register-vehicle' | 'new-rental' | 'my-rentals';

export interface HeaderProps {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
}

const NAV_ITEMS: { route: AppRoute; label: string }[] = [
  { route: 'vehicles', label: 'Veículos' },
  { route: 'register-vehicle', label: 'Cadastrar Veículo' },
  { route: 'my-rentals', label: 'Minhas Locações' },
];

export function Header({ activeRoute, onNavigate, onLogout }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <span className="app-header-brand">Locação de Veículos</span>

        <nav className="app-header-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.route}
              type="button"
              className={`app-header-link ${activeRoute === item.route ? 'active' : ''}`.trim()}
              onClick={() => onNavigate(item.route)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="app-header-logout" onClick={onLogout}>
          <img src={logOutIcon} alt="" />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}

