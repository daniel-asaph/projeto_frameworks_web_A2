import { useState } from 'react';
import type { FormEvent } from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthCard } from '../../components/AuthCard/AuthCard';
import { AuthHeader } from '../../components/AuthHeader/AuthHeader';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import { getApiErrorMessage } from '../../api/api';
import type { LoginPayload } from '../../types';
import './LoginPage.css';

export interface LoginPageProps {
  onLogin?: (credentials: LoginPayload) => Promise<void> | void;
  onNavigateToRegister?: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onLogin?.({ email: email.trim(), senha });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Erro ao fazer login.'));
    } finally {
      setLoading(false);
    }
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

          {error && <p className="login-error">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
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
