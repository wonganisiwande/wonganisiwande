import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { contents } from '../data/contents';

// Everything, one line each, newest first. Edited, not accumulated.
export default function Contents() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-12">
      <SEO title="Index" description="Every essay, case study, film and gallery by Wongani Siwande, newest first, one line each." />
      <header className="mb-16 md:mb-24 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-serif mb-8 leading-tight tracking-tight"
        >
          Index
        </motion.h1>
        <p className="text-brand-muted text-lg font-light leading-relaxed">
          Every piece on the site, newest first. One line each, so you can find the one you came for.
        </p>
      </header>
      <ul className="border-t border-brand-ink/10 mb-24">
        {contents.map(e => (
          <li key={e.href} className="border-b border-brand-ink/10">
            <Link
              to={e.href}
              className="group grid grid-cols-[4.5rem_minmax(0,1fr)] md:grid-cols-[5.5rem_minmax(0,1fr)_auto] gap-x-4 md:gap-x-8 gap-y-1 py-5 items-baseline"
            >
              <span className="font-serif text-sm tracking-wide opacity-50 tabular-nums">{e.no ?? e.kind}</span>
              <span className="min-w-0">
                <span className="font-serif text-xl md:text-2xl group-hover:italic transition-all duration-500">{e.title}</span>
                <span className="block font-serif italic text-base opacity-55 mt-1">{e.verdict}</span>
              </span>
              <span className="col-start-2 md:col-start-auto text-[10px] uppercase tracking-[0.22em] opacity-40 whitespace-nowrap">
                {e.no ? `${e.kind} · ` : ''}{e.month}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
