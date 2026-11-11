import type { ReactNode } from 'react';
import { Header } from '../Header/Header';
import type { AppRoute } from '../Header/Header';
import bgGrainSvg from '../../assets/bg-grain.svg';
import './MainLayout.css';

export interface MainLayoutProps {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
  children: ReactNode;
}

export function MainLayout({
  activeRoute,
  onNavigate,
  onLogout,
  children,
}: MainLayoutProps) {
  return (
    <div className="main-layout">
      <img src={bgGrainSvg} alt="" className="main-layout-bg-grain" />
      <Header
        activeRoute={activeRoute}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <main className="main-layout-content">{children}</main>
    </div>
  );
}
