import { ShoppingBag, Store, Briefcase, Search, Filter, ArrowRight } from 'lucide-react';
import './Marketplace.css';

const marketplaceSections = [
  {
    title: 'Магазин ресурсов',
    icon: Store,
    desc: 'Готовые шаблоны, компоненты, UI-киты и код для быстрого старта проектов.',
    tags: ['UI-киты', 'Шаблоны', 'Компоненты', 'API-интеграции'],
  },
  {
    title: 'Биржа заказов',
    icon: Briefcase,
    desc: 'Найдите заказчика для своего проекта или наймите билдера для задачи.',
    tags: ['Веб-разработка', 'Мобильные apps', 'ИИ-интеграции', 'Аудит кода'],
  },
];

export default function Marketplace() {
  return (
    <section className="page-section">
      <div className="page-section__inner">
        <div className="page-header">
          <div className="page-header__icon">
            <ShoppingBag size={28} />
          </div>
          <h1>Маркетплейс</h1>
          <p>Покупайте, продавайте и находите заказы в одном месте</p>
        </div>

        <div className="marketplace-grid">
          {marketplaceSections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div key={i} className="marketplace-card">
                <div className="marketplace-card__header">
                  <div className="marketplace-card__icon">
                    <Icon size={24} />
                  </div>
                  <h3>{section.title}</h3>
                </div>
                <p className="marketplace-card__desc">{section.desc}</p>
                <div className="marketplace-card__tags">
                  {section.tags.map((tag, j) => (
                    <span key={j} className="market-tag">{tag}</span>
                  ))}
                </div>
                <div className="marketplace-card__actions">
                  <button className="market-btn market-btn--primary">
                    <Search size={14} />
                    Искать
                  </button>
                  <button className="market-btn market-btn--secondary">
                    <Filter size={14} />
                    Фильтры
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="marketplace-cta">
          <h3>Хотите разместить свой продукт?</h3>
          <p>Скоро здесь появится возможность для разработчиков публиковать свои ресурсы и услуги.</p>
          <button className="market-btn market-btn--primary">
            Узнать первым <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
