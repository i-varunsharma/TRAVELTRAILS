// Five dots showing how demanding a trek is (1 = easiest, 5 = hardest).
// Filled dots are rust, empty ones are a faint outline.
function FitnessMeter({ level, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`} aria-label={`Fitness level ${level} out of 5`}>
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className={`w-2 h-2 rounded-full ${dot <= level ? 'bg-rust' : 'bg-ink/15'}`}
        />
      ))}
    </div>
  );
}

export default FitnessMeter;
