import { Link, useLocation } from 'react-router-dom';
import { Wrench, Users, ShoppingBag, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

export default function Header({ currentTheme, onThemeChange }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная', icon: Zap },
    { path: '/tools', label: 'Инструменты', icon: Wrench },
    { path: '/community', label: 'Сообщество', icon: Users },
    { path: '/marketplace', label: 'Маркетплейс', icon: ShoppingBag },
  ];

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <Zap size={24} className="header__logo-icon" />
          <span className="header__logo-text">RIXHUB</span>
        </Link>

        <nav className={`header__nav ${mobileOpen ? 'open' : ''}`}>
          {navItems.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`header__link ${active ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="header__actions">
          <ThemeToggle currentTheme={currentTheme} onThemeChange={onThemeChange} />
          <button className="header__burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
