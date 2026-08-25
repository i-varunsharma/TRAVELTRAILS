'use client';

// A row of pill-shaped, single-select filter chips. Used for the month
// picker on Home, and the region/difficulty filters on the Places pages —
// same look and keyboard behavior everywhere on the site.
//
// `options` is an array of { label, value }. `value` is the currently
// selected option's value, and `onChange` is called with the new value
// whenever a chip is clicked.
function FilterChips({ options, value, onChange, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="group">
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
              isActive
                ? 'bg-rust text-cream'
                : 'bg-cream text-ink border border-ink/15 hover:border-rust'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterChips;
