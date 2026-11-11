import { brands } from '../data/brands';

// A slow, quiet loop of the brands he has worked with. Logos only.
//
// Each mark is a monochrome PNG used as a CSS mask over currentColor, so it
// picks up the ink colour in light mode and bone in dark mode without needing
// two sets of files. The row is rendered twice and slid by exactly half its
// width, which is what makes the loop seamless. Hover pauses it. Anyone who
// prefers reduced motion gets a still, wrapped row instead.
//
// Display height is scaled down from the stored size so the tallest mark sits
// around 44px on desktop and 34px on phones.
const SCALE_DESKTOP = 0.32;
const SCALE_MOBILE = 0.25;

function Mark({ slug, name, w, h, hidden }: { slug: string; name: string; w: number; h: number; hidden?: boolean }) {
  const src = `/media/brands/${slug}.png`;
  return (
    <span
      role={hidden ? undefined : 'img'}
      aria-label={hidden ? undefined : name}
      aria-hidden={hidden || undefined}
      title={hidden ? undefined : name}
      className="brand-mark shrink-0 bg-current opacity-45 hover:opacity-90 transition-opacity duration-500"
      style={{
        ['--w' as string]: `${w}px`,
        ['--h' as string]: `${h}px`,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center'
      }}
    />
  );
}

export default function BrandLoop({ label = 'Some of the brands I’ve worked with' }: { label?: string }) {
  return (
    <section aria-label={label} className="py-16 md:py-24">
      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-10 md:mb-14 text-center">
        {label}
      </p>

      <style>{`
        .brand-mark { width: calc(var(--w) * ${SCALE_MOBILE}); height: calc(var(--h) * ${SCALE_MOBILE}); }
        @media (min-width: 768px) {
          .brand-mark { width: calc(var(--w) * ${SCALE_DESKTOP}); height: calc(var(--h) * ${SCALE_DESKTOP}); }
        }
        @keyframes brand-loop { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .brand-track { animation: brand-loop 55s linear infinite; }
        .brand-viewport:hover .brand-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .brand-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; }
          .brand-track > .brand-dup { display: none; }
        }
      `}</style>

      <div
        className="brand-viewport relative overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
        }}
      >
        <div className="brand-track flex w-max items-center">
          <div className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20">
            {brands.map(b => <Mark key={b.slug} {...b} />)}
          </div>
          <div className="brand-dup flex items-center gap-12 md:gap-20 pr-12 md:pr-20" aria-hidden="true">
            {brands.map(b => <Mark key={`dup-${b.slug}`} {...b} hidden />)}
          </div>
        </div>
      </div>
    </section>
  );
}
