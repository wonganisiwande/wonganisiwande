import { useEffect } from 'react';

// Reference-counted body scroll lock. The mobile menu, the article reader and
// the gallery can each request a lock; the body only unlocks once the LAST one
// releases. This prevents the classic bug where closing one overlay (or
// navigating) leaves the page frozen because another handler reset the style.
let lockCount = 0;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    if (lockCount === 0) {
      document.body.style.overflow = 'hidden';
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = '';
      }
    };
  }, [active]);
}
