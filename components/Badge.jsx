// A small pill-shaped label — trek difficulty, "N treks", season windows,
// permit notes. `tone` picks the color; `whitespace-nowrap` keeps the text
// from ever wrapping and breaking the pill shape.
const TONES = {
  rust: 'bg-rust text-cream',
  ink: 'bg-ink text-cream',
  outline: 'bg-cream text-ink border border-ink/20',
};

function Badge({ children, tone = 'rust', className = '' }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
