import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, MessageCircle } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <Zap size={20} />
            <span>RIXHUB</span>
          </div>
          <p className="footer__tagline">Хаб для вайб-кодеров. Строй. Делись. Зарабатывай.</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Платформа</h4>
            <Link to="/tools">Инструменты</Link>
            <Link to="/community">Сообщество</Link>
            <Link to="/marketplace">Маркетплейс</Link>
          </div>
          <div className="footer__col">
            <h4>Ресурсы</h4>
            <span>Гайды</span>
            <span>Промпты</span>
            <span>Тир-листы ИИ</span>
          </div>
          <div className="footer__col">
            <h4>Соцсети</h4>
            <a href="#" target="_blank" rel="noopener noreferrer"><Github size={14} /> GitHub</a>
            <a href="#" target="_blank" rel="noopener noreferrer"><Twitter size={14} /> Twitter / X</a>
            <a href="#" target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /> Discord</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} RIXHUB. Все права защищены.</span>
      </div>
    </footer>
  );
}
