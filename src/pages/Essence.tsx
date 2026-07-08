import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { Circle } from 'lucide-react';
import Parallax from '../components/Parallax';

const sections = [
  {
    title: 'Philosophy',
    content: 'Taste is an artform. Ideas come first, opportunity second, action third.'
  },
  {
    title: 'Capabilities',
    content: 'Creative direction, brand strategy, styling, content and presence. Sometimes I direct the frame, sometimes I am in it.'
  },
  {
    title: 'Journey',
    content: 'Blantyre first. Mister Africa International 2023, representing Malawi. Now building premium personal brands, from Malawi to the world.'
  }
];

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
            Who I am, how I think, and why I do what I do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
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
            I believe every strong idea begins with curiosity. My work exists both behind and in front of the camera, shaping ideas, and at times, embodying them. I notice the small thing that makes the whole thing work, then I build around it.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
