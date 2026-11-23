import type { ReactNode } from 'react';
import { Header } from '../Header/Header';
import type { AppRoute } from '../Header/Header';
import bgGrainSvg from '../../assets/bg-grain.svg';
import './MainLayout.css';

export interface MainLayoutProps {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
  userName?: string;
  children: ReactNode;
}

export function MainLayout({
  activeRoute,
  onNavigate,
  onLogout,
  userName,
  children,
}: MainLayoutProps) {
  return (
    <div className="main-layout">
      <img src={bgGrainSvg} alt="" className="main-layout-bg-grain" />
      <Header
        activeRoute={activeRoute}
        onNavigate={onNavigate}
        onLogout={onLogout}
        userName={userName}
      />
      <main className="main-layout-content">{children}</main>
    </div>
  );
}
