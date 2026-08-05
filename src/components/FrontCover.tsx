import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { featured } from '../lib/featured';

const STORAGE_KEY = 'ws-front-cover-dismissed';

/**
 * The front cover bubble. Sits bottom right (the social bar owns bottom left)
 * and points at whatever is newest on the site.
 *
 * It stays out of the way on purpose: it waits before appearing so it never
 * fights the page load, it hides on the page it points at, and once someone
 * closes it they do not see it again until a new story is published.
 */
export default function FrontCover() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!featured) return;

    // Already on the thing being advertised, so there is nothing to advertise.
    if (location.pathname === featured.href) {
      setVisible(false);
      return;
    }

    let dismissed: string | null = null;
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Private browsing or storage disabled. Show it; worst case it reappears.
    }
    if (dismissed === featured.id) return;

    // Hold off until they have started reading. Landing straight into a card
    // that covers the hero copy is worse than surfacing a moment later. The
    // timer is the fallback for anyone who never scrolls.
    const show = () => setVisible(true);
    const onScroll = () => {
      if (window.scrollY > 200) show();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = window.setTimeout(show, 9000);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, [location.pathname]);

  const dismiss = () => {
    setVisible(false);
    if (!featured) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, featured.id);
    } catch {
      // Nothing to do. It will simply show again next visit.
    }
  };

  if (!featured) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-4 md:bottom-10 md:right-10 z-40 w-[calc(100vw-2rem)] max-w-[300px]"
        >
          <div className="relative border border-brand-ink/10 bg-brand-bg/95 backdrop-blur-md shadow-2xl shadow-brand-ink/10">
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-2 right-2 z-10 p-1.5 opacity-30 hover:opacity-100 transition-opacity"
            >
              <X size={13} strokeWidth={1.4} />
            </button>

            <Link to={featured.href} onClick={() => setVisible(false)} className="flex items-stretch gap-4 p-4 group">
              <div className="w-[58px] shrink-0 overflow-hidden bg-brand-ink/5">
                <img
                  src={featured.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              <div className="min-w-0 pr-4">
                <p className="text-[9px] uppercase tracking-[0.25em] font-semibold text-brand-accent mb-2">
                  {featured.kicker}
                </p>
                <h3 className="font-serif text-[15px] leading-snug mb-1.5 group-hover:italic transition-all duration-500">
                  {featured.title}
                </h3>
                <p className="text-[11px] font-light leading-relaxed opacity-45 line-clamp-2">
                  {featured.blurb}
                </p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-90 transition-opacity">
                  Read
                  <ArrowRight size={11} strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
