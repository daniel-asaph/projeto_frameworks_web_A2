import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'disabled-muted';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn-primary ${variant === 'disabled-muted' ? 'btn-disabled-muted' : ''} ${className}`
        .replace(/\s+/g, ' ')
        .trim()}
      {...props}
    >
      {children}
    </button>
  );
}
