import { useState } from 'react';
import type { FormEvent } from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthCard } from '../../components/AuthCard/AuthCard';
import { AuthHeader } from '../../components/AuthHeader/AuthHeader';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import type { CadastroUsuarioPayload } from '../../types';
import './RegisterPage.css';

export interface RegisterPageProps {
  onRegister?: (data: CadastroUsuarioPayload) => void;
  onNavigateToLogin?: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister?.({ nome: nome.trim(), email: email.trim(), senha });
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
