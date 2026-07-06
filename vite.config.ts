import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import prerender from "vite-plugin-prerender";

const routes = [
  "/",
  "/tierlist",
  "/prompts",
  "/guides",
  "/services",
  "/free",
  "/marketplace",
  "/about",
  "/community",
];

export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: path.join(__dirname, "dist"),
      routes,
      puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    }),
  ],
});
