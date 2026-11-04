import './AuthFooter.css';

export interface AuthFooterProps {
  text: string;
  linkText: string;
  onActionClick?: () => void;
}

export function AuthFooter({ text, linkText, onActionClick }: AuthFooterProps) {
  return (
    <footer className="auth-footer">
      <p className="auth-footer-text">
        {text}{' '}
        <button
          type="button"
          className="auth-footer-link"
          onClick={onActionClick}
        >
          {linkText}
        </button>
      </p>
    </footer>
  );
}
