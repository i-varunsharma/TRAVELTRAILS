import { treks } from './treks';

// One entry per calendar month, with a short honest note about what
// conditions actually look like across India in that month.
export const months = [
  { short: 'Jan', label: 'January', note: 'Deep winter in the high Himalaya — passes are snowed in, but South India and the North East stay clear and cool.' },
  { short: 'Feb', label: 'February', note: 'Himalayan snowline still holds high up; the South India winter window is closing.' },
  { short: 'Mar', label: 'March', note: 'Snow starts retreating in the mid-hills — early spring trekking opens across the Himalaya.' },
  { short: 'Apr', label: 'April', note: 'Spring in full swing up north; the Western Ghats are turning hot and dry.' },
  { short: 'May', label: 'May', note: 'Last clear window in the high Himalaya before the monsoon closes most passes.' },
  { short: 'Jun', label: 'June', note: 'Monsoon begins in the Western Ghats and North East — waterfalls and grasslands come alive.' },
  { short: 'Jul', label: 'July', note: 'Peak monsoon — flower valleys bloom in the Himalaya, but Western Ghats trails get very wet.' },
  { short: 'Aug', label: 'August', note: 'Monsoon continues most places; rain-shadow Himalayan routes stay noticeably drier.' },
  { short: 'Sep', label: 'September', note: 'Monsoon clears from the mountains — arguably the best trekking window of the year begins.' },
  { short: 'Oct', label: 'October', note: 'Post-monsoon clarity almost everywhere — the busiest, most popular month on the calendar.' },
  { short: 'Nov', label: 'November', note: 'Cool, dry, and clear across most of the country, as early snow starts closing the highest passes.' },
  { short: 'Dec', label: 'December', note: 'Winter snow treks begin in the low Himalaya, while South India stays mild and pleasant.' },
];

// Which month index(es) a trek's "June to September" style season string
// actually covers. Kept deliberately simple: split on commas for multiple
// windows, split each window on " to " for the start/end month, and walk
// forward from start to end (wrapping around December -> January).
const MONTH_NAMES = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

function monthIndexFromName(name) {
  return MONTH_NAMES.indexOf(name.trim().toLowerCase());
}

export function getActiveMonthIndexes(seasonText) {
  const active = new Set();

  seasonText.split(',').forEach((window) => {
    const [startName, endName] = window.split(' to ').map((part) => part.trim());
    const start = monthIndexFromName(startName);
    const end = monthIndexFromName(endName);
    if (start === -1 || end === -1) return;

    let i = start;
    while (true) {
      active.add(i);
      if (i === end) break;
      i = (i + 1) % 12;
    }
  });

  return active;
}

// Treks whose season window includes the given month (0 = January).
export function getTreksForMonth(monthIndex) {
  return treks.filter((trek) => getActiveMonthIndexes(trek.season).has(monthIndex));
}
