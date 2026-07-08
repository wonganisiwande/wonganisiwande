import { NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { User, Lightbulb, Pen, Circle, SendHorizontal, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from './ThemeContext';
import { useScrollLock } from '../lib/useScrollLock';
import Logo from './Logo';

const navItems = [
  { name: 'Presence', path: '/presence', icon: User },
  { name: 'Experiments', path: '/experiments', icon: Lightbulb },
  { name: 'Thoughts', path: '/thoughts', icon: Pen },
  { name: 'Essence', path: '/essence', icon: Circle },
  { name: 'Contact', path: '/contact', icon: SendHorizontal },
];

export default function Navigation() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close menu on route change and handle body scroll
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useScrollLock(isMenuOpen);

  return (
    <nav className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out
      px-6 md:px-12 py-6 md:py-10 flex justify-between items-center pointer-events-none
      ${isScrolled ? 'bg-brand-bg/90 backdrop-blur-md border-b border-brand-ink/5 py-3 md:py-4' : ''}
    `}>
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto z-50"
      >
        <NavLink 
          to="/" 
          onClick={() => setIsMenuOpen(false)}
          aria-label="Wongani Siwande Home"
          className="group flex items-center gap-2"
        >
          <Logo size={isScrolled ? 28 : 36} className="text-brand-ink" />
        </NavLink>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8 lg:space-x-12 pointer-events-auto">
        <motion.ul 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex items-center space-x-6 lg:space-x-10"
        >
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-2 transition-all duration-700 ease-in-out group
                  ${isActive ? 'opacity-100 italic' : 'opacity-40 hover:opacity-100'}
                `}
              >
                <motion.div
                  animate={{ 
                    scale: isScrolled ? 1.05 : 1
                  }}
                  whileHover={{ scale: 1.1, y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex items-center gap-2"
                >
                  <item.icon size={14} strokeWidth={1.2} className={isScrolled ? 'opacity-60' : 'opacity-40 group-hover:opacity-100'} />
                  <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                </motion.div>
              </NavLink>
            </li>
          ))}
        </motion.ul>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 opacity-40 hover:opacity-100 transition-opacity duration-500 focus:outline-none"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={16} strokeWidth={1.2} /> : <Sun size={16} strokeWidth={1.2} />}
        </button>
      </div>

      {/* Mobile Menu Toggle & Theme Toggle */}
      <div className="md:hidden flex items-center gap-4 pointer-events-auto z-50">
        <button
          onClick={toggleTheme}
          className="p-2 opacity-40 hover:opacity-100 transition-opacity duration-500 focus:outline-none"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={20} strokeWidth={1.2} /> : <Sun size={20} strokeWidth={1.2} />}
        </button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 -mr-2"
        >
          {isMenuOpen ? <X size={24} strokeWidth={1.2} /> : <Menu size={24} strokeWidth={1.2} />}
        </motion.button>
      </div>

      {/* Mobile Navigation Overlay — portaled to <body> so the nav's backdrop-filter
          (active once scrolled) can't trap this fixed overlay and let the page bleed through. */}
      {createPortal(
        <AnimatePresence>
          {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-brand-bg md:hidden flex flex-col justify-center overflow-y-auto px-10 py-24 z-[60]"
          >
            <ul className="space-y-6 md:space-y-8">
              {navItems.map((item, idx) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink 
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-6 text-3xl md:text-4xl font-serif tracking-tight
                      ${isActive ? 'italic opacity-100' : 'opacity-30 hover:opacity-100 transition-opacity'}
                    `}
                  >
                    <item.icon size={26} strokeWidth={0.8} className="opacity-40" />
                    <span>{item.name}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-16 left-10 right-10 pt-10 border-t border-brand-ink/5"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-20 font-semibold mb-6">Connect</p>
              <div className="flex space-x-10">
                <a href="https://www.instagram.com/wonganisiwande/" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">Instagram</a>
                <a href="https://www.tiktok.com/@wonganisiwande" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">TikTok</a>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
}
