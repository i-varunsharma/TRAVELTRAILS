'use client';
import { motion } from 'framer-motion';

// Fades + rises content into place the first time it scrolls into view.
// Used to give otherwise-static sections a sense of arrival, matching the
// hero's own entrance animation rather than having motion live only above
// the fold.
function Reveal({ children, delay = 0, y = 20, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
