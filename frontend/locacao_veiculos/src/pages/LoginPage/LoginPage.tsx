import { useState } from 'react';
import type { FormEvent } from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthCard } from '../../components/AuthCard/AuthCard';
import { AuthHeader } from '../../components/AuthHeader/AuthHeader';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import type { LoginPayload } from '../../types';
import './LoginPage.css';

export interface LoginPageProps {
  onLogin?: (credentials: LoginPayload) => void;
  onNavigateToRegister?: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin?.({ email: email.trim(), senha });
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Locação de Veículos"
          subtitle="Entre com sua conta"
        />

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <Button type="submit">Entrar</Button>
        </form>

        <AuthFooter
          text="Não tem conta?"
          linkText="Cadastre-se"
          onActionClick={onNavigateToRegister}
        />
      </AuthCard>
    </AuthLayout>
  );
}
