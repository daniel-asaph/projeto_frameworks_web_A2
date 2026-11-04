import React from 'react';
import './AuthLayout.css';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="auth-page">
      <div className="auth-overlay" />
      {children}
    </main>
  );
}
