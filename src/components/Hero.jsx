import { Link } from 'react-router-dom';
import { Wrench, Users, ShoppingBag, ArrowRight, Sparkles, Globe, Cpu } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Хаб для вайб-кодеров</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-title__main">RIXHUB</span>
          <span className="hero-title__sub">
            Строй. Делись. Зарабатывай.
          </span>
        </h1>

        <p className="hero-desc">
          Единая платформа для разработчиков с ИИ-инструментами, сообществом и маркетплейсом. 
          Всё, что нужно для создания проектов нового поколения — в одном месте.
        </p>

        <div className="hero-cta">
          <Link to="/tools" className="hero-btn hero-btn--primary">
            <Cpu size={18} />
            Начать строить
            <ArrowRight size={16} />
          </Link>
          <Link to="/community" className="hero-btn hero-btn--secondary">
            <Globe size={18} />
            Присоединиться
          </Link>
        </div>

        <div className="hero-directions">
          <Link to="/tools" className="direction-card">
            <div className="direction-card__icon">
              <Wrench size={28} />
            </div>
            <h3>Инструменты</h3>
            <p>Тир-листы ИИ, промпты, гайды и полезные сервисы для билдеров</p>
            <span className="direction-card__link">
              Перейти <ArrowRight size={14} />
            </span>
          </Link>

          <Link to="/community" className="direction-card">
            <div className="direction-card__icon">
              <Users size={28} />
            </div>
            <h3>Сообщество</h3>
            <p>Новости, посты пользователей и AI-дайджест ежедневных новостей</p>
            <span className="direction-card__link">
              Перейти <ArrowRight size={14} />
            </span>
          </Link>

          <Link to="/marketplace" className="direction-card">
            <div className="direction-card__icon">
              <ShoppingBag size={28} />
            </div>
            <h3>Маркетплейс</h3>
            <p>Магазин ресурсов и биржа заказов: найди клиента или билдера</p>
            <span className="direction-card__link">
              Перейти <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
