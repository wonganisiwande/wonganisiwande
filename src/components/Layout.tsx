import { ReactNode, useState, useEffect } from 'react';
import Navigation from './Navigation';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Instagram, Linkedin, Music2, Copyright } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // If we've scrolled more than 90% of the page
      setIsNearBottom(latest > 0.9);
    });
  }, [scrollYProgress]);

  return (
    <div className="min-h-screen selection:bg-brand-ink selection:text-brand-bg relative overflow-x-hidden transition-colors duration-700">
      <Navigation />
      
      {/* Fixed Social Bar */}
      <div className="fixed left-8 bottom-10 z-40 hidden lg:flex flex-col space-y-8 opacity-30 hover:opacity-100 transition-opacity duration-500 text-brand-ink">
        <a href="https://www.instagram.com/wongani.ai" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Instagram size={18} strokeWidth={1.5} /></a>
        <a href="https://www.tiktok.com/@wongani.siwande" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Music2 size={18} strokeWidth={1.5} /></a>
        <a href="https://www.linkedin.com/in/wongani-siwande-/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Linkedin size={18} strokeWidth={1.5} /></a>
        <div className="w-[1px] h-20 bg-brand-accent/60 mx-auto" />
      </div>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pt-24 md:pt-32 px-4 md:px-8 pb-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="px-6 md:px-12 py-12 md:py-16 border-t border-brand-ink/5 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6 text-[10px] uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-all duration-700 text-brand-ink">
        <motion.div
          animate={{ 
            opacity: isNearBottom ? 0.6 : 1,
            scale: isNearBottom ? 0.95 : 1
          }}
          className="flex items-center gap-2 whitespace-nowrap order-2 md:order-1"
        >
          {isNearBottom ? <Copyright size={14} strokeWidth={1.5} /> : `© ${new Date().getFullYear()} Wongani Siwande`}
        </motion.div>
        
        <motion.div
          animate={{
            gap: isNearBottom ? '1.5rem' : '2.5rem'
          }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-10 order-1 md:order-2"
        >
          <a href="https://www.instagram.com/wongani.ai" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity flex items-center gap-2">
            {isNearBottom ? <Instagram size={16} strokeWidth={1.2} /> : 'Instagram'}
          </a>
          <a href="https://www.tiktok.com/@wongani.siwande" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity flex items-center gap-2">
            {isNearBottom ? <Music2 size={16} strokeWidth={1.2} /> : 'TikTok'}
          </a>
          <a href="https://www.linkedin.com/in/wongani-siwande-/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity flex items-center gap-2">
            {isNearBottom ? <Linkedin size={16} strokeWidth={1.2} /> : 'LinkedIn'}
          </a>
        </motion.div>
      </footer>
    </div>
  );
}
