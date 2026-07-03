import { Users, Newspaper, MessageCircle, Bot, TrendingUp, Calendar } from 'lucide-react';
import './Community.css';

const communityBlocks = [
  {
    title: 'Лента новостей',
    icon: Newspaper,
    desc: 'Последние события из мира ИИ, релизы моделей и обновления инструментов.',
    stat: '0 постов',
  },
  {
    title: 'Посты пользователей',
    icon: MessageCircle,
    desc: 'Делитесь проектами, задавайте вопросы и получайте фидбек от сообщества.',
    stat: '0 обсуждений',
  },
  {
    title: 'AI-дайджест',
    icon: Bot,
    desc: 'Ежедневная подборка главных новостей про мир ИИ — кратко и по делу.',
    stat: 'Следующий: скоро',
  },
];

export default function Community() {
  return (
    <section className="page-section">
      <div className="page-section__inner">
        <div className="page-header">
          <div className="page-header__icon">
            <Users size={28} />
          </div>
          <h1>Сообщество</h1>
          <p>Общайтесь, делитесь опытом и будьте в курсе всего</p>
        </div>

        <div className="community-grid">
          {communityBlocks.map((block, i) => {
            const Icon = block.icon;
            return (
              <div key={i} className="community-card">
                <div className="community-card__header">
                  <div className="community-card__icon">
                    <Icon size={22} />
                  </div>
                  <div className="community-card__meta">
                    <h3>{block.title}</h3>
                    <span className="community-card__stat">{block.stat}</span>
                  </div>
                </div>
                <p className="community-card__desc">{block.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="community-stats">
          <div className="stat-item">
            <TrendingUp size={20} />
            <span className="stat-value">0</span>
            <span className="stat-label">Пользователей</span>
          </div>
          <div className="stat-item">
            <Newspaper size={20} />
            <span className="stat-value">0</span>
            <span className="stat-label">Постов</span>
          </div>
          <div className="stat-item">
            <Calendar size={20} />
            <span className="stat-value">0</span>
            <span className="stat-label">Дайджестов</span>
          </div>
        </div>
      </div>
    </section>
  );
}
