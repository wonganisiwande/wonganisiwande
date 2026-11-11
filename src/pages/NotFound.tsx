import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

// Shown for any client side navigation to a URL that does not exist. Direct
// loads of unknown URLs are handled by the prerendered dist/404.html, which
// Netlify serves with a real 404 status now that the SPA catch all rewrite is
// gone. Both say the same thing.
export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 min-h-[60vh] flex flex-col justify-center">
      <SEO title="Not found" description="That page is not here. The work is." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl space-y-10"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] font-semibold opacity-40">404</p>
        <h1 className="text-4xl md:text-6xl font-serif leading-tight">
          That page is not here. The work is.
        </h1>
        <p className="text-brand-muted text-lg font-light leading-relaxed opacity-60">
          Either the link was old or the address was a guess. Both happen. Everything on the site is one of these.
        </p>
        <div className="flex flex-wrap gap-x-10 gap-y-4 pt-2">
          {[
            { to: '/presence', label: 'Presence' },
            { to: '/experiments', label: 'Experiments' },
            { to: '/thoughts', label: 'Thoughts' },
            { to: '/contact', label: 'Contact' }
          ].map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="inline-flex items-center gap-3 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold opacity-50 hover:opacity-100 transition-opacity"
            >
              <span>{l.label}</span>
              <ArrowRight size={13} />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
