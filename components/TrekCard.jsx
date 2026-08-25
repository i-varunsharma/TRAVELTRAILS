import Link from 'next/link';
import { Mountain, Clock, Route, CalendarDays, Users } from 'lucide-react';
import TrekImage from './TrekImage';
import Badge from './Badge';
import FitnessMeter from './FitnessMeter';

const LEVEL_TONE = {
  Beginner: 'outline',
  Moderate: 'rust',
  Difficult: 'ink',
};

// The trek card used on the state page's trek grid and on Home's featured
// treks. `onBook` is called with the trek when someone clicks "Enquire Now"
// — the page that renders the card owns the booking modal, this component
// just reports the click.
function TrekCard({ trek, onBook }) {
  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-ink/10 bg-card shadow-soft hover:shadow-lg hover:border-rust transition-all duration-300">
      <Link href={`/treks/${trek.slug}`} className="relative block overflow-hidden">
        <TrekImage
          src={trek.image}
          alt={trek.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
        <Badge tone={LEVEL_TONE[trek.level]} className="absolute top-3 left-3">
          {trek.level}
        </Badge>
      </Link>

      <div className="p-5 flex flex-col gap-3 grow">
        <Link href={`/treks/${trek.slug}`} className="text-ink">
          <h3 className="font-display uppercase text-xl leading-tight">{trek.name}</h3>
        </Link>

        <div className="flex items-center gap-3 text-sm text-stone-600">
          <FitnessMeter level={trek.fitness} />
          <span>{trek.altitudeGain.toLocaleString()} m altitude gain</span>
        </div>

        <p className="text-sm text-stone-600 leading-relaxed">{trek.caveat}</p>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rust bg-rust/10 rounded-full px-3 py-1.5 w-fit">
          <Users size={13} />
          Next batch {trek.nextBatch} · {trek.slotsLeft} slots left
        </div>

        <div className="grid grid-cols-2 gap-y-1.5 text-sm text-stone-600">
          <div className="flex items-center gap-1.5">
            <Mountain size={14} className="text-rust shrink-0" /> {trek.peak.toLocaleString()} m
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-rust shrink-0" /> {trek.days} {trek.days === 1 ? 'day' : 'days'}
          </div>
          <div className="flex items-center gap-1.5">
            <Route size={14} className="text-rust shrink-0" /> {trek.distance} km
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <CalendarDays size={14} className="text-rust shrink-0" /> {trek.season}
          </div>
        </div>

        <div className="font-display text-2xl text-ink mt-1">
          ₹{trek.price.toLocaleString()} <span className="text-xs font-sans font-normal text-stone-400">per person + 5% GST</span>
        </div>

        <button
          onClick={() => onBook(trek)}
          className="mt-auto bg-rust hover:bg-rust-dark px-5 py-2.5 text-cream font-semibold rounded-full transition-colors cursor-pointer"
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
}

export default TrekCard;
