import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  BookOpenText,
  Boxes,
  Code2,
  Gift,
  Github,
  Globe2,
  Menu,
  MessageCircle,
  ShoppingBag,
  Send,
  Network,
  SquareTerminal,
  Trophy,
  UsersRound,
  Wand2,
  X,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import Aurora from "./components/Aurora";
import CountUp from "./components/CountUp";

type Lang = "ru" | "en";
type Page =
  | "home"
  | "tierlist"
  | "prompts"
  | "guides"
  | "services"
  | "free"
  | "marketplace"
  | "about"
  | "community";

const AURORA_COLORS: [string, string, string] = ["#75FF67", "#00D6B8", "#126BFF"];

const navItems: Array<{ page: Page; ru: string; en: string }> = [
  { page: "home", ru: "Инструменты", en: "Tools" },
  { page: "marketplace", ru: "Marketplace", en: "Marketplace" },
  { page: "about", ru: "О нас", en: "About" },
  { page: "community", ru: "Сообщество", en: "Community" },
];

const pageRoutes: Page[] = [
  "home",
  "tierlist",
  "prompts",
  "guides",
  "services",
  "free",
  "marketplace",
  "about",
  "community",
];

const copy = {
  ru: {
    heroTitle: "RixHub",
    heroText:
      "AI-инструменты, промпты и гайды для тех, кто учится вайбкодить и быстрее собирает проекты.",
    start: "Начать",
    explore: "Смотреть разделы",
    search: "Найти промпт, сервис, гайд или бесплатный ресурс",
    stats: [
      ["438+", "инструментов"],
      ["120+", "промптов"],
      ["24", "гайда"],
      ["0₽", "старт"],
    ],
    categories: [
      {
        page: "tierlist" as Page,
        title: "Тир-лист ИИ",
        text: "Сравни модели, IDE и ИИ-агентов под код, дизайн, ресёрч и быстрый запуск.",
        action: "Сравнить",
      },
      {
        page: "prompts" as Page,
        title: "Промпты",
        text: "Готовые запросы для UI, архитектуры, контента, тестов и автоматизаций.",
        action: "Открыть",
      },
      {
        page: "guides" as Page,
        title: "Гайды",
        text: "Пошаговые маршруты: от первой идеи до MVP, деплоя и портфолио.",
        action: "Учиться",
      },
      {
        page: "services" as Page,
        title: "Сервисы",
        text: "Каталог AI-сервисов, API, no-code и boilerplate-наборов для билдинга.",
        action: "Найти",
      },
      {
        page: "free" as Page,
        title: "Бесплатные ресурсы",
        text: "Курсы, шаблоны, ассеты и чеклисты, с которых можно стартовать без бюджета.",
        action: "Забрать",
      },
    ],
    sectionsTitle: "Разделы хаба",
    sectionsText:
      "Быстрый доступ к инструментам, промптам, гайдам, сервисам и бесплатным ресурсам для билдинга с AI.",
    stack: ["choose AI model", "generate UI", "connect services", "ship MVP"],
    roadmapTitle: "Быстрый маршрут",
    roadmap: ["Найди инструмент", "Забери промпт", "Пройди гайд", "Собери MVP"],
    footer: "Сделано как тёмный AI-хаб для людей, которые хотят быстрее учиться, строить и запускать.",
    back: "На главную",
    soon: "Скоро ссылка",
  },
  en: {
    heroTitle: "RixHub",
    heroText: "AI tools, prompts and guides for people learning vibe coding and building faster.",
    start: "Start",
    explore: "Explore sections",
    search: "Find a prompt, service, guide or free resource",
    stats: [
      ["438+", "tools"],
      ["120+", "prompts"],
      ["24", "guides"],
      ["$0", "start"],
    ],
    categories: [
      {
        page: "tierlist" as Page,
        title: "AI tier list",
        text: "Compare models, IDEs and AI agents for code, design, research and fast launches.",
        action: "Compare",
      },
      {
        page: "prompts" as Page,
        title: "Prompts",
        text: "Ready prompts for UI, architecture, content, testing and automation.",
        action: "Open",
      },
      {
        page: "guides" as Page,
        title: "Guides",
        text: "Step-by-step routes from first idea to MVP, deploy and portfolio.",
        action: "Learn",
      },
      {
        page: "services" as Page,
        title: "Services",
        text: "A catalog of AI services, APIs, no-code tools and boilerplates for building.",
        action: "Find",
      },
      {
        page: "free" as Page,
        title: "Free resources",
        text: "Courses, templates, assets and checklists you can start with for free.",
        action: "Grab",
      },
    ],
    sectionsTitle: "Hub Sections",
    sectionsText:
      "Fast access to tools, prompts, guides, services and free resources for building with AI.",
    stack: ["choose AI model", "generate UI", "connect services", "ship MVP"],
    roadmapTitle: "Fast route",
    roadmap: ["Find a tool", "Grab a prompt", "Follow a guide", "Ship an MVP"],
    footer: "Built as a dark AI hub for people who want to learn, build and launch faster.",
    back: "Back home",
    soon: "Link soon",
  },
};

const pageContent: Record<
  Page,
  {
    icon: LucideIcon;
    tone: string;
    ru: { eyebrow: string; title: string; text: string; cards: string[] };
    en: { eyebrow: string; title: string; text: string; cards: string[] };
  }
> = {
  home: {
    icon: Code2,
    tone: "teal",
    ru: { eyebrow: "Home", title: "RixHub", text: "", cards: [] },
    en: { eyebrow: "Home", title: "RixHub", text: "", cards: [] },
  },
  tierlist: {
    icon: Trophy,
    tone: "teal",
    ru: {
      eyebrow: "Рейтинги ИИ",
      title: "Тир-лист ИИ",
      text: "Отдельный экран для рейтингов AI-моделей, редакторов, агентов и инструментов по задачам.",
      cards: ["Лучшие модели для кода", "AI IDE и агенты", "Инструменты для дизайна", "Автоматизация и ресёрч"],
    },
    en: {
      eyebrow: "AI rankings",
      title: "AI tier list",
      text: "A separate screen for rankings of AI models, editors, agents and tools by task.",
      cards: ["Best coding models", "AI IDEs and agents", "Design tools", "Automation and research"],
    },
  },
  prompts: {
    icon: Wand2,
    tone: "violet",
    ru: {
      eyebrow: "Prompt library",
      title: "Промпты",
      text: "Библиотека готовых промптов для разработки, дизайна, контента, тестов и запуска проектов.",
      cards: ["UI и лендинги", "Архитектура проекта", "Контент и маркетинг", "Тесты и ревью кода"],
    },
    en: {
      eyebrow: "Prompt library",
      title: "Prompts",
      text: "A library of ready prompts for development, design, content, testing and launching projects.",
      cards: ["UI and landing pages", "Project architecture", "Content and marketing", "Tests and code review"],
    },
  },
  guides: {
    icon: BookOpen,
    tone: "teal",
    ru: {
      eyebrow: "Learning routes",
      title: "Гайды",
      text: "Пошаговые маршруты для тех, кто хочет научиться вайбкодить и быстрее собирать MVP.",
      cards: ["Старт с нуля", "Первый AI-проект", "Деплой и домен", "Как собрать портфолио"],
    },
    en: {
      eyebrow: "Learning routes",
      title: "Guides",
      text: "Step-by-step routes for people who want to learn vibe coding and ship MVPs faster.",
      cards: ["Start from zero", "First AI project", "Deploy and domain", "Build a portfolio"],
    },
  },
  services: {
    icon: Boxes,
    tone: "blue",
    ru: {
      eyebrow: "Tool directory",
      title: "Сервисы",
      text: "Каталог AI-сервисов, API, no-code инструментов и boilerplate-наборов для билдинга.",
      cards: ["AI API", "No-code и automation", "UI builders", "Хостинг и базы данных"],
    },
    en: {
      eyebrow: "Tool directory",
      title: "Services",
      text: "A catalog of AI services, APIs, no-code tools and boilerplates for building.",
      cards: ["AI APIs", "No-code and automation", "UI builders", "Hosting and databases"],
    },
  },
  free: {
    icon: Gift,
    tone: "teal",
    ru: {
      eyebrow: "Бесплатные наборы",
      title: "Бесплатные ресурсы",
      text: "Курсы, шаблоны, ассеты, чеклисты и наборы, с которых можно стартовать без бюджета.",
      cards: ["Бесплатные курсы", "Шаблоны проектов", "Дизайн-ассеты", "Чеклисты запуска"],
    },
    en: {
      eyebrow: "Free kits",
      title: "Free resources",
      text: "Courses, templates, assets, checklists and kits you can start with for free.",
      cards: ["Free courses", "Project templates", "Design assets", "Launch checklists"],
    },
  },
  marketplace: {
    icon: ShoppingBag,
    tone: "blue",
    ru: {
      eyebrow: "RixHub marketplace",
      title: "Marketplace",
      text: "Отдельный экран для будущего магазина ресурсов, шаблонов, заказов и наборов для AI-билдинга.",
      cards: ["Шаблоны проектов", "Паки промптов", "Готовые UI-наборы", "Заказы и услуги"],
    },
    en: {
      eyebrow: "RixHub marketplace",
      title: "Marketplace",
      text: "A separate screen for future resources, templates, orders and kits for AI building.",
      cards: ["Project templates", "Prompt packs", "Ready UI kits", "Orders and services"],
    },
  },
  about: {
    icon: Globe2,
    tone: "teal",
    ru: {
      eyebrow: "RixHub socials",
      title: "О нас",
      text: "RixHub будет жить не только как сайт, но и как комьюнити: видео, посты, исходники, обсуждения и быстрые находки для вайб-кодеров.",
      cards: [],
    },
    en: {
      eyebrow: "RixHub socials",
      title: "About us",
      text: "RixHub will live beyond the website: videos, posts, source files, discussions and fast discoveries for vibe coders.",
      cards: [],
    },
  },
  community: {
    icon: UsersRound,
    tone: "violet",
    ru: {
      eyebrow: "RixHub community",
      title: "Сообщество",
      text: "Место для участников RixHub: новости, обсуждения, разборы проектов и быстрые находки для вайб-кодеров.",
      cards: ["Новости RixHub", "Разборы проектов", "Посты участников", "Ежедневные AI-находки"],
    },
    en: {
      eyebrow: "RixHub community",
      title: "Community",
      text: "A place for RixHub members: news, discussions, project reviews and fast finds for vibe coders.",
      cards: ["RixHub news", "Project reviews", "Member posts", "Daily AI finds"],
    },
  },
};

const icons = [Trophy, SquareTerminal, BookOpenText, Network, Gift];
const socialLinks = [
  { label: "YouTube", icon: Youtube },
  { label: "Telegram", icon: Send },
  { label: "GitHub", icon: Github },
  { label: "X", icon: X },
  { label: "Reddit", icon: MessageCircle },
  { label: "Telegram Community", icon: UsersRound },
];

const footerSocials = [
  { label: "YouTube", href: "#about", icon: Youtube },
  { label: "Telegram", href: "#about", icon: Send },
  { label: "GitHub", href: "#about", icon: Github },
  { label: "X / Twitter", href: "#about", icon: X },
  { label: "Reddit", href: "#about", icon: MessageCircle },
  { label: "Telegram Community", href: "#about", icon: UsersRound },
];

const getPageFromHash = (): Page => {
  const hash = window.location.hash.replace("#", "") as Page;
  return pageRoutes.includes(hash) ? hash : "home";
};

const getPageHref = (page: Page) => (page === "home" ? "#" : `#${page}`);

function AnimatedTitle({ text }: { text: string }) {
  return (
    <span className="animated-title" aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span
          aria-hidden="true"
          key={`${char}-${index}`}
          style={{ "--char-index": index } as React.CSSProperties}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function AnimatedMetricValue({ value, index }: { value: string; index: number }) {
  const parts = value.match(/^([^0-9]*)(\d+)(.*)$/);

  if (!parts) {
    return <>{value}</>;
  }

  const [, prefix, amount, suffix] = parts;
  const target = Number(amount);
  const isZeroTarget = target === 0;

  return (
    <>
      {prefix}
      <CountUp
        from={isZeroTarget ? 0 : 0}
        to={isZeroTarget ? 24 : target}
        direction={isZeroTarget ? "down" : "up"}
        delay={0.12 + index * 0.08}
        duration={1.35}
        separator=" "
        className="count-up-text"
      />
      {suffix}
    </>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activePage, setActivePage] = useState<Page>(getPageFromHash);
  const t = copy[lang];

  const sections = useMemo(
    () => t.categories.map((category, index) => ({ ...category, icon: icons[index] })),
    [t],
  );

  useEffect(() => {
    const move = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (window.location.hash === "#home") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const syncPage = () => {
      setActivePage(getPageFromHash());
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const initialPage = getPageFromHash();
    setActivePage(initialPage);
    setMenuOpen(false);

    window.addEventListener("hashchange", syncPage);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("hashchange", syncPage);
    };
  }, []);

  const renderHome = () => (
    <>
      <section className="shell hero">
        <div className="home-hub">
          <div className="section-heading reveal">
            <div>
              <h2>{t.sectionsTitle}</h2>
            </div>
          </div>

          <div className="metrics home-metrics reveal delay-2" aria-label="RixHub stats">
            {t.stats.map(([value, label], index) => (
              <a
                className="metric"
                href="#tierlist"
                key={label}
                style={{ "--reveal-delay": `${220 + index * 70}ms` } as React.CSSProperties}
              >
                <strong>
                  <AnimatedMetricValue value={value} index={index} />
                </strong>
                <span>{label}</span>
              </a>
            ))}
          </div>

          <div className="section-grid">
            {sections.map(({ title, text, icon: Icon, page }, index) => (
              <a
                className={`section-card reveal ${
                  index === 1 ? "violet" : index === 3 ? "blue" : "teal"
                }`}
                href={`#${page}`}
                key={title}
                style={{ "--reveal-delay": `${160 + index * 90}ms` } as React.CSSProperties}
              >
                <div className="section-card-top">
                  <span className="section-icon">
                    <Icon size={24} />
                  </span>
                </div>
                <div className="section-card-body">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <span className="section-card-action">
                  {lang === "ru" ? "Перейти" : "Open"}
                  <ArrowUpRight size={15} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </>
  );

  const renderPage = () => {
    if (activePage === "about") {
      return <AboutPage lang={lang} soon={t.soon} back={t.back} />;
    }

    const page = pageContent[activePage];
    const data = page[lang];
    const Icon = page.icon;

    return (
      <section className="shell page-view">
        <a className="back-link" href={getPageHref("home")}>
          <ArrowLeft size={17} />
          {t.back}
        </a>
        <div className={`page-hero reveal ${page.tone}`}>
          <span className="page-icon">
            <Icon size={30} />
          </span>
          <span className="eyebrow compact">{data.eyebrow}</span>
          <h1>
            <AnimatedTitle text={data.title} />
          </h1>
          <p className="reveal delay-2">{data.text}</p>
        </div>

        <div className="page-layout">
          <div className="page-panel page-main-panel reveal delay-3">
            <h2>{lang === "ru" ? "Что будет внутри" : "What will be inside"}</h2>
            <div className="page-list">
              {data.cards.map((card, index) => (
                <article key={card}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{card}</strong>
                  <ArrowUpRight size={17} />
                </article>
              ))}
            </div>
          </div>
          <div className="page-panel reveal delay-4">
            <h3>{lang === "ru" ? "Статус раздела" : "Section status"}</h3>
            <p>
              {lang === "ru"
                ? "Сейчас это отдельная страница-заготовка. Потом сюда можно добавить фильтры, поиск, карточки материалов и реальные ссылки."
                : "This is a separate starter screen now. Later we can add filters, search, resource cards and real links here."}
            </p>
            <a className="secondary-button" href="#about">
              {lang === "ru" ? "Перейти в О нас" : "Open About"}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="app">
      <div
        className="cursor"
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
      />
      <div className="cursor-ring" style={{ left: cursor.x, top: cursor.y }} />

      <div className="background" aria-hidden="true">
        <div className="aurora-layer">
          <Aurora colorStops={AURORA_COLORS} blend={0.95} amplitude={0.78} speed={0.5} />
        </div>
        <div className="scan-grid" />
        <div className="particles">
          {Array.from({ length: 22 }).map((_, index) => (
            <span key={index} style={{ "--i": index } as React.CSSProperties} />
          ))}
        </div>
      </div>

      <header className="shell header">
        <a className="brand" href={getPageHref("home")} aria-label="RixHub home">
          <span className="brand-mark">
            <Code2 size={18} />
          </span>
          RixHub
        </a>

        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              className={activePage === item.page ? "active" : ""}
              href={getPageHref(item.page)}
              key={item.page}
            >
              {lang === "ru" ? item.ru : item.en}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language" aria-label="Language switch">
            <button className={lang === "ru" ? "active" : ""} onClick={() => setLang("ru")}>
              RU
            </button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
          <button
            className="menu-button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>{activePage === "home" ? renderHome() : renderPage()}</main>

      <footer className="shell footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-logo" href={getPageHref("home")}>
              <Code2 size={18} />
              <span>RixHub</span>
            </a>
            <p>
              {lang === "ru"
                ? "Твоя панель старта в AI-билдинг."
                : "A hub for vibe coders. Build. Share. Launch faster."}
            </p>
          </div>

          <div className="footer-socials">
            <strong>{lang === "ru" ? "Соцсети" : "Socials"}</strong>
            <div className="footer-social-links">
              {footerSocials.map(({ label, href, icon: Icon }) => (
                <a href={href} key={label}>
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-devs">
            {lang === "ru" ? "Разработчики" : "Developers"} <span>@Rixy141</span> <span>@Raulge57</span>
          </p>
          <p>© 2026 RixHub. {lang === "ru" ? "Все права защищены." : "All rights reserved."}</p>
        </div>
      </footer>
    </div>
  );
}

function AboutPage({ lang, soon, back }: { lang: Lang; soon: string; back: string }) {
  const data = pageContent.about[lang];

  return (
    <section className="shell page-view about-page">
      <a className="back-link" href={getPageHref("home")}>
        <ArrowLeft size={17} />
        {back}
      </a>
      <div className="page-hero teal">
        <span className="page-icon">
          <Globe2 size={30} />
        </span>
        <span className="eyebrow compact">{data.eyebrow}</span>
        <h1>
          <AnimatedTitle text={data.title} />
        </h1>
        <p className="reveal delay-2">{data.text}</p>
      </div>

      <div className="social-grid" aria-label="RixHub social links">
        {socialLinks.map(({ label, icon: Icon }, index) => (
          <a
            className="social-card reveal"
            href="#"
            key={label}
            aria-label={label}
            style={{ "--reveal-delay": `${160 + index * 80}ms` } as React.CSSProperties}
          >
            <span>
              <Icon size={23} />
            </span>
            <strong>{label}</strong>
            <em>
              {soon}
              <ArrowUpRight size={15} />
            </em>
          </a>
        ))}
      </div>
    </section>
  );
}

export default App;
