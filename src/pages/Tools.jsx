import { Wrench, Cpu, BookOpen, Layers, MessageSquare, ExternalLink } from 'lucide-react';
import './Tools.css';

const toolCategories = [
  {
    title: 'Тир-листы ИИ',
    icon: Layers,
    desc: 'Рейтинги лучших ИИ-моделей для разработки: код-генерация, рефакторинг, архитектура.',
    items: ['GPT-4o', 'Claude 3.5', 'o1-preview', 'Gemini 1.5 Pro'],
  },
  {
    title: 'Промпты',
    icon: MessageSquare,
    desc: 'Готовые промпты для быстрого старта проектов, рефакторинга и генерации кода.',
    items: ['Старт проекта', 'Рефакторинг', 'Архитектура', 'UI-компоненты'],
  },
  {
    title: 'Гайды',
    icon: BookOpen,
    desc: 'Пошаговые инструкции по вайб-кодингу, деплою и настройке инструментов.',
    items: ['Vibe Coding 101', 'Deploy на Vercel', 'CI/CD для ИИ-проектов'],
  },
  {
    title: 'Сервисы',
    icon: ExternalLink,
    desc: 'Полезные сервисы для разработчиков: хостинг, аналитика, мониторинг.',
    items: ['Vercel', 'Supabase', 'Railway', 'PostHog'],
  },
];

export default function Tools() {
  return (
    <section className="page-section">
      <div className="page-section__inner">
        <div className="page-header">
          <div className="page-header__icon">
            <Wrench size={28} />
          </div>
          <h1>Инструменты</h1>
          <p>Всё, что нужно для эффективной разработки с ИИ</p>
        </div>

        <div className="tools-grid">
          {toolCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="tool-card">
                <div className="tool-card__header">
                  <div className="tool-card__icon">
                    <Icon size={22} />
                  </div>
                  <h3>{cat.title}</h3>
                </div>
                <p className="tool-card__desc">{cat.desc}</p>
                <div className="tool-card__tags">
                  {cat.items.map((item, j) => (
                    <span key={j} className="tool-tag">{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
