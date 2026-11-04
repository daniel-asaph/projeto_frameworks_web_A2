import React from 'react';
import './AuthCard.css';

export interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <section className="auth-card">
      {children}
    </section>
  );
}
