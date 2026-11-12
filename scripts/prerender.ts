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

  // Write "thoughts/one-of-two.html" rather than "thoughts/one-of-two/index.html".
  // Netlify serves a clean URL straight from the .html file, so the address
  // stays exactly as the app links it, the canonical matches what is served,
  // and there is no 301 hop onto a trailing slash.
  if (r.path === '/') {
    writeFileSync(templatePath, html);
  } else {
    // Both spellings, so the page exists whichever way Netlify resolves the
    // request. If it prefers the flat file the URL stays clean; if it prefers
    // the directory it behaves exactly as before. Either way nothing 404s.
    const flat = join(DIST, `${r.path}.html`);
    const dir = join(DIST, r.path, 'index.html');
    mkdirSync(dirname(dir), { recursive: true });
    writeFileSync(flat, html);
    writeFileSync(dir, html);
  }
  written++;
}

// A real not found page. With the SPA catch all rewrite removed, Netlify serves
// dist/404.html with a 404 status for any path that has no file. The app still
// mounts on it and React Router shows the same message for the actual URL.
const notFound = template
  .replace(TITLE_RE, `<title>Not found | ${esc(SITE_NAME)}</title>\n    <meta name="robots" content="noindex" />`)
  .replace(
    ROOT_RE,
    `<div id="root"><main data-prerender class="max-w-2xl mx-auto px-6 py-28"><p class="text-[10px] uppercase tracking-[0.4em] font-semibold opacity-40 mb-8">404</p><h1 class="text-4xl md:text-6xl font-serif leading-tight mb-8">That page is not here. The work is.</h1><p class="text-lg font-light opacity-60 mb-10">Either the link was old or the address was a guess. Both happen.</p><p><a href="/">Home</a> · <a href="/presence">Presence</a> · <a href="/experiments">Experiments</a> · <a href="/thoughts">Thoughts</a> · <a href="/contact">Contact</a></p></main></div>`
  );
writeFileSync(join(DIST, '404.html'), notFound);

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
