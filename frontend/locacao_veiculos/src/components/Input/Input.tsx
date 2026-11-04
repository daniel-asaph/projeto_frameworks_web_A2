import React from 'react';
import './Input.css';

export type InputIconType = 'mail' | 'lock' | 'user';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: InputIconType;
}

function renderIcon(icon?: InputIconType) {
  switch (icon) {
    case 'mail':
      return (
        <svg
          className="input-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case 'lock':
      return (
        <svg
          className="input-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'user':
      return (
        <svg
          className="input-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    default:
      return null;
  }
}

export function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div className="input-wrapper">
      {icon && <span className="input-icon-container">{renderIcon(icon)}</span>}
      <input
        className={`input-field ${icon ? 'with-icon' : ''} ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
