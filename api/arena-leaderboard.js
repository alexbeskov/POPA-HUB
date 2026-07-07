const MAX_MODELS = 15;

const BOARD_CONFIGS = [
  {
    id: "agent",
    label: "Agent",
    labelRu: "Агенты",
    url: "https://arena.ai/leaderboard/agent",
    type: "agent",
  },
  {
    id: "chat-text",
    label: "Chat / Text",
    labelRu: "Chat / Text",
    url: "https://arena.ai/leaderboard/text/overall",
    type: "standard",
  },
  {
    id: "webdev",
    label: "WebDev",
    labelRu: "WebDev",
    url: "https://arena.ai/leaderboard/code/webdev",
    type: "standard",
  },
  {
    id: "image-to-webdev",
    label: "Image to WebDev",
    labelRu: "Image to WebDev",
    url: "https://arena.ai/leaderboard/code/image-to-webdev",
    type: "standard",
  },
  {
    id: "text-to-image",
    label: "Text to Image",
    labelRu: "Text to Image",
    url: "https://arena.ai/leaderboard/text-to-image",
    type: "standard",
  },
  {
    id: "image-edit",
    label: "Image Edit",
    labelRu: "Image Edit",
    url: "https://arena.ai/leaderboard/image-edit",
    type: "standard",
  },
  {
    id: "text-to-video",
    label: "Text to Video",
    labelRu: "Text to Video",
    url: "https://arena.ai/leaderboard/text-to-video",
    type: "standard",
  },
  {
    id: "image-to-video",
    label: "Image to Video",
    labelRu: "Image to Video",
    url: "https://arena.ai/leaderboard/image-to-video",
    type: "standard",
  },
  {
    id: "video-edit",
    label: "Video Edit",
    labelRu: "Video Edit",
    url: "https://arena.ai/leaderboard/video-edit",
    type: "standard",
  },
  {
    id: "vision",
    label: "Vision",
    labelRu: "Vision",
    url: "https://arena.ai/leaderboard/vision",
    type: "standard",
  },
  {
    id: "document",
    label: "Document",
    labelRu: "Document",
    url: "https://arena.ai/leaderboard/document",
    type: "standard",
  },
  {
    id: "search",
    label: "Search",
    labelRu: "Search",
    url: "https://arena.ai/leaderboard/search",
    type: "standard",
  },
];

const AGENT_METRIC_LABELS = [
  "Overall",
  "Computer Use",
  "Browser",
  "Coding",
  "Deep Research",
  "Cost",
];

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<!-- -->/g, "");
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function getCells(row) {
  return row.match(/<td[\s\S]*?<\/td>/g)?.map(stripTags) || [];
}

function splitScore(value) {
  const normalized = value || "N/A";
  const match = normalized.match(/^([\d,.]+)\s*(%?)\s+(.+)$/);

  return {
    score: match ? `${match[1]}${match[2]}` : normalized,
    interval: match ? match[3] : "",
  };
}

function cleanMetricValue(value) {
  return (value || "N/A").replace(/\s+%/g, "%");
}

function parseLab(rawLab) {
  const parts = rawLab ? stripTags(rawLab).split(/\s*\u00b7\s*/) : [];

  return {
    lab: parts[0] || "Unknown",
    license: parts.slice(1).join(" / ") || "N/A",
  };
}

function parseModel(row, board) {
  const cells = getCells(row);
  const rankMatch = row.match(/<span class="text-sm font-medium">(\d+)<\/span>/);
  const rank = rankMatch ? Number(rankMatch[1]) : Number(cells[0]?.match(/\d+/)?.[0]);
  const modelMatch = row.match(/title="([^"]+)"/);
  const labMatch = row.match(/<span class="text-text-secondary truncate text-xs">([\s\S]*?)<\/span>/);

  if (!rank || !modelMatch) return null;

  const labData = parseLab(labMatch?.[1] || "");

  if (board.type === "agent") {
    const scoreData = splitScore(cells[2]);

    return {
      rank,
      model: decodeHtml(modelMatch[1]),
      ...labData,
      score: scoreData.score,
      interval: scoreData.interval,
      votes: cells[8] || "N/A",
      price: "N/A",
      context: "N/A",
      metrics: AGENT_METRIC_LABELS.map((label, index) => ({
        label,
        value: cleanMetricValue(cells[index + 2]),
      })),
    };
  }

  const scoreData = splitScore(cells[3]);

  return {
    rank,
    model: decodeHtml(modelMatch[1]),
    ...labData,
    score: scoreData.score,
    interval: scoreData.interval,
    votes: cells[4] || "N/A",
    price: cells[5] || "N/A",
    context: cells[6] || "N/A",
    metrics: [],
  };
}

function parseArenaHtml(html, board) {
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const dateMatch = html.match(/<span>([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})<\/span>/);
  const votesMatch = html.match(/<span>([\d,]+)<!-- -->\s*<!-- -->votes<\/span>/);
  const modelsMatch = html.match(/<span>(\d+)<!-- -->\s*<!-- -->models<\/span>/);
  const rows = html.match(/<tr class="hover:bg-surface-highlight[\s\S]*?<\/tr>/g) || [];

  const models = rows
    .map((row) => parseModel(row, board))
    .filter(Boolean)
    .slice(0, MAX_MODELS);

  return {
    id: board.id,
    label: board.label,
    labelRu: board.labelRu,
    sourceUrl: board.url,
    title: titleMatch ? stripTags(titleMatch[1]) : board.label,
    updatedAt: dateMatch?.[1] || null,
    votes: votesMatch?.[1] || null,
    totalModels: modelsMatch?.[1] || null,
    models,
  };
}

async function loadBoard(board) {
  const arenaResponse = await fetch(board.url, {
    headers: {
      "user-agent": "RixHub/1.0 (+https://code-phi-lime.vercel.app)",
      accept: "text/html",
    },
  });

  if (!arenaResponse.ok) {
    throw new Error(`${board.label} returned ${arenaResponse.status}`);
  }

  const html = await arenaResponse.text();
  const data = parseArenaHtml(html, board);

  if (!data.models.length) {
    throw new Error(`${board.label} parser returned no models`);
  }

  return data;
}

module.exports = async function handler(_request, response) {
  try {
    const settledBoards = await Promise.allSettled(BOARD_CONFIGS.map(loadBoard));
    const leaderboards = settledBoards
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    const errors = settledBoards
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason?.message || "Unknown Arena board error");

    if (!leaderboards.length) {
      throw new Error(errors[0] || "Arena leaderboards are temporarily unavailable");
    }

    response.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");
    response.status(200).json({
      source: "Arena Leaderboards",
      leaderboards,
      errors,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    response.status(502).json({
      source: "Arena Leaderboards",
      error: error instanceof Error ? error.message : "Unknown Arena loading error",
      leaderboards: [],
      fetchedAt: new Date().toISOString(),
    });
  }
};
