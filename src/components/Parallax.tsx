import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  key?: string | number;
}

export default function Parallax({ children, offset = 50, className = "" }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const springY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  );
}
