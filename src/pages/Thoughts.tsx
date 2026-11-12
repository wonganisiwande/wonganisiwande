import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pen, X, ArrowRight } from 'lucide-react';
import Parallax from '../components/Parallax';
import { useScrollLock } from '../lib/useScrollLock';
import { type Thought, thoughtItems, issueNo, issueMonth } from '../data/thoughts';
import Seal from '../components/Seal';

const categories = [
  {
    name: 'All',
    explainer: 'Where I write things down. Essays, short notes on ideas, and what each project taught me.'
  },
  {
    name: 'Essays',
    explainer: 'Longer pieces on creativity and direction, for when one paragraph won’t do.'
  },
  {
    name: 'Concept Notes',
    explainer: 'Short notes on one idea or one decision, and why I made it.'
  },
  {
    name: 'Reflections',
    explainer: 'The personal ones. Places, projects, and what they taught me about taste.'
  }
];


// Editorial scatter positions, desktop only. Mobile stacks in flow.
const scatter = [
  { left: '6%', top: 0 },
  { left: '54%', top: 170 },
  { left: '12%', top: 440 },
  { left: '58%', top: 610 },
  { left: '28%', top: 880 }
];
// The pattern repeats further down the page, so a sixth piece never lands on
// top of the first.
const PERIOD = 1120;
const desktopPositions = (idx: number) => {
  const p = scatter[idx % scatter.length];
  return { left: p.left, top: p.top + Math.floor(idx / scatter.length) * PERIOD };
};

function ArticleReader({ article, onClose }: { article: Thought; onClose: () => void }) {
  const [zoom, setZoom] = useState<string | null>(null);
  const images = article.media?.filter(m => m.type === 'image') ?? [];
  const videos = article.media?.filter(m => m.type === 'video') ?? [];

  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoom) setZoom(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, zoom]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[90] bg-brand-bg/98 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close article"
        className="fixed top-6 right-6 md:top-10 md:right-10 p-3 opacity-50 hover:opacity-100 transition-opacity z-20"
      >
        <X size={22} strokeWidth={1.2} />
      </button>

      <div
        className="max-w-2xl mx-auto px-6 md:px-8 py-24 md:py-28 min-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Editorial lead — the magazine cover, or the lead frame */}
          <button
            onClick={() => setZoom(article.cover)}
            aria-label="Enlarge cover"
            className="block w-full mb-10 md:mb-14 cursor-zoom-in group/cover"
          >
            <img
              src={article.cover}
              alt={article.title}
              className="w-auto max-h-[78vh] mx-auto shadow-2xl shadow-brand-ink/20 group-hover/cover:opacity-95 transition-opacity duration-500"
            />
          </button>

          <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-6">
            {issueNo(article.slug)} · {issueMonth(article.published)} · {article.category}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-4">
            {article.title}
          </h1>
          <p className="font-serif italic text-xl md:text-2xl leading-snug opacity-75 mb-6">{article.verdict}</p>
          {article.credit && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-10">
              {article.credit}
            </p>
          )}
          <div className="w-16 border-t border-brand-accent/40 mb-10" />
          <div className="space-y-7">
            {article.body.map((para, i) =>
              // A body line prefixed with "## " is a section heading. Used by the
              // lookbooks, which break into a run of individual looks. Champagne,
              // small and tracked, so it marks the break without shouting.
              para.startsWith('## ') ? (
                <h2
                  key={i}
                  className="text-[11px] uppercase tracking-[0.3em] font-semibold text-brand-accent pt-6"
                >
                  {para.slice(3)}
                </h2>
              ) : (
                <p key={i} className="text-lg font-light leading-relaxed opacity-80">
                  {para}
                </p>
              )
            )}
          </div>

          {article.media && article.media.length > 0 && (
            <div className="mt-14 md:mt-16 pt-8 border-t border-brand-ink/5">
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-8">From the shoot</p>

              {images.length > 0 && (
                <div className="columns-2 gap-4 [&>*]:mb-4">
                  {images.map((m, i) => (
                    <button
                      key={m.src + i}
                      onClick={() => setZoom(m.src)}
                      className="block w-full overflow-hidden bg-brand-ink/5 cursor-zoom-in group/ph"
                    >
                      <img
                        src={m.src}
                        loading="lazy"
                        alt=""
                        className="w-full opacity-90 group-hover/ph:opacity-100 group-hover/ph:scale-[1.03] transition-all duration-700 ease-out"
                      />
                    </button>
                  ))}
                </div>
              )}

              {videos.map((m) => (
                <div key={m.src} className="aspect-[9/16] max-h-[70vh] mx-auto overflow-hidden bg-brand-ink/5 mt-4">
                  <video
                    src={m.src}
                    poster={m.poster}
                    controls
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {article.shootIn && (
                <Link
                  to={`/presence/${article.shootIn}`}
                  className="inline-flex items-center gap-3 mt-10 text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity"
                >
                  <span>See the full shoot in Presence</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          )}

          {article.outbound && (
            <div className="mt-14 md:mt-16 pt-8 border-t border-brand-ink/5">
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-5">The board</p>
              {article.outbound.note && (
                <p className="text-sm font-light leading-relaxed opacity-50 mb-6 max-w-md">
                  {article.outbound.note}
                </p>
              )}
              <a
                href={article.outbound.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-brand-ink/15 hover:border-brand-ink px-7 py-4 text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-500"
              >
                <span>{article.outbound.label}</span>
                <ArrowRight size={14} />
              </a>
            </div>
          )}

          {article.credits && (
            <div className="mt-16 pt-8 border-t border-brand-accent/40">
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-8">Credits</p>
              <dl className="space-y-4">
                {article.credits.map((c) => (
                  <div key={c.role} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-8">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-brand-muted sm:w-1/2 pt-1">{c.role}</dt>
                    <dd className="text-sm font-light sm:w-1/2 sm:text-right">{c.name}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-14 pt-8 border-t border-brand-ink/5 flex items-center justify-between gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-30">Wongani Siwande · {issueNo(article.slug)}</span>
            <Seal size={40} className="opacity-60" />
          </div>
        </motion.article>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] bg-brand-ink/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            onClick={(e) => { e.stopPropagation(); setZoom(null); }}
          >
            <img src={zoom} alt="" className="max-w-full max-h-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Thoughts() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const openArticle = slug ? thoughtItems.find(t => t.slug === slug) ?? null : null;

  const filteredItems = activeCategory === 'All'
    ? thoughtItems
    : thoughtItems.filter(item => item.category === activeCategory);

  const currentExplainer = categories.find(c => c.name === activeCategory)?.explainer;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 relative">
      <SEO
        title={openArticle ? openArticle.title : 'Thoughts'}
        description={openArticle?.description}
        image={openArticle ? `/media/share/thoughts-${openArticle.slug}.jpg` : undefined}
      />

      <header className="mb-20 lg:mb-60 max-w-2xl relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -left-16 -top-10 pointer-events-none"
        >
          <Pen size={140} strokeWidth={0.5} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-serif mb-12 leading-tight tracking-tight"
        >
          Thoughts
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="flex flex-wrap gap-6 md:gap-10 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`
                text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-500
                ${activeCategory === cat.name ? 'opacity-100 italic underline underline-offset-8' : 'opacity-30 hover:opacity-100'}
              `}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="text-brand-muted text-lg font-light leading-relaxed min-h-[3em]"
          >
            {currentExplainer}
          </motion.p>
        </AnimatePresence>
        <Link to="/contents" className="inline-flex items-center gap-3 mt-6 text-[10px] uppercase tracking-[0.25em] opacity-50 hover:opacity-100 transition-opacity">
          <span>Every piece, in one list</span>
          <ArrowRight size={14} />
        </Link>
      </header>

      {/* Mobile: clean stack. Desktop: editorial scatter. */}
      <div className="relative w-full space-y-8 lg:space-y-0 pb-20 lg:pb-0 lg:min-h-[var(--scatter-h)]"
        style={{ ['--scatter-h' as string]: `${desktopPositions(Math.max(0, filteredItems.length - 1)).top + 560}px` }}>
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:absolute group cursor-pointer max-w-full lg:max-w-sm"
              style={{
                ...desktopPositions(idx)
              }}
              onClick={() => navigate(`/thoughts/${item.slug}`)}
            >
              <Parallax offset={idx % 2 === 0 ? 15 : -15}>
                <div className="p-8 md:p-12 border border-brand-ink/5 bg-brand-bg/50 backdrop-blur-sm hover:bg-brand-ink/[0.02] hover:border-brand-ink/10 transition-all duration-700">
                  <p className="text-[9px] uppercase tracking-[0.3em] font-semibold mb-6 opacity-30 group-hover:opacity-60 transition-opacity">
                    {issueNo(item.slug)} · {item.category}
                  </p>
                  <h3 className="text-2xl font-serif mb-3 group-hover:italic transition-all duration-500">
                    {item.title}
                  </h3>
                  <p className="font-serif italic text-lg leading-snug opacity-70 mb-4">{item.verdict}</p>
                  <p className="text-sm font-light leading-relaxed opacity-40 group-hover:opacity-70 transition-opacity mb-6">
                    {item.description}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-50 transition-opacity">
                    Read
                  </p>
                </div>
              </Parallax>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {openArticle && (
          <ArticleReader article={openArticle} onClose={() => navigate('/thoughts')} />
        )}
      </AnimatePresence>
    </div>
  );
}
