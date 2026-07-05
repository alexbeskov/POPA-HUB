const ARENA_WEBDEV_URL = "https://arena.ai/leaderboard/code/webdev";
const MAX_MODELS = 15;

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

function parseArenaHtml(html) {
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const dateMatch = html.match(/<span>([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})<\/span>/);
  const votesMatch = html.match(/<span>([\d,]+)<!-- -->\s*<!-- -->votes<\/span>/);
  const modelsMatch = html.match(/<span>(\d+)<!-- -->\s*<!-- -->models<\/span>/);
  const rows = html.match(/<tr class="hover:bg-surface-highlight[\s\S]*?<\/tr>/g) || [];

  const models = rows
    .map((row) => {
      const cells = getCells(row);
      const rankMatch = row.match(/<span class="text-sm font-medium">(\d+)<\/span>/);
      const modelMatch = row.match(/title="([^"]+)"/);
      const labMatch = row.match(/<span class="text-text-secondary truncate text-xs">([\s\S]*?)<\/span>/);
      const scoreMatch = row.match(
        /<div class="flex flex-row items-center gap-2 min-w-\[178px\]"><span class="text-sm">([\d,]+)<\/span><span class="text-tertiary text-xs">([^<]+)<\/span>/,
      );

      if (!rankMatch || !modelMatch || !scoreMatch) return null;

      const labParts = labMatch ? stripTags(labMatch[1]).split(/\s*\u00b7\s*/) : [];

      return {
        rank: Number(rankMatch[1]),
        model: decodeHtml(modelMatch[1]),
        lab: labParts[0] || "Unknown",
        license: labParts.slice(1).join(" / ") || "N/A",
        score: Number(scoreMatch[1].replace(/,/g, "")),
        interval: scoreMatch[2],
        votes: cells[4] || "N/A",
        price: cells[5] || "N/A",
        context: cells[6] || "N/A",
      };
    })
    .filter(Boolean)
    .slice(0, MAX_MODELS);

  return {
    source: "Arena WebDev Leaderboard",
    sourceUrl: ARENA_WEBDEV_URL,
    title: titleMatch ? stripTags(titleMatch[1]) : "Code Arena | WebDev Overall",
    updatedAt: dateMatch?.[1] || null,
    votes: votesMatch?.[1] || null,
    totalModels: modelsMatch?.[1] || null,
    models,
    fetchedAt: new Date().toISOString(),
  };
}

module.exports = async function handler(_request, response) {
  try {
    const arenaResponse = await fetch(ARENA_WEBDEV_URL, {
      headers: {
        "user-agent": "RixHub/1.0 (+https://code-phi-lime.vercel.app)",
        accept: "text/html",
      },
    });

    if (!arenaResponse.ok) {
      throw new Error(`Arena returned ${arenaResponse.status}`);
    }

    const html = await arenaResponse.text();
    const data = parseArenaHtml(html);

    if (!data.models.length) {
      throw new Error("Arena leaderboard parser returned no models");
    }

    response.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");
    response.status(200).json(data);
  } catch (error) {
    response.status(502).json({
      source: "Arena WebDev Leaderboard",
      sourceUrl: ARENA_WEBDEV_URL,
      error: error instanceof Error ? error.message : "Unknown Arena loading error",
      models: [],
      fetchedAt: new Date().toISOString(),
    });
  }
};
