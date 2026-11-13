// Generates public/sitemap.xml from the routes and project slugs.
// Runs automatically before `npm run build`. Set VITE_SITE_URL in .env.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const env = existsSync(".env") ? readFileSync(".env", "utf8") : "";
const fromEnv = process.env.VITE_SITE_URL || (env.match(/^VITE_SITE_URL=(.*)$/m) || [])[1];
const base = (fromEnv || "https://www.jxstudio.example").trim().replace(/\/$/, "");

const projectsSrc = readFileSync("src/content/projects.ts", "utf8");
// Placeholder projects are noindex, so they are left out of the sitemap.
const projectBlocks = projectsSrc.split(/\n  \{\n/).slice(1);
const slugs = projectBlocks
  .filter((b) => !/placeholder:\s*true/.test(b))
  .map((b) => (b.match(/slug:\s*"([^"]+)"/) || [])[1])
  .filter(Boolean);

const routes = ["/", "/services", "/work", "/about", "/contact", "/privacy", "/legal", ...slugs.map((s) => `/work/${s}`)];
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${base}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
writeFileSync("public/sitemap.xml", xml);
const robots = readFileSync("public/robots.txt", "utf8").replace(/^Sitemap: .*$/m, `Sitemap: ${base}/sitemap.xml`);
writeFileSync("public/robots.txt", robots);
console.log(`sitemap: ${routes.length} URLs for ${base}`);
