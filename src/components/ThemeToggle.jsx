import { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import './ThemeToggle.css';

const themes = [
  { id: 'dark', label: 'Dark', icon: Moon, colors: ['#7cff67', '#B497CF', '#5227FF'] },
  { id: 'purple', label: 'Purple', icon: Monitor, colors: ['#3A29FF', '#FF94B4', '#FF3232'] },
  { id: 'ocean', label: 'Ocean', icon: Sun, colors: ['#00d4ff', '#00ff88', '#0077ff'] },
  { id: 'fire', label: 'Fire', icon: Palette, colors: ['#ff6b00', '#ffcc00', '#ff0066'] },
];

export default function ThemeToggle({ currentTheme, onThemeChange }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handle = () => setOpen(false);
    setTimeout(() => document.addEventListener('click', handle, { once: true }), 50);
    return () => document.removeEventListener('click', handle);
  }, [open]);

  const current = themes.find(t => t.id === currentTheme) || themes[0];
  const Icon = current.icon;

  return (
    <div className="theme-toggle">
      <button className="theme-toggle__btn" onClick={() => setOpen(!open)} aria-label="Выбрать тему">
        <Icon size={20} />
      </button>
      {open && (
        <div className="theme-toggle__menu">
          {themes.map(t => {
            const TIcon = t.icon;
            return (
              <button
                key={t.id}
                className={`theme-toggle__item ${t.id === currentTheme ? 'active' : ''}`}
                onClick={() => { onThemeChange(t.id); setOpen(false); }}
              >
                <span className="theme-toggle__swatch" style={{ background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})` }} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
