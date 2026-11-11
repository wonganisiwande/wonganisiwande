// Build time prerender. Runs after `vite build` (see package.json) and turns the
// single SPA shell into one real HTML file per route, each carrying its own
// title, description, Open Graph and Twitter tags, JSON-LD, and a plain HTML
// body a crawler or a link preview can read without executing JavaScript.
//
// The React app still mounts on top. createRoot().render() replaces the
// prerendered body, so there is a brief moment of static content and then the
// live site. Nothing here changes how the site behaves in a browser; it changes
// what WhatsApp, LinkedIn, Google and Bing receive when they fetch a URL.
//
// Also writes sitemap.xml from the same route list, so it can never drift from
// the content again.

import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { buildRoutes } from '../src/data/routes';
import { SITE, SITE_NAME } from '../src/data/site';

const DIST = join(process.cwd(), 'dist');
const templatePath = join(DIST, 'index.html');

if (!existsSync(templatePath)) {
  console.error('prerender: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const template = readFileSync(templatePath, 'utf8');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// JSON inside a <script> must not be able to close the tag.
const safeJson = (o: object) => JSON.stringify(o).replace(/</g, '\\u003c');

const routes = buildRoutes();

const ROOT_RE = /<div id="root">\s*<\/div>/;
const TITLE_RE = /<title>[\s\S]*?<\/title>/;

if (!ROOT_RE.test(template)) {
  console.error('prerender: could not find <div id="root"></div> in the template.');
  process.exit(1);
}

let written = 0;
for (const r of routes) {
  const canonical = `${SITE}${r.path === '/' ? '/' : r.path}`;
  const head = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${r.path.startsWith('/thoughts/') ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:image" content="${esc(r.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${esc(r.image)}" />`,
    ...r.jsonLd.map(j => `<script type="application/ld+json">${safeJson(j)}</script>`)
  ].join('\n    ');

  const html = template
    .replace(TITLE_RE, head)
    .replace(ROOT_RE, `<div id="root">${r.html}</div>`);

  const out = r.path === '/' ? templatePath : join(DIST, r.path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  written++;
}

// Sitemap from the same source of truth.
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map(
      r =>
        `  <url><loc>${SITE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${r.lastmod}</lastmod><priority>${r.priority}</priority></url>`
    )
    .join('\n') +
  `\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`prerender: wrote ${written} pages and sitemap.xml (${routes.length} urls)`);
