import { toSlug } from '@/lib/utils/slug';
import { getTreksByState } from './treks';

// One entry per Indian state/region we run treks in. `trekCount` isn't
// stored here — it's counted from the actual trek list in treks.js below,
// so the two files can never drift out of sync with each other.
const stateFacts = [
  {
    name: 'Himachal Pradesh', region: 'Himalaya', season: 'April–June, September–November',
    permit: 'Not required for most treks', note: 'Passes, meadows and glacial lakes above the Kullu and Spiti valleys.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Landscape_of_Himachal_Pradesh_%2828606107915%29.jpg/960px-Landscape_of_Himachal_Pradesh_%2828606107915%29.jpg',
  },
  {
    name: 'Uttarakhand', region: 'Himalaya', season: 'March–June, September–December',
    permit: 'Forest entry permit issued at the trailhead', note: 'Flower valleys, glacial lakes and classic Garhwal Himalaya climbs.',
    image: 'https://media.istockphoto.com/id/484389570/photo/himalayas.jpg?s=612x612&w=0&k=20&c=6jM32XJBWlvv6x7AF-av52jlncPkz5hn_AEhjaDSFYI=',
  },
  {
    name: 'Sikkim', region: 'Himalaya', season: 'March–May, September–November',
    permit: 'Inner Line Permit required', note: 'Deep Kanchenjunga views without the crowds of the Everest region.',
    image: 'https://www.trekkinginsikkim.com/assets/images/tour/sikkim-trekking-05.webp',
  },
  {
    name: 'West Bengal', region: 'Himalaya', season: 'October–April',
    permit: 'Not required', note: 'Ridge-line trails through the Singalila range, with four-8000ers-in-one-frame sunrises.',
    image: 'https://backiee.com/static/wallpapers/560x315/325947.jpg',
  },
  {
    name: 'Karnataka', region: 'Western Ghats', season: 'August–February',
    permit: 'Forest permit at the checkpost', note: 'Rolling shola grasslands and misty peaks above Chikkamagaluru.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Kuduremukha-NationalPark_Grassland.jpg/960px-Kuduremukha-NationalPark_Grassland.jpg',
  },
  {
    name: 'Kerala', region: 'Western Ghats', season: 'October–March',
    permit: 'Forest permit required', note: 'Tea-country peaks and shola-grassland ridgelines above Munnar and Wayanad.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/c9/7b/10/ranipuram-hills.jpg?w=500&h=500&s=1',
  },
  {
    name: 'Tamil Nadu', region: 'Western Ghats', season: 'September–May',
    permit: 'Forest permit at the checkpost', note: 'Shola forest trails through the Nilgiris, home to resident elephant herds.',
    image: 'https://s3.india.com/wp-content/uploads/2024/11/Yelagiri-trekking.jpg',
  },
  {
    name: 'Maharashtra', region: 'Western Ghats', season: 'October–March',
    permit: 'Not required', note: 'Sahyadri hill forts and plateau peaks, an easy weekend reach from Mumbai and Pune.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Harihar_-_Sunlit_Valley_%2811253945843%29.jpg/960px-Harihar_-_Sunlit_Valley_%2811253945843%29.jpg',
  },
  {
    name: 'Manipur', region: 'North East', season: 'October–April',
    permit: 'Inner Line Permit for non-locals', note: 'Rolling bamboo-forest valleys, best known for the Dzukou lily bloom.',
    image: 'https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_400,q_auto,w_700/v1703751666/bbj/jpjbwzd78modbhnjhx7g.webp',
  },
  {
    name: 'Meghalaya', region: 'North East', season: 'October–May',
    permit: 'Not required', note: 'Living root bridges and waterfall canyons through the wettest hills in India.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Living_root_bridges%2C_Nongriat_village%2C_Meghalaya.jpg/960px-Living_root_bridges%2C_Nongriat_village%2C_Meghalaya.jpg',
  },
  {
    name: 'Mizoram', region: 'North East', season: 'November–March',
    permit: 'Inner Line Permit required', note: "Mizoram's highest peak and its quietest trails, with village homestays along the way.",
    image: 'https://www.india.com/wp-content/uploads/2024/07/Phawngpui-Peak-Trek.jpg',
  },
  {
    name: 'Nagaland', region: 'North East', season: 'October–April',
    permit: 'Inner Line Permit required', note: 'Border-ridge climbs to Nagaland\'s highest point, close to Myanmar.',
    image: 'https://altitudeadventureholidays.com/wp-content/uploads/2024/04/IMG_20191210_1600370001-scaled-1.webp',
  },
  {
    name: 'Tripura', region: 'North East', season: 'October–February',
    permit: 'Not required', note: 'Gentle orange-orchard ridge walks — the easiest overnight treks on the site.',
    image: 'https://content3.jdmagicbox.com/comp/west_tripura/m9/9999px381.x381.230909033356.p4m9/catalogue/montang-valley-west-tripura-tourist-attraction-fC1BHCDMbp.jpg',
  },
  {
    name: 'Odisha', region: 'East India', season: 'November–February',
    permit: 'Not required', note: "Odisha's Eastern Ghats peaks, gentle enough for a first multi-day trek.",
    image: 'https://blogs.revv.co.in/blogs/wp-content/uploads/2021/12/Daringbadi-1024x603.png',
  },
];

export const states = stateFacts.map((fact) => ({
  ...fact,
  slug: toSlug(fact.name),
  trekCount: getTreksByState(fact.name).length,
}));

export function getStateBySlug(slug) {
  return states.find((state) => state.slug === slug) || null;
}

export const REGIONS = ['All', 'Himalaya', 'North East', 'Western Ghats', 'East India'];
