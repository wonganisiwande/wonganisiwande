import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Play, X } from 'lucide-react';
import Parallax from '../components/Parallax';
import { useScrollLock } from '../lib/useScrollLock';

const categories = [
  {
    name: 'All',
    explainer: 'Moments of intention, movement, and energy captured visually and in motion.'
  },
  {
    name: 'Sightlines',
    explainer: 'Full shoots you can step into. Click a cover to see the whole scope.'
  },
  {
    name: 'Stories in Motion',
    explainer: 'Films that move, inform, and inspire.'
  }
];

type Work = {
  id: number;
  slug: string;
  title: string;
  category: 'Sightlines' | 'Stories in Motion';
  kind: 'gallery' | 'film';
  hero: string;
  roles: string;
  description: string;
  size: 'large' | 'medium';
  gallery?: string[];
  video?: string;
  poster?: string;
};

// The Amaryllis Residences, thirty frames in shoot order so the set reads like
// an issue: the suite wakes up, the tastemaker settles in, the exterior does its
// old money turn, off duty lets the air out, and the property details close.
// Phase 1 Robe, Phase 2 Taupe, Phase 3 White & Scarf, Phase 4 Beanie, Phase 5 Details.
// The five covers open the set, in phase order, because the whole idea was to
// treat the residence like an issue. Two of them (slow mornings, off duty) had
// never appeared anywhere on the site before this.
const amaryllisCovers = [
  'cover-checked-in', 'cover-slow-mornings', 'cover-tastemaker',
  'cover-place-to-be', 'cover-off-duty'
].map(n => `/media/covers/${n}.jpg`);

const amaryllisFrames = [
  9235, 9217, 9232, 9203, 9294, 9287, 9364,
  9395, 9462, 9468, 9418, 9485, 9484,
  9512, 9506, 9561, 9564, 9510, 9568,
  9592, 9579, 9588,
  9252, 9268, 9502
].map(n => `/media/amaryllis/gallery/${n}.jpg`);

const amaryllisGallery = [...amaryllisCovers, ...amaryllisFrames];

// Denim in Bloom, thirty frames (photography Keong Kadango) in story order: the
// bench and the street, the sock and loafer details, the portraits that carry
// the thesis, the bougainvillea wall, and the bouquet frames that close it.
const denimGallery = [
  6459, 6461, 6465, 6466, 6477, 6471, 6469, 6470, 6467, 6468,
  6480, 6481, 6482, 6483, 6478,
  6485, 6486, 6487,
  6488, 6489, 6490, 6492, 6493,
  6495, 6497, 6499, 6501, 6502, 6504, 6510
].map(n => `/media/denim/gallery/${n}.jpg`);
// 6491 is deliberately absent: it is the hero frame above the grid, and listing
// it here as well rendered the same photograph twice.

const works: Work[] = [
  {
    id: 1,
    slug: 'the-amaryllis-residences',
    title: 'The Amaryllis Residences',
    category: 'Sightlines',
    kind: 'gallery',
    hero: '/media/amaryllis/gallery/01-taupe.jpg',
    roles: 'Editorial · Photography Keong Kadango',
    description: 'A morning inside a serviced loft in Mount Pleasant, told in five looks. The robe for the slow start, taupe for the tastemaker, a white shirt and silk scarf for the garden, the beanie to land soft. One warm grade, no wasted frames, an address turned into a person.',
    size: 'large',
    gallery: amaryllisGallery
  },
  {
    id: 2,
    slug: 'denim-in-bloom',
    title: 'Denim in Bloom',
    category: 'Sightlines',
    kind: 'gallery',
    hero: '/media/denim/gallery/6491.jpg',
    roles: 'Denim Chill Show Promo · Photography Keong Kadango',
    description: 'The one thing you cannot teach past aesthetic is taste. Flowers that did not blend with the pose came out, and everything that stayed was intended. Shot on a quiet street in Blantyre with Keong Kadango.',
    size: 'large',
    gallery: denimGallery
  },
  {
    id: 3,
    slug: 'the-resident',
    title: 'The Resident',
    category: 'Stories in Motion',
    kind: 'film',
    hero: '/media/amaryllis/poster-the-resident.jpg',
    poster: '/media/amaryllis/poster-the-resident.jpg',
    video: '/media/amaryllis/the-resident.mp4',
    roles: 'Amaryllis Residences · Direction / Edit',
    description: 'A quiet walk through the loft, cut to breathe. The kind of film that sells a feeling, not a floor plan.',
    size: 'medium'
  },
  {
    id: 4,
    slug: 'denim-in-bloom-the-film',
    title: 'Denim in Bloom, the Film',
    category: 'Stories in Motion',
    kind: 'film',
    hero: '/media/denim/poster-denim-in-bloom.jpg',
    poster: '/media/denim/poster-denim-in-bloom.jpg',
    video: '/media/denim/denim-in-bloom.mp4',
    roles: 'Editorial · Direction / Edit · with Tikonze Apapa & Ruva',
    description: 'The denim editorial in motion. Softness earning its place, one bench and one bouquet at a time.',
    size: 'medium'
  },
  {
    id: 5,
    slug: 'sambas-three-ways',
    title: 'Sambas, Three Ways',
    category: 'Stories in Motion',
    kind: 'film',
    hero: '/media/amaryllis/poster-sambas.jpg',
    poster: '/media/amaryllis/poster-sambas.jpg',
    video: '/media/amaryllis/sambas-3-ways.mp4',
    roles: 'Direction / Styling',
    description: 'One shoe, three registers. A quiet study in how far a single silhouette stretches before it breaks. It does not.',
    size: 'medium'
  },
  {
    id: 6,
    slug: 'jean-drive',
    title: 'Jean Drive',
    category: 'Stories in Motion',
    kind: 'film',
    hero: '/media/denim/poster-jean-drive.jpg',
    poster: '/media/denim/poster-jean-drive.jpg',
    video: '/media/denim/jean-drive.mp4',
    roles: 'TKA Collaboration · Direction / Edit',
    description: 'The fun cut. Denim, motion, and a drive that was worth it.',
    size: 'medium'
  }
];

function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const [zoom, setZoom] = useState<string | null>(null);

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
        aria-label="Close"
        className="fixed top-6 right-6 md:top-10 md:right-10 p-3 opacity-50 hover:opacity-100 transition-opacity z-20"
      >
        <X size={22} strokeWidth={1.2} />
      </button>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-28" onClick={(e) => e.stopPropagation()}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-5">{work.category}</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">{work.title}</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-8">{work.roles}</p>
          <p className="text-lg font-light leading-relaxed opacity-80 max-w-2xl mb-10">{work.description}</p>
          <div className="w-16 border-t border-brand-accent/40 mb-12" />

          {work.kind === 'film' ? (
            <div className="aspect-[9/16] max-h-[80vh] mx-auto overflow-hidden bg-brand-ink/5">
              <video
                src={work.video}
                poster={work.poster}
                controls
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
              {work.gallery!.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setZoom(src)}
                  className="block w-full overflow-hidden bg-brand-ink/5 group/photo"
                >
                  <img
                    src={src}
                    loading="lazy"
                    alt={`${work.title} — frame ${i + 1}`}
                    className="w-full opacity-90 group-hover/photo:opacity-100 group-hover/photo:scale-[1.03] transition-all duration-700 ease-out"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
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

export default function Presence() {
  // Same as Experiments: the open work lives in the URL so a gallery or film
  // can be linked to directly. An unknown slug falls back to the index.
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const openWork = slug ? works.find(w => w.slug === slug) ?? null : null;

  const filtered = activeCategory === 'All'
    ? works
    : works.filter(w => w.category === activeCategory);

  const currentExplainer = categories.find(c => c.name === activeCategory)?.explainer;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12">
      <SEO
        title={openWork ? openWork.title : 'Presence'}
        description={openWork?.description}
        image={openWork?.hero}
      />

      <header className="mb-20 md:mb-40 max-w-2xl relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -left-16 -top-10 pointer-events-none"
        >
          <User size={140} strokeWidth={0.5} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-serif mb-8 md:mb-12 leading-tight tracking-tight"
        >
          Presence
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="flex flex-wrap gap-6 md:gap-10 mb-12"
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

      <div className="flex flex-col space-y-24 md:space-y-40 pb-40">
        <AnimatePresence mode="popLayout">
          {filtered.map((work, idx) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => navigate(`/presence/${work.slug}`)}
              className={`
                relative group cursor-pointer
                ${work.size === 'large' ? 'w-full md:w-4/5' : 'w-full md:w-3/5'}
                ${idx % 2 === 0 ? 'mr-auto' : 'ml-auto'}
              `}
            >
              <Parallax offset={idx % 2 === 0 ? 30 : -30}>
                <div className="aspect-[3/4] overflow-hidden mb-8 md:mb-12 bg-brand-ink/5 relative">
                  <img
                    src={work.hero}
                    alt={work.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />

                  <div className="absolute inset-0 bg-brand-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 md:p-12 text-white pointer-events-none">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-semibold mb-2 opacity-70">
                      {work.kind === 'film' ? 'Play film' : `View gallery · ${work.gallery!.length} photos`}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-serif italic">{work.title}</h3>
                  </div>

                  {work.kind === 'film' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-brand-bg/80 backdrop-blur-sm flex items-center justify-center text-brand-ink group-hover:scale-110 transition-transform duration-500">
                        <Play size={20} strokeWidth={1.5} className="translate-x-[1px]" />
                      </div>
                    </div>
                  )}
                </div>
              </Parallax>

              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4">
                <h3 className="text-2xl md:text-3xl font-serif group-hover:italic transition-all duration-500">{work.title}</h3>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-40 font-medium">{work.roles}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {openWork && <WorkModal work={openWork} onClose={() => navigate('/presence')} />}
      </AnimatePresence>
    </div>
  );
}
