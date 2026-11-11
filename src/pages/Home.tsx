import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import Parallax from '../components/Parallax';
import BrandLoop from '../components/BrandLoop';
import { HOME } from '../data/copy';

// Six frames across the range: direction, styling, film, campaign, writing,
// documentary. Each tile opens the full piece. No employer work here.
const selectedWork = [
  {
    id: 1,
    title: "The Tastemaker at Home",
    tags: "Amaryllis Residences · Creative direction and presence",
    image: "/media/amaryllis/gallery/08-scarf.jpg",
    to: "/presence/the-amaryllis-residences"
  },
  {
    id: 2,
    title: "MLKY Bar, Three Rounds",
    tags: "With Tyra Sabadia · Series and release strategy",
    image: "/media/mlky/0624.jpg",
    position: "28% 50%",
    to: "/presence/mlky-bar-three-rounds"
  },
  {
    id: 3,
    title: "Sun, Set, Matcha",
    tags: "Sunday Soirée · Lookbook and styling",
    image: "/media/tennis/05-matcha-full.jpg",
    to: "/thoughts/sun-set-matcha"
  },
  {
    id: 4,
    title: "Denim in Bloom",
    tags: "Tikonze Apapa · Campaign and modelling",
    image: "/media/denim/bloom-portrait.jpg",
    to: "/presence/denim-in-bloom"
  },
  {
    id: 5,
    title: "One of Two",
    tags: "Essay · On the nomination",
    image: "/media/amaryllis/gallery/9418.jpg",
    to: "/thoughts/one-of-two"
  },
  {
    id: 6,
    title: "Twenty Beds",
    tags: "Road to Relief · Documentary direction",
    image: "/media/rtr/cover.jpg",
    to: "/experiments/road-to-relief"
  }
];

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
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center relative px-4">
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
            <h1 className="text-4xl md:text-7xl font-serif mb-8 md:mb-12 leading-tight tracking-tight">
              {HOME.headline}
            </h1>
            <p className="text-brand-muted text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {HOME.intro}
            </p>
          </motion.div>
        </Parallax>

        {/* Static background wash (was an infinite blur animation; costly on phones) */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-ink/2 rounded-full blur-[100px]" />
      </section>

      {/* Selected Work */}
      <section className="py-20 md:py-40 px-4">
        <div className="flex justify-between items-end mb-12 md:mb-20">
          <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold opacity-40">{HOME.workLabel}</h2>
          <Link to="/presence" className="group flex items-center space-x-3 py-3 -my-3 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 transition-all">
            <span>{HOME.workLink}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24">
          {selectedWork.map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <Link to={work.to}>
                <Parallax offset={idx % 2 === 0 ? 40 : 20}>
                  <div className="aspect-[3/4] overflow-hidden mb-6 md:mb-8 bg-brand-ink/5 relative">
                    <img
                      src={work.image}
                      alt={work.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                      style={work.position ? { objectPosition: work.position } : undefined}
                    />
                  </div>
                </Parallax>
                <h3 className="text-xl md:text-2xl font-serif mb-2 group-hover:italic transition-all duration-500">{work.title}</h3>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-40">{work.tags}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brands, logos only */}
      <div className="border-t border-brand-ink/5">
        <BrandLoop />
      </div>

      {/* Philosophy Section */}
      <section className="py-20 md:py-40 border-t border-brand-ink/5 text-center px-4">
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
