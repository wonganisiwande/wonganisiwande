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
 * It is a greeting, not a chaser. It appears once when a page opens (a fresh
 * load, a refresh or switching pages), steps aside the moment you start
 * scrolling, and leaves on its own after a few seconds. Scrolling never brings
 * it back; only the next page does. It hides on the page it points at, and once
 * someone closes it they do not see it again until a new story is published.
 */
const DELAY_HOME = 3800; // the home splash runs 2.5s; let the hero land first
const DELAY = 1600;
const STAY = 9000;

export default function FrontCover() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (!featured) return;

    // Already on the thing being advertised, so there is nothing to advertise.
    if (location.pathname === featured.href) return;

    let dismissed: string | null = null;
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Private browsing or storage disabled. Show it; worst case it reappears.
    }
    if (dismissed === featured.id) return;

    let hideTimer: number | undefined;
    let shown = false;
    const hide = () => {
      setVisible(false);
      window.removeEventListener('scroll', onScroll);
    };
    // Once it is up, the first real scroll sends it away for this page.
    const onScroll = () => {
      if (shown && window.scrollY > 120) hide();
    };
    const showTimer = window.setTimeout(() => {
      // Already reading by the time it would appear: skip this page entirely.
      if (window.scrollY > 120) return;
      shown = true;
      setVisible(true);
      window.addEventListener('scroll', onScroll, { passive: true });
      hideTimer = window.setTimeout(hide, STAY);
    }, location.pathname === '/' ? DELAY_HOME : DELAY);

    return () => {
      window.clearTimeout(showTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
      window.removeEventListener('scroll', onScroll);
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
          className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-40 w-[calc(100vw-2rem)] max-w-[260px] md:max-w-[300px]"
        >
          <div className="relative border border-brand-ink/10 bg-brand-bg/95 backdrop-blur-md shadow-2xl shadow-brand-ink/10">
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute top-0 right-0 z-10 p-3 opacity-30 hover:opacity-100 transition-opacity"
            >
              <X size={13} strokeWidth={1.4} />
            </button>

            <Link to={featured.href} onClick={() => setVisible(false)} className="flex items-stretch gap-3 md:gap-4 p-3 md:p-4 group">
              <div className="w-[44px] md:w-[58px] shrink-0 overflow-hidden bg-brand-ink/5">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              <div className="min-w-0 pr-4">
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-accent mb-2">
                  {featured.kicker}
                </p>
                <p className="font-serif text-[15px] leading-snug mb-1.5 group-hover:italic transition-all duration-500">
                  {featured.title}
                </p>
                <p className="hidden md:block text-[11px] font-light leading-relaxed opacity-45 line-clamp-2">
                  {featured.blurb}
                </p>
                <span className="hidden md:inline-flex mt-2.5 items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-90 transition-opacity">
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
