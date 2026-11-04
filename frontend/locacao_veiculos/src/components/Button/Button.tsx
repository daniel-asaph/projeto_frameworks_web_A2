import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, type = 'button', className = '', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn-primary ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
