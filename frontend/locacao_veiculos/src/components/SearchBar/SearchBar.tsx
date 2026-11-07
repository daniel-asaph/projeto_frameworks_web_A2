import type { InputHTMLAttributes } from 'react';
import searchIcon from '../../assets/search.svg';
import './SearchBar.css';

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ className = '', placeholder = 'Pesquisar', ...props }: SearchBarProps) {
  return (
    <div className={`search-bar ${className}`.trim()}>
      <img src={searchIcon} alt="" className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
