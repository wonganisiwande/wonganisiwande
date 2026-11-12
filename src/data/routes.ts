// Every URL on the site, with the head metadata, structured data and a plain
// HTML body a crawler should receive before any JavaScript runs. Consumed by
// scripts/prerender.ts at build time. Pure data in, strings out: no React, no
// DOM, so it runs under tsx in Node.

import { thoughtItems, issueNo, issueMonth } from './thoughts';
import { contents } from './contents';
import { archiveItems } from './experiments';
import { works } from './presence';
import { SITE, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, PERSON } from './site';
import { HOME, ESSENCE } from './copy';

export type Route = {
  path: string;          // "/thoughts/one-of-two"
  title: string;         // full <title>
  description: string;
  image: string;         // absolute URL
  lastmod: string;       // ISO date for the sitemap
  priority: string;
  html: string;          // body markup injected into #root
  jsonLd: object[];
};

const abs = (p: string) => (p.startsWith('http') ? p : `${SITE}${p}`);

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const titled = (t: string) => `${t} | ${SITE_NAME}`;

// Body paragraphs. A "## " prefix is a section heading, matching the reader.
const paragraphs = (body: string[]) =>
  body
    .map(p =>
      p.startsWith('## ')
        ? `<h2 class="text-[11px] uppercase tracking-[0.3em] font-semibold text-brand-accent pt-6">${esc(p.slice(3))}</h2>`
        : `<p class="text-lg font-light leading-relaxed opacity-80">${esc(p)}</p>`
    )
    .join('\n');

const shell = (inner: string, wide = false) =>
  `<main data-prerender class="${wide ? 'max-w-5xl' : 'max-w-2xl'} mx-auto px-6 md:px-8 py-24 md:py-28">${inner}</main>`;

const crumbs = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.path)
  }))
});

const sectionLabel = (t: string) =>
  `<p class="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-6">${esc(t)}</p>`;

const h1 = (t: string) => `<h1 class="text-4xl md:text-5xl font-serif leading-tight mb-4">${esc(t)}</h1>`;

const img = (src: string, alt: string, cls = 'w-full h-auto') =>
  `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" class="${cls}" />`;

// Newest date across a set of items, for section page lastmod.
const newest = (dates: string[]) => dates.slice().sort().reverse()[0] ?? '2026-07-04';

export function buildRoutes(): Route[] {
  const routes: Route[] = [];

  // ---------- Home ----------
  routes.push({
    path: '/',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    image: abs(DEFAULT_IMAGE),
    lastmod: newest([
      ...thoughtItems.map(t => t.published),
      ...works.map(w => w.published),
      ...archiveItems.map(a => a.published)
    ]),
    priority: '1.0',
    html: shell(
      [
        sectionLabel(HOME.kicker),
        `<h1 class="text-4xl md:text-7xl font-serif mb-8 leading-tight tracking-tight">${esc(HOME.headline)}</h1>`,
        `<dl class="max-w-md"><dt class="font-serif text-2xl">${esc(HOME.entry.word)} <span class="opacity-50 text-base">${esc(HOME.entry.pron)}</span> <em class="opacity-60 text-base">${esc(HOME.entry.pos)}</em></dt><dd class="text-lg font-light leading-relaxed opacity-80">${esc(HOME.entry.def)} <em class="opacity-60">${esc(HOME.entry.eg)}</em></dd></dl>`,
        `<h2 class="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mt-16 mb-6">Latest</h2>`,
        `<ul class="space-y-3">` +
          thoughtItems
            .slice()
            .sort((a, b) => (a.published < b.published ? 1 : -1))
            .slice(0, 5)
            .map(t => `<li><a class="font-serif text-xl" href="/thoughts/${t.slug}">${esc(t.title)}</a></li>`)
            .join('') +
          `</ul>`
      ].join('\n')
    ),
    jsonLd: [
      { '@context': 'https://schema.org', ...PERSON },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: SITE,
        name: SITE_NAME,
        publisher: { '@id': `${SITE}/#person` }
      }
    ]
  });

  // ---------- Section indexes ----------
  const sections: { path: string; name: string; desc: string; list: string; dates: string[] }[] = [
    {
      path: '/presence',
      name: 'Presence',
      desc: 'Shoots you can step into and films that move. Editorial galleries and short films by Wongani Siwande, creative director in Blantyre, Malawi.',
      list: works.map(w => `<li><a class="font-serif text-xl" href="/presence/${w.slug}">${esc(w.title)}</a><span class="block text-[10px] uppercase tracking-[0.2em] opacity-40">${esc(w.roles)}</span></li>`).join(''),
      dates: works.map(w => w.published)
    },
    {
      path: '/experiments',
      name: 'Experiments',
      desc: 'Case studies, prototypes and collaborations. Brand strategy, content systems and creative direction across brand, culture and narrative.',
      list: archiveItems.map(a => `<li><a class="font-serif text-xl" href="/experiments/${a.slug}">${esc(a.title)}</a><span class="block text-[10px] uppercase tracking-[0.2em] opacity-40">${esc(a.category)}</span></li>`).join(''),
      dates: archiveItems.map(a => a.published)
    },
    {
      path: '/thoughts',
      name: 'Thoughts',
      desc: 'Essays, concept notes and reflections on creative direction, fashion, taste and the work behind the work.',
      list: thoughtItems.map(t => `<li><a class="font-serif text-xl" href="/thoughts/${t.slug}">${esc(t.title)}</a><span class="block font-serif italic opacity-60">${esc(t.verdict)}</span><span class="block text-[10px] uppercase tracking-[0.2em] opacity-40">${esc(issueNo(t.slug))} · ${esc(t.category)}</span></li>`).join(''),
      dates: thoughtItems.map(t => t.published)
    }
  ];
  for (const s of sections) {
    routes.push({
      path: s.path,
      title: titled(s.name),
      description: s.desc,
      image: abs(DEFAULT_IMAGE),
      lastmod: newest(s.dates),
      priority: '0.9',
      html: shell([h1(s.name), `<p class="text-lg font-light leading-relaxed opacity-70 mb-10">${esc(s.desc)}</p>`, `<ul class="space-y-5">${s.list}</ul>`].join('\n')),
      jsonLd: [crumbs([{ name: 'Home', path: '/' }, { name: s.name, path: s.path }])]
    });
  }

  routes.push({
    path: '/essence',
    title: titled('Essence'),
    description: 'Who Wongani Siwande is, how he thinks, and why he does what he does. Creative and art direction, content creation, brand consulting, fashion and film from Blantyre, Malawi.',
    image: abs(DEFAULT_IMAGE),
    lastmod: '2026-11-11',
    priority: '0.7',
    html: shell(
      [
        h1('Essence'),
        `<p class="text-lg font-light leading-relaxed opacity-70">${esc(ESSENCE.intro)}</p>`,
        ...ESSENCE.sections.flatMap(sec => [
          `<h2 class="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mt-12 mb-3">${esc(sec.title)}</h2>`,
          `<p class="text-lg font-light leading-relaxed opacity-70">${esc(sec.content)}</p>`
        ]),
        `<p class="text-lg font-light leading-relaxed opacity-70 mt-12">${esc(ESSENCE.closer)}</p>`
      ].join('\n')
    ),
    jsonLd: [{ '@context': 'https://schema.org', ...PERSON }, crumbs([{ name: 'Home', path: '/' }, { name: 'Essence', path: '/essence' }])]
  });

  routes.push({
    path: '/contact',
    title: titled('Contact'),
    description: 'Book creative direction, videography, content, brand strategy or presence. Rate card available. Blantyre, Malawi and beyond.',
    image: abs(DEFAULT_IMAGE),
    lastmod: '2026-11-11',
    priority: '0.8',
    html: shell([h1('Let’s build something intentional.'), `<p class="text-lg font-light leading-relaxed opacity-70">Tell me what you’re building and I’ll tell you exactly how I can help. The clearer the brief, the quicker the yes.</p>`, `<p class="mt-8"><a href="mailto:siwandewongani@gmail.com" class="text-2xl font-light">siwandewongani@gmail.com</a></p>`].join('\n')),
    jsonLd: [crumbs([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]
  });

  routes.push({
    path: '/contents',
    title: titled('Index'),
    description: 'Every essay, case study, film and gallery by Wongani Siwande, newest first, one line each.',
    image: abs(DEFAULT_IMAGE),
    lastmod: newest(contents.map(e => e.published)),
    priority: '0.6',
    html: shell(
      [
        h1('Index'),
        `<p class="text-lg font-light leading-relaxed opacity-70 mb-10">Every piece on the site, newest first. One line each, so you can find the one you came for.</p>`,
        `<ul class="space-y-5">${contents
          .map(e => `<li><a class="font-serif text-xl" href="${e.href}">${esc(e.title)}</a><span class="block font-serif italic opacity-60">${esc(e.verdict)}</span><span class="block text-[10px] uppercase tracking-[0.2em] opacity-40">${esc(e.no ? `${e.no} · ${e.kind}` : e.kind)} · ${esc(e.month)}</span></li>`)
          .join('')}</ul>`
      ].join('\n')
    ),
    jsonLd: [crumbs([{ name: 'Home', path: '/' }, { name: 'Index', path: '/contents' }])]
  });

  // ---------- Thoughts ----------
  for (const t of thoughtItems) {
    const path = `/thoughts/${t.slug}`;
    const media = (t.media ?? []).filter(m => m.type === 'image');
    routes.push({
      path,
      title: titled(t.title),
      description: t.description,
      image: abs(`/media/share/thoughts-${t.slug}.jpg`),
      lastmod: t.published,
      priority: '0.8',
      html: shell(
        [
          img(t.cover, t.title, 'w-auto max-h-[78vh] mx-auto mb-10'),
          sectionLabel(`${issueNo(t.slug)} · ${issueMonth(t.published)} · ${t.category}`),
          h1(t.title),
          `<p class="font-serif italic text-xl opacity-75 mb-6">${esc(t.verdict)}</p>`,
          t.credit ? `<p class="text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-10">${esc(t.credit)}</p>` : '',
          `<div class="space-y-7">${paragraphs(t.body)}</div>`,
          media.length
            ? `<section class="mt-14"><h2 class="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-6">From the shoot</h2><div class="columns-2 gap-4">${media.map((m, i) => img(m.src, `${t.title}, frame ${i + 1}`)).join('')}</div></section>`
            : '',
          t.credits?.length
            ? `<section class="mt-14"><h2 class="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-6">Credits</h2><dl>${t.credits.map(c => `<div><dt class="text-[10px] uppercase tracking-[0.2em] opacity-40">${esc(c.role)}</dt><dd class="font-light">${esc(c.name)}</dd></div>`).join('')}</dl></section>`
            : '',
          t.outbound
            ? `<p class="mt-10"><a href="${esc(t.outbound.href)}" rel="noopener noreferrer" target="_blank">${esc(t.outbound.label)}</a></p>`
            : ''
        ].join('\n')
      ),
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          mainEntityOfPage: abs(path),
          headline: t.title,
          description: t.description,
          image: [abs(t.cover), ...media.slice(0, 3).map(m => abs(m.src))],
          datePublished: t.published,
          dateModified: t.published,
          author: { '@id': `${SITE}/#person` },
          publisher: { '@id': `${SITE}/#person` },
          articleSection: t.category,
          inLanguage: 'en'
        },
        crumbs([{ name: 'Home', path: '/' }, { name: 'Thoughts', path: '/thoughts' }, { name: t.title, path }])
      ]
    });
  }

  // ---------- Presence ----------
  for (const w of works) {
    const path = `/presence/${w.slug}`;
    routes.push({
      path,
      title: titled(w.title),
      description: w.description,
      image: abs(`/media/share/presence-${w.slug}.jpg`),
      lastmod: w.published,
      priority: '0.8',
      html: shell(
        [
          sectionLabel(w.category),
          h1(w.title),
          `<p class="text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-6">${esc(w.roles)}</p>`,
          `<p class="font-serif italic text-xl opacity-75 mb-6">${esc(w.verdict)}</p>`,
          `<p class="text-lg font-light leading-relaxed opacity-80 max-w-2xl mb-10">${esc(w.description)}</p>`,
          w.kind === 'film' && w.video
            ? `<video src="${esc(w.video)}" poster="${esc(w.poster ?? w.hero)}" controls playsinline preload="none" class="w-full max-w-md mx-auto"></video>`
            : img(w.hero, w.title, 'w-full h-auto mb-6') +
              `<div class="grid grid-cols-2 md:grid-cols-3 gap-3">${(w.gallery ?? []).map((g, i) => img(g, `${w.title}, frame ${i + 1}`)).join('')}</div>`
        ].join('\n'),
        true
      ),
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': w.kind === 'film' ? 'VideoObject' : 'ImageGallery',
          name: w.title,
          description: w.description,
          url: abs(path),
          ...(w.kind === 'film'
            ? { thumbnailUrl: abs(w.poster ?? w.hero), contentUrl: abs(w.video ?? ''), uploadDate: w.published }
            : { image: [abs(w.hero), ...(w.gallery ?? []).slice(0, 6).map(abs)] }),
          creator: { '@id': `${SITE}/#person` },
          dateCreated: w.published
        },
        crumbs([{ name: 'Home', path: '/' }, { name: 'Presence', path: '/presence' }, { name: w.title, path }])
      ]
    });
  }

  // ---------- Experiments ----------
  for (const a of archiveItems) {
    const path = `/experiments/${a.slug}`;
    routes.push({
      path,
      title: titled(a.title),
      description: a.description,
      image: abs(`/media/share/experiments-${a.slug}.jpg`),
      lastmod: a.published,
      priority: '0.7',
      html: shell(
        [
          sectionLabel(a.category),
          h1(a.title),
          `<p class="font-serif italic text-xl opacity-75 mb-6">${esc(a.verdict)}</p>`,
          `<div class="space-y-7">${paragraphs(a.body)}</div>`,
          a.three
            ? `<dl class="mt-14"><dt>The call</dt><dd>${esc(a.three.call)}</dd><dt>The detail</dt><dd>${esc(a.three.detail)}</dd><dt>The result</dt><dd>${esc(a.three.result)}</dd></dl>`
            : '',
          a.link ? `<p class="mt-10"><a href="${esc(a.link.to)}">${esc(a.link.label)}</a></p>` : ''
        ].join('\n')
      ),
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: a.title,
          description: a.description,
          url: abs(path),
          genre: a.category,
          creator: { '@id': `${SITE}/#person` },
          dateCreated: a.published
        },
        crumbs([{ name: 'Home', path: '/' }, { name: 'Experiments', path: '/experiments' }, { name: a.title, path }])
      ]
    });
  }

  return routes;
}
