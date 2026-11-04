import React, { useState } from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthCard } from '../../components/AuthCard/AuthCard';
import { AuthHeader } from '../../components/AuthHeader/AuthHeader';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import './RegisterPage.css';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterPageProps {
  onRegister?: (data: RegisterData) => void;
  onNavigateToLogin?: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister?.({ name, email, password });
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Locação de Veículos"
          subtitle="Crie sua conta"
        />

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-input-group">
            <Input
              icon="user"
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              icon="mail"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              icon="lock"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit">Criar conta</Button>
        </form>

        <AuthFooter
          text="Já tem uma conta?"
          linkText="Entre"
          onActionClick={onNavigateToLogin}
        />
      </AuthCard>
    </AuthLayout>
  );
}
