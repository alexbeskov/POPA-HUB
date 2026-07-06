const fs = require("fs");
const path = require("path");

const SITE_URL = "https://code-phi-lime.vercel.app";

const pages = [
  {
    slug: "",
    title: "RixHub — AI-инструменты, промпты и гайды для вайбкодинга",
    description:
      "AI-хаб для вайбкодинга: 438+ инструментов, 120+ промптов, 24 гайда. Собирай MVP быстрее с искусственным интеллектом.",
    keywords:
      "AI, вайбкодинг, промпты, гайды, инструменты, MVP, no-code, vibe coding, искусственный интеллект",
  },
  {
    slug: "tierlist",
    title: "Тир-лист ИИ — рейтинг моделей для кода и дизайна | RixHub",
    description:
      "Актуальный рейтинг AI-моделей для вайбкодинга: сравнение моделей, IDE, агентов и инструментов для разработки.",
    keywords: "AI tier list, рейтинг ИИ, модели для кода, vibe coding, AI IDE, агенты, сравнение ИИ",
  },
  {
    slug: "prompts",
    title: "Промпты для AI — готовые запросы для разработки и дизайна | RixHub",
    description:
      "Библиотека готовых промптов для UI, архитектуры, контента, тестов и автоматизации. Копируй и используй.",
    keywords: "промпты, prompts, AI запросы, промпты для разработки, промпты для дизайна, ChatGPT prompts",
  },
  {
    slug: "guides",
    title: "Гайды по вайбкодингу — от идеи до MVP | RixHub",
    description:
      "Пошаговые маршруты для тех, кто хочет научиться вайбкодить и быстрее собирать MVP с AI.",
    keywords: "гайды, вайбкодинг обучение, vibe coding tutorial, как собрать MVP, обучение AI",
  },
  {
    slug: "services",
    title: "AI-сервисы и API — каталог инструментов для билдинга | RixHub",
    description:
      "Каталог AI-сервисов, API, no-code инструментов и boilerplate-наборов для быстрого создания проектов.",
    keywords: "AI сервисы, API, no-code, boilerplate, инструменты для разработки, UI builders",
  },
  {
    slug: "free",
    title: "Бесплатные ресурсы для AI-билдинга — курсы, шаблоны, ассеты | RixHub",
    description:
      "Бесплатные курсы, шаблоны проектов, дизайн-ассеты и чеклисты для запуска без бюджета.",
    keywords: "бесплатные ресурсы, шаблоны проектов, дизайн ассеты, чеклисты, бесплатные курсы AI",
  },
  {
    slug: "marketplace",
    title: "Marketplace — шаблоны, паки промптов и UI-наборы | RixHub",
    description:
      "Магазин ресурсов для AI-билдинга: шаблоны проектов, паки промптов, готовые UI-наборы и услуги.",
    keywords: "marketplace, шаблоны проектов, паки промптов, UI-наборы, AI услуги",
  },
  {
    slug: "about",
    title: "О RixHub — AI-хаб для вайб-кодеров",
    description:
      "RixHub — это сообщество и платформа для тех, кто учится вайбкодить и быстрее запускать проекты с AI.",
    keywords: "RixHub, о нас, vibe coding community, AI хаб, вайбкодинг сообщество",
  },
  {
    slug: "community",
    title: "Сообщество RixHub — новости, обсуждения, разборы проектов",
    description:
      "Присоединяйся к сообществу RixHub: новости, обсуждения, разборы проектов и ежедневные AI-находки.",
    keywords: "сообщество RixHub, AI новости, разборы проектов, vibe coding community",
  },
];

const distDir = path.join(__dirname, "..", "dist");
const indexHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, "utf-8");

for (const page of pages) {
  const pageDir = page.slug ? path.join(distDir, page.slug) : distDir;
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  const url = page.slug ? `${SITE_URL}/${page.slug}` : SITE_URL;

  const extraMeta = `
    <meta name="description" content="${page.description}" />
    <meta name="keywords" content="${page.keywords}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
  `;

  let html = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"[^>]*>\n?/g, "")
    .replace(/<meta name="keywords" content="[^"]*"[^>]*>\n?/g, "")
    .replace(/<meta name="author" content="RixHub"[^>]*>\n?/g, "")
    .replace(/<meta property="og:site_name" content="RixHub"[^>]*>\n?/g, "")
    .replace(/<meta property="og:type" content="website"[^>]*>\n?/g, "");

  html = html.replace("</head>", `${extraMeta.trim()}\n  </head>`);

  fs.writeFileSync(path.join(pageDir, "index.html"), html);
  console.log(`Generated: ${page.slug || "index"}/index.html`);
}

console.log("Done.");
