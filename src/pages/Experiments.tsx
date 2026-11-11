import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Lightbulb, X, ArrowRight } from 'lucide-react';
import Parallax from '../components/Parallax';
import { useScrollLock } from '../lib/useScrollLock';
import { type Archive, archiveItems } from '../data/experiments';

const categories = [
  {
    name: 'All',
    explainer: 'Ideas brought to life across brand, culture, and narrative.'
  },
  {
    name: 'Case Studies',
    explainer: 'Completed projects showing strategy and impact.'
  },
  {
    name: 'Prototypes',
    explainer: 'Early stage ideas and experiments.'
  },
  {
    name: 'Collaborations',
    explainer: 'Co created work with brands and creators.'
  }
];


// Editorial scatter positions, desktop only. Mobile and tablet stack in flow.
const desktopPositions = [
  { left: '8%', top: 0 },
  { left: '52%', top: 140 },
  { left: '14%', top: 360 },
  { left: '58%', top: 560 },
  { left: '30%', top: 760 }
];

function ExperimentModal({ item, onClose }: { item: Archive; onClose: () => void }) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

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
        aria-label="Close"
        className="fixed top-6 right-6 md:top-10 md:right-10 p-3 opacity-50 hover:opacity-100 transition-opacity z-20"
      >
        <X size={22} strokeWidth={1.2} />
      </button>

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-24 md:py-32 min-h-full" onClick={(e) => e.stopPropagation()}>
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-6">{item.category}</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-4">{item.title}</h1>
          <div className="w-16 border-t border-brand-accent/40 mb-10" />
          <div className="space-y-7">
            {item.body.map((p, i) => (
              <p key={i} className="text-lg font-light leading-relaxed opacity-80">{p}</p>
            ))}
          </div>
          {item.link && (
            <Link
              to={item.link.to}
              className="inline-flex items-center gap-3 mt-12 text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity"
            >
              <span>{item.link.label}</span>
              <ArrowRight size={14} />
            </Link>
          )}
          <div className="mt-14 pt-8 border-t border-brand-ink/5 text-[10px] uppercase tracking-[0.3em] opacity-30">
            Wongani Siwande
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}

export default function Experiments() {
  // The open item lives in the URL, not in state, so every case study can be
  // linked to directly and shared. An unknown slug just falls back to the index.
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const openItem = slug ? archiveItems.find(i => i.slug === slug) ?? null : null;

  const filteredItems = activeCategory === 'All'
    ? archiveItems
    : archiveItems.filter(item => item.category === activeCategory);

  const currentExplainer = categories.find(c => c.name === activeCategory)?.explainer;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 relative">
      <SEO
        title={openItem ? openItem.title : 'Experiments'}
        description={openItem?.description}
      />

      <header className="mb-20 lg:mb-60 max-w-2xl relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -left-16 -top-10 pointer-events-none"
        >
          <Lightbulb size={140} strokeWidth={0.5} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-serif mb-12 leading-tight tracking-tight"
        >
          Experiments
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
      </header>

      {/* Mobile & tablet: clean stack. Desktop: editorial scatter. */}
      <div className="relative w-full space-y-8 lg:space-y-0 pb-20 lg:pb-0 lg:min-h-[1100px]">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => navigate(`/experiments/${item.slug}`)}
              className="lg:absolute group cursor-pointer max-w-full lg:max-w-sm"
              style={{
                left: desktopPositions[idx % desktopPositions.length].left,
                top: desktopPositions[idx % desktopPositions.length].top
              }}
            >
              <Parallax offset={idx % 2 === 0 ? 20 : -20}>
                <div className="p-8 md:p-12 border border-brand-ink/5 bg-brand-bg/50 backdrop-blur-sm hover:bg-brand-ink/[0.02] hover:border-brand-ink/10 transition-all duration-700">
                  <p className="text-[9px] uppercase tracking-[0.3em] font-semibold mb-6 opacity-30 group-hover:opacity-60 transition-opacity">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-serif mb-4 group-hover:italic transition-all duration-500">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed opacity-40 group-hover:opacity-70 transition-opacity mb-6">
                    {item.description}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-50 transition-opacity">
                    Open
                  </p>
                </div>
              </Parallax>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {openItem && <ExperimentModal item={openItem} onClose={() => navigate('/experiments')} />}
      </AnimatePresence>
    </div>
  );
}
