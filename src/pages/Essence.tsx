import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { Circle } from 'lucide-react';
import Parallax from '../components/Parallax';
import BrandLoop from '../components/BrandLoop';
import { ESSENCE } from '../data/copy';

const sections = ESSENCE.sections;

export default function Essence() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 min-h-[80vh] flex flex-col justify-center">
      <SEO title="Essence" />
      
      <div className="max-w-4xl space-y-24 md:space-y-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12 relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute -left-20 -top-10 pointer-events-none"
          >
            <Circle size={120} strokeWidth={0.5} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            Essence
          </h1>
          <p className="text-brand-muted text-xl md:text-2xl font-light leading-relaxed opacity-60">
            {ESSENCE.intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
          {sections.map((section, idx) => (
            <Parallax key={section.title} offset={idx * 15 + 10}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: idx * 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40">
                  {section.title}
                </h2>
                <p className="text-lg font-light leading-relaxed opacity-70">
                  {section.content}
                </p>
              </motion.div>
            </Parallax>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.6 }}
          className="max-w-2xl space-y-12 text-lg font-light leading-relaxed opacity-60"
        >
          <p>
            {ESSENCE.closer}
          </p>
        </motion.div>

        {/* Logos only. What he did for each brand is deliberately not stated. */}
        <BrandLoop />
      </div>
    </div>
  );
}
