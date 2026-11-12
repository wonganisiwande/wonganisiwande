import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import Parallax from '../components/Parallax';
import BrandLoop from '../components/BrandLoop';
import Develop from '../components/Develop';
import TheEdit from '../components/TheEdit';
import { HOME } from '../data/copy';

// Six frames across the range: direction, a series, styling, campaign, writing,
// documentary. Each opens on a detail and develops into the full frame (see
// components/Develop.tsx). The verdict under each is his own line from the piece.
// No employer work here.
const selectedWork = [
  {
    id: 1,
    title: "The Tastemaker at Home",
    tags: "Lookbook · Amaryllis Residences",
    verdict: "A shoot is one idea, wearing five outfits.",
    image: "/media/home/scarf.jpg",
    detail: "/media/home/scarf-detail.jpg",
    to: "/presence/the-amaryllis-residences"
  },
  {
    id: 2,
    title: "MLKY Bar, Three Rounds",
    tags: "Series · with Tyra Sabadia",
    verdict: "The audience learns one thing at a time.",
    image: "/media/home/mlky.jpg",
    detail: "/media/home/mlky-detail.jpg",
    to: "/presence/mlky-bar-three-rounds"
  },
  {
    id: 3,
    title: "Sun, Set, Matcha",
    tags: "Lookbook · Sunday Soirée",
    verdict: "You don’t need a new outfit for every colour on the invite.",
    image: "/media/home/matcha.jpg",
    detail: "/media/home/matcha-detail.jpg",
    to: "/thoughts/sun-set-matcha"
  },
  {
    id: 4,
    title: "Denim in Bloom",
    tags: "Campaign · Tikonze Apapa",
    verdict: "Denim wants to be casual. The flowers refuse to let it.",
    image: "/media/home/bloom.jpg",
    detail: "/media/home/bloom-detail.jpg",
    to: "/presence/denim-in-bloom"
  },
  {
    id: 5,
    title: "One of Two",
    tags: "Essay · On the nomination",
    verdict: "Not the camera I wanted, but the camera I had.",
    image: "/media/home/brown.jpg",
    detail: "/media/home/brown-detail.jpg",
    to: "/thoughts/one-of-two"
  },
  {
    id: 6,
    title: "Twenty Beds",
    tags: "Film · Road to Relief",
    verdict: "Let the room speak first.",
    image: "/media/home/doctor.jpg",
    detail: "/media/home/doctor-detail.jpg",
    to: "/experiments/road-to-relief"
  }
];

// The hero definition, set like an entry in a pocket dictionary.
function DictionaryCard() {
  const e = HOME.entry;
  return (
    <figure className="mx-auto w-full max-w-[26rem] md:max-w-md text-left border border-brand-ink/10 bg-brand-bg/70 backdrop-blur-sm px-6 py-5 md:px-8 md:py-7">
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-2xl md:text-3xl font-medium">{e.word}</span>
        <span className="hidden sm:inline text-sm font-light text-brand-muted">{e.pron}</span>
        <span className="font-serif italic text-base text-brand-muted">{e.pos}</span>
      </p>
      <div className="w-10 border-t border-brand-accent/60 my-3 md:my-4" />
      <p className="text-[15px] md:text-lg font-light leading-relaxed">
        {e.def}
      </p>
      <p className="mt-2 font-serif italic text-[15px] md:text-base text-brand-muted">{e.eg}</p>
    </figure>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto relative">
      <SEO />

      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-brand-bg flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center"
            >
              <motion.div
                animate={{
                  y: [0, -14, 0],
                  scale: [1, 1.04, 1],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8"
              >
                <Logo size={110} airy className="text-brand-ink" />
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-[1px] bg-brand-accent/50 w-32"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Oversized monogram watermark */}
      <div className="fixed inset-0 -z-10 pointer-events-none flex items-center justify-end overflow-hidden opacity-[0.03]">
        <div className="translate-x-1/4 text-brand-ink">
          <Logo size={900} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-[72vh] md:min-h-[80vh] flex flex-col justify-center items-center text-center relative px-4 pt-6 md:pt-0">
        <Parallax offset={30}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: showSplash ? 2.5 : 0 }}
            className="max-w-3xl"
          >
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-medium opacity-40 mb-8 md:mb-10">
              {HOME.kicker}
            </p>
            <h1 className="text-[2.6rem] md:text-7xl font-serif mb-10 md:mb-14 leading-[1.05] tracking-tight">
              {HOME.headline}
            </h1>
            <DictionaryCard />
          </motion.div>
        </Parallax>

        {/* Static background wash (was an infinite blur animation; costly on phones) */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-ink/2 rounded-full blur-[100px]" />
      </section>

      {/* Selected Work */}
      <section className="py-14 md:py-28 lg:py-40 md:px-4">
        {/* One label on phones; the link moves under the work so the row never wraps. */}
        <div className="flex justify-between items-end mb-8 md:mb-16 lg:mb-20 px-4 md:px-0">
          <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold opacity-40">{HOME.workLabel}</h2>
          <Link to="/presence" className="hidden md:flex group items-center space-x-3 py-3 -my-3 text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 transition-all">
            <span>{HOME.workLink}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Phones: a swipeable row, one and a bit tiles wide. Tablet: two columns. Desktop: three. */}
        <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none no-scrollbar gap-5 md:gap-12 lg:gap-24 px-4 md:px-0 md:grid-cols-2 lg:grid-cols-3 scroll-px-4">
          {selectedWork.map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer shrink-0 w-[82%] sm:w-[60%] md:w-auto snap-start"
            >
              <Link to={work.to}>
                <Parallax offset={idx % 2 === 0 ? 40 : 20}>
                  <div className="aspect-[3/4] overflow-hidden mb-6 md:mb-8 bg-brand-ink/5 relative">
                    <Develop src={work.image} detail={work.detail} alt={work.title} />
                  </div>
                </Parallax>
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold opacity-40 mb-3">{work.tags}</p>
                <h3 className="text-xl md:text-2xl font-serif mb-2 group-hover:italic transition-all duration-500">{work.title}</h3>
                <p className="font-serif italic text-lg leading-snug opacity-70">{work.verdict}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <Link to="/presence" className="md:hidden mt-8 mx-4 flex items-center justify-between border-t border-brand-ink/10 pt-5 text-[11px] uppercase tracking-[0.2em] font-medium opacity-70">
          <span>{HOME.workLink}</span>
          <ArrowRight size={14} />
        </Link>
      </section>

      {/* The Edit: five things he rates right now */}
      <TheEdit />

      {/* Brands, logos only */}
      <div className="border-t border-brand-ink/5">
        <BrandLoop />
      </div>

      {/* Philosophy Section */}
      <section className="py-16 md:py-32 lg:py-40 border-t border-brand-ink/5 text-center px-4">
        <Parallax offset={60}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8 md:mb-12">
              “{HOME.quote}”
            </p>
            <Link to="/experiments" className="inline-block py-3 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold opacity-40 hover:opacity-100 transition-opacity">
              {HOME.quoteLink}
            </Link>
          </motion.div>
        </Parallax>
      </section>
    </div>
  );
}
