import { useEffect, useRef, useState } from 'react';

// Detail first. A tile opens on the detail (the knot, the glass, the
// stethoscope), muted, and develops into the full frame in colour once it is
// properly on screen, the way a print comes up in the tray. Hover shows the
// detail again on desktop. Anyone who prefers less motion gets the full frame.

export default function Develop({
  src,
  detail,
  alt,
  position
}: {
  src: string;
  detail: string;
  alt: string;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [developed, setDeveloped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setDeveloped(true);
      return;
    }
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => setDeveloped(true), 700);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} className={`develop absolute inset-0 ${developed ? 'is-developed' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="develop-full absolute inset-0 w-full h-full object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
      <img
        src={detail}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="develop-detail absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
