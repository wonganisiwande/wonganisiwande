import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pen, X, ArrowRight } from 'lucide-react';
import Parallax from '../components/Parallax';

const categories = [
  {
    name: 'All',
    explainer: 'Reflections as essays, concept notes, and observations.'
  },
  {
    name: 'Essays',
    explainer: 'Long form reflections on creativity and direction.'
  },
  {
    name: 'Concept Notes',
    explainer: 'Short, focused insights into ideas and choices.'
  },
  {
    name: 'Reflections',
    explainer: 'Personal perspectives on places, projects and taste.'
  }
];

type Credit = { role: string; name: string };
type Media = { type: 'image' | 'video'; src: string; poster?: string };

type Thought = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  credit?: string;
  credits?: Credit[];
  cover: string;
  coverKind: 'magazine' | 'photo';
  body: string[];
  media?: Media[];
};

const A = (n: string) => `/media/amaryllis/gallery/${n}.jpg`;
const D = (n: string) => `/media/denim/gallery/${n}.jpg`;

const thoughtItems: Thought[] = [
  {
    id: 1,
    slug: 'the-amaryllis-editorial',
    title: "The Amaryllis Editorial, Directed",
    category: "Essays",
    description: "Five looks, one morning, one idea. Notes on directing a shoot inside a serviced residence.",
    credit: "Photography by Keong Kadango",
    cover: '/media/covers/cover-tastemaker.jpg',
    coverKind: 'magazine',
    body: [
      "Five looks, one morning, no stylist. The brief I wrote for myself was one line: make an apartment feel like a person.",
      "We shot in phases and every phase had a single job. The robe opens the story, because every honest morning starts slowly (the coffee was real, and it was my second). Taupe carries the middle. One warm grade, nothing shouting. The white shirt and silk scarf take the story outside, where the light is generous and the palms do half the work. The beanie closes it, because every series needs somewhere soft to land.",
      "Keong Kadango shot all of it. He works quietly and refuses to rush a frame, which is exactly why the light looks patient. I handled direction: the order of looks, the pace, where the story breathes. He handled seeing. The set owes him everything.",
      "If you keep one thing from this: a shoot is not forty good photos. It is one idea, wearing five outfits.",
      "P.s, the robe stayed at the residence. Reluctantly."
    ],
    media: [
      { type: 'image', src: A('02-taupe') },
      { type: 'image', src: A('04-robe') },
      { type: 'image', src: A('08-scarf') },
      { type: 'image', src: A('11-beanie') },
      { type: 'video', src: '/media/amaryllis/the-resident.mp4', poster: '/media/amaryllis/poster-the-resident.jpg' }
    ]
  },
  {
    id: 2,
    slug: 'directing-denim-in-bloom',
    title: "Directing Denim in Bloom",
    category: "Essays",
    description: "What happens when the toughest fabric in the wardrobe goes soft for a day.",
    credit: "Photography by Keong Kadango",
    cover: D('03'),
    coverKind: 'photo',
    credits: [
      { role: 'A Production By', name: 'Tikonze Apapa × Wongani Siwande × Ruva' },
      { role: 'Concept & Direction', name: 'Tikonze Apapa, Wongani Siwande' },
      { role: 'Creative Direction', name: 'Wongani Siwande' },
      { role: 'Photography & Co Direction', name: 'Keong Kadango' },
      { role: 'Florals', name: 'Ruva Flowerhouse' },
      { role: 'Reel Edit & Direction', name: 'Wongani Siwande' },
      { role: 'Wardrobe', name: 'Grace & Hustle, Tikonze Apapa' },
      { role: 'Models', name: 'Karen Lombe, Flossy Kapoloma, Wongani Siwande' },
      { role: 'Behind the Scenes', name: 'Sam from Ruva' },
      { role: 'Special Thanks', name: "Joe's Cafe" }
    ],
    body: [
      "The idea arrived as a question: what happens when the toughest fabric in the wardrobe goes soft for a day?",
      "So we argued with denim. Shorts cut at the knee. A white shirt worn open and easy. White socks doing honest work above black loafers. Then flowers where a tie should be, baby's breath and something pink from the hedge.",
      "Denim wants to be casual. The flowers refuse to allow it. That argument is the whole film, and the whole shoot.",
      "We filmed against brick and bougainvillea on a quiet street outside Blantyre. Keong Kadango took the stills and kept catching the wind at the right time (the frame we kept has petals mid move). The films came after: Denim Chill for the slow read, Denim in Bloom for the mood, Jean Drive for the fun of it.",
      "Direction is mostly deciding what a thing is about before the camera comes out. This one was about softness earning its place.",
      "P.s, the bench was colder than it looks."
    ],
    media: [
      { type: 'image', src: D('01') },
      { type: 'image', src: D('05') },
      { type: 'image', src: D('09') },
      { type: 'image', src: D('10') },
      { type: 'video', src: '/media/denim/denim-in-bloom.mp4', poster: '/media/denim/poster-denim-in-bloom.jpg' }
    ]
  },
  {
    id: 3,
    slug: 'dressing-for-an-address',
    title: "Dressing for an Address",
    category: "Concept Notes",
    description: "Every wardrobe decision on the Amaryllis shoot answered one question: what would this address wear?",
    cover: '/media/covers/cover-place-to-be.jpg',
    coverKind: 'magazine',
    body: [
      "The apartment came first. Every wardrobe decision on the Amaryllis shoot answered one question: what would this address wear?",
      "A white robe, because luxury at home is texture, not logos. Taupe on taupe, because the walls were warm and I refuse to fight a wall. An oversized white shirt with a scarf at the neck, because outside those gates a scarf is the cheapest way to look like you own the garden. And the beanie with glasses I actually wear, because a look that needs props is a costume.",
      "One rule held the whole set together: one finishing detail per look. The scarf knot. The watch. The white cup. Taste is choosing, not adding.",
      "P.s, the espresso in the garden frames was finished by frame three. Some things you cannot art direct."
    ],
    media: [
      { type: 'image', src: A('01-taupe') },
      { type: 'image', src: A('05-robe') },
      { type: 'image', src: A('09-scarf') }
    ]
  },
  {
    id: 4,
    slug: 'loafers-white-socks-flowers',
    title: "Loafers, White Socks, Flowers",
    category: "Concept Notes",
    description: "Styling notes from the Denim Chill shoot, for anyone who wants the recipe.",
    credit: "Photography by Keong Kadango",
    cover: D('06'),
    coverKind: 'photo',
    body: [
      "Styling notes from the Denim Chill shoot, for anyone who wants the recipe.",
      "Start with light wash denim, cut at the knee. It reads relaxed before you do anything else. Keep the shirt white and one size generous, sleeves pushed, collar open. Then the part people argue about: white crew socks pulled straight, black loafers, no compromise. The contrast is the point. It says I know the rules and I am comfortable anyway.",
      "The flowers are the thesis. Tucked at the collar like a pocket square that grew ambitions, they turn an off duty fit into an editorial one. Keep the palette to three colours and let one of them be a flower.",
      "Keong Kadango shot it patient and close. The detail frames (socks, loafers, the seam at the knee) matter as much as the portraits. Details are where a look either holds or lets go.",
      "P.s, loafers with white socks divides rooms. I stand where I stand."
    ],
    media: [
      { type: 'image', src: D('02') },
      { type: 'image', src: D('06') },
      { type: 'image', src: D('10') }
    ]
  },
  {
    id: 5,
    slug: 'checked-in',
    title: "Checked In: a Night at the Bachelor Pad",
    category: "Reflections",
    description: "A serviced apartment as a rehearsal for the life you are building. Notes from a night at Amaryllis Residences.",
    cover: '/media/covers/cover-checked-in.jpg',
    coverKind: 'magazine',
    body: [
      "A house is just a house... until it's yours. I spent a night at the Amaryllis Residences in Mount Pleasant to test a theory: that a serviced apartment can feel less like a hotel and more like a rehearsal for the life you are building.",
      "The loft makes its case in small ways. Morning light on the mezzanine rail. A kitchen that expects you to actually cook. Stairs that ask you to slow down on the way up (I did, partly for the view, partly for the knees). The kind of quiet that lets you hear your own taste.",
      "I made coffee, wore the robe longer than the schedule allowed, and watched the hills do their slow show through the window. Nobody knocked. That detail alone is worth the address.",
      "What I took home was a note about aspiration. The point of a beautiful room is not the room. It is who you get to practice being while you are in it.",
      "P.s, ask for the loft with the hills view. Trust me on this one."
    ],
    media: [
      { type: 'image', src: A('04-robe') },
      { type: 'image', src: A('06-robe') },
      { type: 'image', src: A('13-details') },
      { type: 'video', src: '/media/amaryllis/the-resident.mp4', poster: '/media/amaryllis/poster-the-resident.jpg' }
    ]
  }
];

// Editorial scatter positions, desktop only. Mobile stacks in flow.
const desktopPositions = [
  { left: '6%', top: 0 },
  { left: '54%', top: 120 },
  { left: '12%', top: 340 },
  { left: '58%', top: 520 },
  { left: '28%', top: 720 }
];

function ArticleReader({ article, onClose }: { article: Thought; onClose: () => void }) {
  const [zoom, setZoom] = useState<string | null>(null);
  const images = article.media?.filter(m => m.type === 'image') ?? [];
  const videos = article.media?.filter(m => m.type === 'video') ?? [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoom) setZoom(null);
        else onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
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
            {article.category}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-4">
            {article.title}
          </h1>
          {article.credit && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-10">
              {article.credit}
            </p>
          )}
          <div className="w-16 border-t border-brand-accent/40 mb-10" />
          <div className="space-y-7">
            {article.body.map((para, i) => (
              <p key={i} className="text-lg font-light leading-relaxed opacity-80">
                {para}
              </p>
            ))}
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

              <Link
                to="/presence"
                className="inline-flex items-center gap-3 mt-10 text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity"
              >
                <span>See the full shoot in Presence</span>
                <ArrowRight size={14} />
              </Link>
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

          <div className="mt-14 pt-8 border-t border-brand-ink/5 text-[10px] uppercase tracking-[0.3em] opacity-30">
            Wongani Siwande
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
        image={openArticle?.cover}
      />

      <header className="mb-20 md:mb-60 max-w-2xl relative">
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
      </header>

      {/* Mobile: clean stack. Desktop: editorial scatter. */}
      <div className="relative w-full space-y-8 md:space-y-0 pb-20 md:pb-0 md:min-h-[1050px]">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="md:absolute group cursor-pointer max-w-full md:max-w-sm"
              style={{
                left: desktopPositions[idx % desktopPositions.length].left,
                top: desktopPositions[idx % desktopPositions.length].top
              }}
              onClick={() => navigate(`/thoughts/${item.slug}`)}
            >
              <Parallax offset={idx % 2 === 0 ? 15 : -15}>
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
