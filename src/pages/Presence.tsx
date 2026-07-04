import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { useRef, useState } from 'react';
import { User, Play, Pause } from 'lucide-react';
import Parallax from '../components/Parallax';

const categories = [
  {
    name: 'All',
    explainer: 'Moments of intention, movement, and energy captured visually and in motion.'
  },
  {
    name: 'Sightlines',
    explainer: 'Frames that show presence, perspective, and form.'
  },
  {
    name: 'Stories in Motion',
    explainer: 'Films that move, inform, and inspire.'
  }
];

type Project = {
  id: number;
  title: string;
  roles: string;
  category: string[];
  image?: string;
  video?: string;
  poster?: string;
  size: 'large' | 'medium';
};

const projects: Project[] = [
  {
    id: 1,
    title: "The Tastemaker at Home",
    roles: "Amaryllis Residences · Photography Keong Kadango",
    category: ['Sightlines'],
    image: "/media/amaryllis/taupe-tastemaker.jpg",
    size: "large"
  },
  {
    id: 2,
    title: "Denim in Bloom I",
    roles: "Denim Chill Editorial · Photography Keong Kadango",
    category: ['Sightlines'],
    image: "/media/denim/bloom-portrait.jpg",
    size: "medium"
  },
  {
    id: 3,
    title: "Slow Mornings, Done Right",
    roles: "Amaryllis Residences · Photography Keong Kadango",
    category: ['Sightlines'],
    image: "/media/amaryllis/robe-morning.jpg",
    size: "medium"
  },
  {
    id: 4,
    title: "The Resident",
    roles: "Amaryllis Residences · Direction / Edit",
    category: ['Stories in Motion'],
    video: "/media/amaryllis/the-resident.mp4",
    poster: "/media/amaryllis/poster-the-resident.jpg",
    size: "medium"
  },
  {
    id: 5,
    title: "The Full Look",
    roles: "Denim Chill Editorial · Photography Keong Kadango",
    category: ['Sightlines'],
    image: "/media/denim/full-look.jpg",
    size: "large"
  },
  {
    id: 7,
    title: "The Place to Be",
    roles: "Amaryllis Residences · Photography Keong Kadango",
    category: ['Sightlines'],
    image: "/media/amaryllis/scarf-exterior.jpg",
    size: "medium"
  },
  {
    id: 8,
    title: "Denim in Bloom, the Film",
    roles: "Denim Chill Editorial · Direction / Edit",
    category: ['Stories in Motion'],
    video: "/media/denim/denim-in-bloom.mp4",
    poster: "/media/denim/poster-denim-in-bloom.jpg",
    size: "medium"
  },
  {
    id: 9,
    title: "Honest Details",
    roles: "Denim Chill Editorial · Photography Keong Kadango",
    category: ['Sightlines'],
    image: "/media/denim/detail-loafers.jpg",
    size: "medium"
  },
  {
    id: 10,
    title: "Sambas, Three Ways",
    roles: "Amaryllis Residences · Direction / Styling",
    category: ['Stories in Motion'],
    video: "/media/amaryllis/sambas-3-ways.mp4",
    poster: "/media/amaryllis/poster-sambas.jpg",
    size: "medium"
  },
  {
    id: 11,
    title: "Off Duty",
    roles: "Amaryllis Residences · Photography Keong Kadango",
    category: ['Sightlines'],
    image: "/media/amaryllis/off-duty.jpg",
    size: "medium"
  },
  {
    id: 12,
    title: "Jean Drive",
    roles: "TKA Collaboration · Direction / Edit",
    category: ['Stories in Motion'],
    video: "/media/denim/jean-drive.mp4",
    poster: "/media/denim/poster-jean-drive.jpg",
    size: "medium"
  }
];

function VideoFrame({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="aspect-[9/16] max-h-[80vh] mx-auto overflow-hidden mb-8 md:mb-12 bg-brand-ink/5 relative cursor-pointer" onClick={toggle}>
      <video
        ref={videoRef}
        src={project.video}
        poster={project.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${playing ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <div className="w-16 h-16 rounded-full bg-brand-bg/80 backdrop-blur-sm flex items-center justify-center text-brand-ink">
          {playing ? <Pause size={20} strokeWidth={1.5} /> : <Play size={20} strokeWidth={1.5} className="translate-x-[1px]" />}
        </div>
      </div>
    </div>
  );
}

export default function Presence() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category.includes(activeCategory));

  const currentExplainer = categories.find(c => c.name === activeCategory)?.explainer;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12">
      <SEO title="Presence" />

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

      <div className="flex flex-col space-y-24 md:space-y-48 pb-40">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`
                relative group
                ${project.size === 'large' ? 'w-full md:w-4/5' : 'w-full md:w-3/5'}
                ${idx % 2 === 0 ? 'mr-auto' : 'ml-auto'}
              `}
            >
              <Parallax offset={idx % 2 === 0 ? 30 : -30}>
                {project.video ? (
                  <VideoFrame project={project} />
                ) : (
                  <div className="aspect-[3/4] overflow-hidden mb-8 md:mb-12 bg-brand-ink/5 relative cursor-pointer">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                    />

                    <div className="absolute inset-0 bg-brand-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 md:p-12 text-white pointer-events-none">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-semibold mb-2 opacity-70">View Presence</p>
                      <h3 className="text-3xl md:text-4xl font-serif italic">{project.title}</h3>
                    </div>
                  </div>
                )}
              </Parallax>

              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4">
                <h3 className="text-2xl md:text-3xl font-serif group-hover:italic transition-all duration-500">{project.title}</h3>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-40 font-medium">{project.roles}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
