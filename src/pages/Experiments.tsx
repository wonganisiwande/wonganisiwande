import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import Parallax from '../components/Parallax';

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

const archiveItems = [
  {
    id: 1,
    title: "The Bachelor, at Amaryllis Residences",
    category: "Case Studies",
    description: "An eight episode lifestyle series for a serviced residence in Mount Pleasant. One loft, one resident, one recurring glove. A house is just a house... until it's yours."
  },
  {
    id: 2,
    title: "The Amaryllis Editorial",
    category: "Collaborations",
    description: "Five looks in one morning with photographer Keong Kadango. One warm grade, no wasted frames, an address turned into a person."
  },
  {
    id: 3,
    title: "Denim in Bloom",
    category: "Case Studies",
    description: "A styling film about the toughest fabric gone soft. Shorts cut at the knee, flowers at the collar, one bench outside Blantyre."
  },
  {
    id: 4,
    title: "Sambas, Three Ways",
    category: "Prototypes",
    description: "One shoe, three registers. A styling system testing how far a single silhouette stretches before it breaks. It does not."
  },
  {
    id: 5,
    title: "The Glove Edit",
    category: "Prototypes",
    description: "A signature series about finishing details. The gap between fine and unforgettable is one detail."
  }
];

// Editorial scatter positions, desktop only. Mobile stacks in flow.
const desktopPositions = [
  { left: '8%', top: 0 },
  { left: '52%', top: 140 },
  { left: '14%', top: 360 },
  { left: '58%', top: 560 },
  { left: '30%', top: 760 }
];

export default function Experiments() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? archiveItems
    : archiveItems.filter(item => item.category === activeCategory);

  const currentExplainer = categories.find(c => c.name === activeCategory)?.explainer;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 relative">
      <SEO title="Experiments" />

      <header className="mb-20 md:mb-60 max-w-2xl relative">
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

      {/* Mobile: clean stack. Desktop: editorial scatter. */}
      <div className="relative w-full space-y-8 md:space-y-0 pb-20 md:pb-0 md:min-h-[1100px]">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="md:absolute group max-w-full md:max-w-sm"
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
                  <p className="text-sm font-light leading-relaxed opacity-40 group-hover:opacity-70 transition-opacity">
                    {item.description}
                  </p>
                </div>
              </Parallax>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
