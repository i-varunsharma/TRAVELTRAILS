'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

// Counts up from 0 to the numeric part of `value` (e.g. "200+", "4.9",
// "10K+") once it scrolls into view, keeping whatever prefix/suffix the
// stat carries (+, K+, %, ...).
function AnimatedCounter({ value, duration = 1.4 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [isInView, target, duration, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
