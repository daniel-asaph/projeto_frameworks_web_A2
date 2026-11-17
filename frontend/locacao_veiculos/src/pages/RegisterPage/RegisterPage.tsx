import { useState } from 'react';
import type { FormEvent } from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthCard } from '../../components/AuthCard/AuthCard';
import { AuthHeader } from '../../components/AuthHeader/AuthHeader';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import { getApiErrorMessage } from '../../api/api';
import type { CadastroUsuarioPayload } from '../../types';
import './RegisterPage.css';

export interface RegisterPageProps {
  onRegister?: (data: CadastroUsuarioPayload) => Promise<void> | void;
  onNavigateToLogin?: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onRegister?.({ nome: nome.trim(), email: email.trim(), senha });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Erro ao criar conta.'));
    } finally {
      setLoading(false);
    }
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {error && <p className="register-error">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </Button>
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
