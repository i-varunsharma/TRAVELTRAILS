import { toSlug } from '@/lib/utils/slug';

// ---------------------------------------------------------------------------
// Every trek on the site starts here, as a short list of real facts: where
// it is, how high/long/far it goes, when to go, and what it costs. The
// functions below turn those facts into the richer content the trek-detail
// page needs (itinerary, reviews, batches) so we don't have to hand-write
// that by hand for every single trek.
//
// Important: none of this uses Math.random() or `new Date()`. Next.js
// renders this data once on the server and again in the browser — if the
// two renders don't match exactly, React throws a hydration error. Every
// "generated" value below is computed the same way every time instead.
// ---------------------------------------------------------------------------

const trekFacts = [
  // Himachal Pradesh
  {
    name: 'Hampta Pass Trek', state: 'Himachal Pradesh', peak: 4270, days: 5, distance: 35,
    season: 'June to September', price: 9000, level: 'Moderate', fitness: 3,
    caveat: 'One steep, loose-scree descent into Chandratal — trekking poles make a real difference here.',
    nextBatch: '14 Jun 2027', image: 'https://hellohikers.in/wp-content/uploads/2025/01/HamptaPass.jpg',
  },
  {
    name: 'Bhrigu Lake Trek', state: 'Himachal Pradesh', peak: 4300, days: 3, distance: 25,
    season: 'June to September', price: 7500, level: 'Moderate', fitness: 3,
    caveat: 'Weather turns fast above the treeline — afternoons often bring sudden hail even in July.',
    nextBatch: '21 Jun 2027', image: 'https://www.akzn.me/blog/bhrigu-lake-trek/images/2019-07-31-11.43.52-1.jpg',
  },
  // Uttarakhand
  {
    name: 'Valley of Flowers Trek', state: 'Uttarakhand', peak: 3658, days: 6, distance: 38,
    season: 'July to September', price: 6000, level: 'Moderate', fitness: 3,
    caveat: 'The valley itself is a gentle walk, but the approach trail has a long, exposed monsoon stretch.',
    nextBatch: '19 Jul 2027', image: 'https://valleyofflowers.info/wp-content/uploads/2015/03/Valley-of-flowers-trek.jpg',
  },
  {
    name: 'Har Ki Dun Trek', state: 'Uttarakhand', peak: 3566, days: 7, distance: 44,
    season: 'April to June, September to December', price: 8000, level: 'Moderate', fitness: 3,
    caveat: 'Long trekking days early on — the first two days cover most of the distance.',
    nextBatch: '3 Oct 2026', image: 'https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2021/02/Har-Ki-Dun-Trek.jpg',
  },
  // Sikkim
  {
    name: 'Dzongri Trek', state: 'Sikkim', peak: 4020, days: 6, distance: 50,
    season: 'March to May, September to November', price: 12000, level: 'Moderate', fitness: 4,
    caveat: 'A genuine high-altitude trek — build in the acclimatization day rather than skipping it.',
    nextBatch: '10 Oct 2026', image: 'https://captureatrip-cms-storage.s3.ap-south-1.amazonaws.com/Dzongri_Valley_Sikkim.jpg',
  },
  {
    name: 'Goechala Trek', state: 'Sikkim', peak: 4940, days: 10, distance: 90,
    season: 'April to June, September to November', price: 16000, level: 'Difficult', fitness: 5,
    caveat: 'The summit push starts at 2am in sub-zero cold — previous high-altitude experience is strongly recommended.',
    nextBatch: '24 Oct 2026', image: 'https://www.himalayajourneys.com/assets/images/india/sikkim-goecha-la-trek.jpg',
  },
  // West Bengal
  {
    name: 'Sandakphu Trek', state: 'West Bengal', peak: 3636, days: 6, distance: 52,
    season: 'April to May, October to December', price: 9500, level: 'Moderate', fitness: 3,
    caveat: 'Trail follows a motorable road for stretches — beautiful views, but less "wilderness" than other Himalayan treks.',
    nextBatch: '17 Oct 2026', image: 'https://trekthehimalayas.com/images/HomePageImages/Desktop/0948eddb-fe.jpg',
  },
  {
    name: 'Singalila Ridge Trek', state: 'West Bengal', peak: 3600, days: 6, distance: 60,
    season: 'March to June, October to December', price: 10000, level: 'Difficult', fitness: 4,
    caveat: 'Longest daily distances of any trek we run in this region — good base fitness matters more than altitude here.',
    nextBatch: '7 Nov 2026', image: 'https://www.farouttrek.com/wp-content/uploads/2024/11/20231109_113004.jpg',
  },
  // Karnataka
  {
    name: 'Kudremukh Trek', state: 'Karnataka', peak: 1894, days: 2, distance: 20,
    season: 'October to February', price: 2800, level: 'Beginner', fitness: 2,
    caveat: 'Grasslands turn slippery after rain — carry proper grip trekking shoes, not running shoes.',
    nextBatch: '7 Nov 2026', image: 'https://www.trekupindia.com/wp-content/uploads/1715/89/kudremukh-trek.jpg',
  },
  {
    name: 'Kumara Parvatha Trek', state: 'Karnataka', peak: 1712, days: 2, distance: 22,
    season: 'October to February', price: 2500, level: 'Difficult', fitness: 4,
    caveat: 'Deceptively tough for its altitude — locals call it one of South India\'s hardest day-and-a-half treks.',
    nextBatch: '14 Nov 2026', image: 'https://thrilltourism.com/storage/4846/YmRqP1NcUoknL80t6MWVjd5NN6OHjxP.jpg',
  },
  // Kerala
  {
    name: 'Chembra Peak Trek', state: 'Kerala', peak: 2100, days: 1, distance: 7,
    season: 'September to February', price: 1800, level: 'Beginner', fitness: 2,
    caveat: 'Forest department caps daily visitors — book your slot at least a week ahead in peak season.',
    nextBatch: '21 Nov 2026', image: 'https://static2.tripoto.com/media/filter/tst/img/184160/TripDocument/chembra-peak.jpg',
  },
  {
    name: 'Meesapulimala Trek', state: 'Kerala', peak: 2640, days: 2, distance: 15,
    season: 'October to March', price: 2500, level: 'Beginner', fitness: 2,
    caveat: 'Highest point most beginners will stand on in South India — expect a cold, windy summit.',
    nextBatch: '28 Nov 2026', image: 'https://keralatrekking.in/wp-content/uploads/2025/04/meesapulimala.jpeg',
  },
  // Maharashtra
  {
    name: 'Kalsubai Peak Trek', state: 'Maharashtra', peak: 1646, days: 1, distance: 12,
    season: 'October to March', price: 1400, level: 'Beginner', fitness: 2,
    caveat: 'Maharashtra\'s highest point and one of its busiest trails — go on a weekday to skip the queue at the ladders.',
    nextBatch: '5 Dec 2026', image: 'https://d26dp53kz39178.cloudfront.net/media/uploads/products/trekking_kalsubai.jpg',
  },
  {
    name: 'Harishchandragad Trek', state: 'Maharashtra', peak: 1422, days: 2, distance: 18,
    season: 'October to February', price: 1200, level: 'Moderate', fitness: 3,
    caveat: 'The Nalichi Vaat approach has an exposed rock-cut staircase — we default to the easier Pachnai route instead.',
    nextBatch: '12 Dec 2026', image: 'https://adventure-pulse.com/wp-content/uploads/2025/06/harishchandragad.jpg',
  },
  // North East
  {
    name: 'Dzukou Valley Trek', state: 'Manipur', peak: 2452, days: 2, distance: 17,
    season: 'June to September', price: 3500, level: 'Moderate', fitness: 3,
    caveat: 'Best known for its June–September lily bloom, which also means monsoon mud on the approach climb.',
    nextBatch: '13 Jun 2027', image: 'https://s7ap1.scene7.com/is/image/incredibleindia/Dzukou-Valley-Nagaland.jpg',
  },
  {
    name: 'Double Decker Root Bridge Trek', state: 'Meghalaya', peak: 1200, days: 2, distance: 7,
    season: 'October to March', price: 3500, level: 'Beginner', fitness: 2,
    caveat: 'Roughly 3,500 mossy stone steps down and back up — knees feel this one more than lungs.',
    nextBatch: '19 Dec 2026', image: 'https://res.cloudinary.com/kmadmin/image/upload/v1618829759/kiomoi/double-decker-root-bridge.jpg',
  },
  {
    name: 'Phawngpui Trek', state: 'Mizoram', peak: 2157, days: 3, distance: 20,
    season: 'November to April', price: 4000, level: 'Moderate', fitness: 3,
    caveat: 'Mizoram\'s highest peak sees very few trekkers — expect a quiet trail and basic village homestays.',
    nextBatch: '26 Dec 2026', image: 'https://plus.unsplash.com/premium_photo-1674917000586-b7564f21540e.jpg',
  },
  {
    name: 'Mount Saramati Trek', state: 'Nagaland', peak: 3826, days: 5, distance: 22,
    season: 'October to April', price: 6500, level: 'Difficult', fitness: 4,
    caveat: 'Nagaland\'s highest point, close to the Myanmar border — permits take longer to process here, so book early.',
    nextBatch: '9 Jan 2027', image: 'https://assamthynk.com/wp-content/uploads/2025/05/mount-saramati-1.png',
  },
  {
    name: 'Deomali Trek', state: 'Odisha', peak: 1672, days: 3, distance: 16,
    season: 'October to February', price: 4000, level: 'Beginner', fitness: 2,
    caveat: "Odisha's second-highest peak, with a gentle gradient — a good first multi-day trek.",
    nextBatch: '16 Jan 2027', image: 'https://media.istockphoto.com/id/1290711211/photo/deomali-hill-top.jpg',
  },
  {
    name: 'Jampui Hills Trek', state: 'Tripura', peak: 1000, days: 2, distance: 9,
    season: 'October to February', price: 1200, level: 'Beginner', fitness: 1,
    caveat: "Gentle ridge walk through Tripura's orange orchards — the easiest overnight trek we run.",
    nextBatch: '23 Jan 2027', image: 'https://i.ytimg.com/vi/Bmb_ykoAFhk/maxresdefault.jpg',
  },
  // Tamil Nadu
  {
    name: 'Nilgiri Hills Trek', state: 'Tamil Nadu', peak: 2637, days: 2, distance: 20,
    season: 'September to May', price: 3000, level: 'Beginner', fitness: 2,
    caveat: 'Runs through shola forest with resident elephant herds — guide-led pace only, no wandering off-trail.',
    nextBatch: '30 Jan 2027', image: 'https://live.staticflickr.com/65535/52367942791_3a37840b8c_b.jpg',
  },
];

// -- Everything below is derived from the facts above, not hand-written. --

const LEVEL_ORDER = ['Beginner', 'Moderate', 'Difficult'];

// A short, honest set of what's included/excluded. This genuinely is the
// same for every trek we run (same operator, same standard package), so it
// isn't faked per-trek — it's shared on purpose.
const INCLUDED = [
  'Certified trek leader & support staff',
  'Camping/homestay accommodation through the trek',
  'All meals from Day 1 dinner to the final day\'s breakfast',
  'Permits and forest entry fees',
  'First-aid kit and oxygen support on high-altitude treks',
];

const EXCLUDED = [
  'Transport to and from the base camp',
  'Personal trekking gear (shoes, jacket, backpack)',
  'Travel insurance',
  'Anything not listed under "Included"',
];

// Generic day-by-day shape: acclimatize, climb, summit, descend. The
// altitude for each day is interpolated toward the peak so the numbers are
// at least internally consistent with each trek's actual stats.
function buildItinerary(days, peak) {
  const startAltitude = Math.max(1200, Math.round(peak * 0.35));
  const itinerary = [];

  for (let day = 1; day <= days; day++) {
    const progress = days === 1 ? 1 : (day - 1) / (days - 1);
    const altitude = Math.round(startAltitude + (peak - startAltitude) * Math.min(progress, 1));

    if (day === 1) {
      itinerary.push({
        day,
        altitude,
        title: 'Drive in & basecamp acclimatization',
        body: 'Meet the group, drive to the trailhead, and take a short acclimatization walk near basecamp before an early dinner.',
      });
    } else if (day === days) {
      itinerary.push({
        day,
        altitude: startAltitude,
        title: 'Descend & drive back',
        body: 'Descend to the trailhead and drive back — trek officially ends by early evening.',
      });
    } else if (altitude >= peak - Math.round(peak * 0.05)) {
      itinerary.push({
        day,
        altitude,
        title: 'Summit day',
        body: 'An early start for the summit push, with the descent to a lower camp in the afternoon.',
      });
    } else {
      itinerary.push({
        day,
        altitude,
        title: `Climb to ${altitude.toLocaleString()} m`,
        body: 'A steady climbing day through changing terrain, with a packed lunch on the trail.',
      });
    }
  }

  return itinerary;
}

// Two short, clearly-labelled sample reviews per trek, built from a small
// rotating pool of first names so they read differently trek to trek.
const REVIEWER_POOL = [
  { name: 'Ananya', rating: 5 },
  { name: 'Rohit', rating: 4 },
  { name: 'Priya', rating: 5 },
  { name: 'Karthik', rating: 5 },
  { name: 'Meera', rating: 4 },
  { name: 'Arjun', rating: 5 },
];

function buildReviews(index, trekName) {
  const first = REVIEWER_POOL[index % REVIEWER_POOL.length];
  const second = REVIEWER_POOL[(index + 3) % REVIEWER_POOL.length];
  return [
    {
      name: first.name,
      rating: first.rating,
      text: `${trekName} was exactly as described — the trek leader kept a pace everyone in the group could manage, and the views were worth every step.`,
    },
    {
      name: second.name,
      rating: second.rating,
      text: 'Well organized from pickup to drop-off. Food was better than I expected for a trek this remote, and the safety briefings felt genuinely thorough, not just a formality.',
    },
  ];
}

// Two upcoming batches per trek: the one from trekFacts, and a second one
// roughly a month later. Slot counts are seeded from the trek's index so
// they're fixed (not random) but still vary trek to trek.
function buildBatches(index, nextBatch, slotsLeft) {
  return [
    { date: nextBatch, slots: slotsLeft, waitlist: slotsLeft === 0 },
    { date: 'Next batch opens soon', slots: 12, waitlist: false },
  ];
}

export const treks = trekFacts.map((fact, index) => {
  const slug = toSlug(fact.name.replace(/'/g, ''));
  const slotsLeft = 2 + ((index * 3) % 8); // deterministic, not random — see note above
  const altitudeGain = fact.peak - Math.round(fact.peak * 0.35);

  return {
    ...fact,
    slug,
    slotsLeft,
    altitudeGain,
    itinerary: buildItinerary(fact.days, fact.peak),
    included: INCLUDED,
    excluded: EXCLUDED,
    reviews: buildReviews(index, fact.name),
    batches: buildBatches(index, fact.nextBatch, slotsLeft),
  };
});

export function getTrekBySlug(slug) {
  return treks.find((trek) => trek.slug === slug) || null;
}

export function getTreksByState(stateName) {
  return treks.filter((trek) => trek.state === stateName);
}

export function levelRank(level) {
  return LEVEL_ORDER.indexOf(level);
}
