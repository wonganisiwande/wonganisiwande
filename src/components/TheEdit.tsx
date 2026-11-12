import { motion } from 'motion/react';
import Seal from './Seal';
import { edit } from '../data/edit';

// Five things he rates right now. No photos, so it costs five minutes to change
// and the home page is never stale. Carries the seal, because these are chosen,
// not made.
export default function TheEdit() {
  return (
    <section aria-labelledby="the-edit" className="py-20 md:py-32 px-4 border-t border-brand-ink/5">
      <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <h2 id="the-edit" className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-3">
            The Edit
          </h2>
          <p className="font-serif text-2xl md:text-3xl">What I rate right now.</p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Seal size={46} title="Chosen by Wongani Siwande" />
          <span className="text-[9px] uppercase tracking-[0.25em] opacity-40">{edit.issue}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        {edit.items.map((it, i) => (
          <motion.div
            key={it.what}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-brand-ink pt-4 min-w-0"
          >
            <p className="text-[9px] uppercase tracking-[0.25em] font-semibold opacity-40 mb-2">{it.cat}</p>
            <p className="font-serif text-xl leading-tight mb-2">{it.what}</p>
            <p className="text-sm font-light leading-relaxed opacity-60">{it.why}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
