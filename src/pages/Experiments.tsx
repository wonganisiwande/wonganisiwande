import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, X, ArrowRight } from 'lucide-react';
import Parallax from '../components/Parallax';
import { useScrollLock } from '../lib/useScrollLock';

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

type Archive = {
  id: number;
  title: string;
  category: string;
  description: string;
  body: string[];
  link?: { to: string; label: string };
};

const archiveItems: Archive[] = [
  {
    id: 1,
    title: "The Bachelor, at Amaryllis Residences",
    category: "Case Studies",
    description: "An eight episode lifestyle series for a serviced residence in Mount Pleasant. One loft, one resident, one recurring glove. A house is just a house... until it's yours.",
    body: [
      "An eight episode lifestyle series built inside a serviced residence in Mount Pleasant. The premise is small and a little cinematic: one man, one loft, and the slow work of making a space feel like a life.",
      "It opens with a question I hand to the audience, which of two apartments he should take, and it keeps returning to one object. A glove. The glove is the whole thesis: a home is finished by meaning, not furniture.",
      "The look is warm and filmic, one grade throughout, a foreground object swiping the lens to hide each cut. The sign off never changes. A house is just a house... until it's yours."
    ],
    link: { to: '/presence', label: 'Watch The Resident' }
  },
  {
    id: 2,
    title: "The Amaryllis Editorial",
    category: "Collaborations",
    description: "Five looks in one morning with photographer Keong Kadango. One warm grade, no wasted frames, an address turned into a person.",
    body: [
      "Five looks in a single morning, shot with photographer Keong Kadango. The brief was one line: make an apartment feel like a person.",
      "One warm grade, no wasted frames, an address turned into a character. The full write up lives in Thoughts, and the whole set lives in Presence."
    ],
    link: { to: '/thoughts/the-amaryllis-editorial', label: 'Read the piece' }
  },
  {
    id: 3,
    title: "Denim in Bloom",
    category: "Case Studies",
    description: "The promo campaign for the Denim Chill fashion show. Denim argued into softness: flowers at the collar, one bench outside Blantyre.",
    body: [
      "The promo campaign for Denim Chill, a fashion show I walked in, built around Tikonze Apapa's upcycled denim. The brief: make people feel the show before a single ticket was sold.",
      "So we argued with the fabric. Shorts cut at the knee, a white shirt worn easy, flowers where a tie should be. Denim wants to be casual. The flowers refuse to let it. That argument was the whole campaign, and it ran across an editorial set and three films with Tikonze Apapa and Ruva Flowerhouse.",
      "The shoot did its job: the look set the tone for the runway, and the films carried the show onto feeds it would never have reached on its own."
    ],
    link: { to: '/thoughts/directing-denim-in-bloom', label: 'Read the piece' }
  },
  {
    id: 4,
    title: "Sambas, Three Ways",
    category: "Prototypes",
    description: "One shoe, three registers. A styling system testing how far a single silhouette stretches before it breaks. It does not.",
    body: [
      "One shoe, three registers. A styling system that tests how far a single silhouette stretches before it breaks. It does not.",
      "Built as a fast, repeatable format: same shoe, three moods, one clean edit. A small proof that a signature does more work than a wardrobe."
    ],
    link: { to: '/presence', label: 'Watch the film' }
  },
  {
    id: 5,
    title: "The Glove Edit",
    category: "Prototypes",
    description: "A signature series about finishing details. The gap between fine and unforgettable is one detail.",
    body: [
      "A signature series about finishing details, the gap between fine and unforgettable. It runs on one idea: the last thing you add is the thing people remember.",
      "The glove is where it started, and it became the recurring symbol of the Amaryllis series. Small object, large claim."
    ]
  },
  {
    id: 6,
    title: "Tikonze Apapa, Brand Ambassador",
    category: "Collaborations",
    description: "Official face of Tikonze Apapa, the Malawian brand turning upcycled denim into fashion with a conscience. Campaigns, content, and the runway.",
    body: [
      "I serve as an official brand ambassador for Tikonze Apapa, a Malawian label built on upcycled denim, ethical fashion and community impact.",
      "The work is ongoing: monthly content across Instagram and TikTok, campaign shoots, and their events, including the Denim Chill fashion show and the Jean Drive. Denim in Bloom, the promo campaign for the show, came out of this partnership.",
      "It is the kind of collaboration I take on deliberately. A brand with a real point of view, and a story worth wearing."
    ],
    link: { to: '/presence', label: 'Watch Jean Drive' }
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
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItem, setOpenItem] = useState<Archive | null>(null);

  const filteredItems = activeCategory === 'All'
    ? archiveItems
    : archiveItems.filter(item => item.category === activeCategory);

  const currentExplainer = categories.find(c => c.name === activeCategory)?.explainer;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 relative">
      <SEO title="Experiments" />

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
              onClick={() => setOpenItem(item)}
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
        {openItem && <ExperimentModal item={openItem} onClose={() => setOpenItem(null)} />}
      </AnimatePresence>
    </div>
  );
}
