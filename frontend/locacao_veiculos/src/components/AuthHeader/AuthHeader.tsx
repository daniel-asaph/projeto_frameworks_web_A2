
import './AuthHeader.css';

export interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <header className="auth-header">
      <h1 className="auth-title">{title}</h1>
      <p className="auth-subtitle">{subtitle}</p>
    </header>
  );
}
