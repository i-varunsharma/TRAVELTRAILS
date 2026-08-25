import Navbar from '@/components/Navbar';
import { Compass, Sparkles, Star } from 'lucide-react';

const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '200+', label: 'Trekking Destinations' },
  { value: '10K+', label: 'Happy Trekkers' },
  { value: '99%', label: 'Customer Satisfaction' },
  { value: '4.9', label: 'Average Rating', icon: Star },
  { value: '100%', label: 'Safety Record' },
];

const About = () => {
  return (
    <>
      <Navbar />

      <div className="bg-pine bg-contours px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display uppercase text-cream text-5xl sm:text-6xl mb-6 max-w-2xl leading-[0.95]">
            Discover the Spirit of Adventure
          </h1>
          <p className="text-lg text-cream/85 max-w-2xl leading-relaxed">
            At <span className="font-semibold text-cream">TrekTrails</span>, we believe every mountain has a story and every trekker deserves to be part of it. With over a decade of experience guiding thrill-seekers across India's breathtaking trails, we're here to turn your hiking dreams into unforgettable journeys.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="flex items-center gap-2 font-display uppercase text-2xl text-pine mb-3">
              <Compass className="w-5 h-5 text-rust" /> Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To promote responsible trekking, empower local communities, and make adventure tourism safe, accessible, and life-changing for everyone — from beginners to seasoned hikers.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-display uppercase text-2xl text-pine mb-3">
              <Sparkles className="w-5 h-5 text-rust" /> Why Choose Us?
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>Certified and experienced trek leaders</li>
              <li>Customizable trek packages for all fitness levels</li>
              <li>Eco-friendly and sustainable trekking practices</li>
              <li>24/7 support and safety-first approach</li>
              <li>1000+ 5-star reviews from happy trekkers</li>
            </ul>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-gray-600">
            Join TrekTrails and become a part of India's fastest-growing trekking community. Whether you're aiming for the snowy Himalayas or the tropical Western Ghats, we're here to guide you, protect you, and help you explore with confidence.
          </p>
          <p className="mt-4 font-semibold text-pine">
            Adventure Awaits. Let's Trek Together.
          </p>
        </div>
      </div>

      <div className="bg-cream-dark px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="flex items-center gap-2 font-display text-5xl text-rust">
                {stat.value}
                {stat.icon && <stat.icon className="w-7 h-7 fill-rust mb-1" />}
              </p>
              <p className="text-sm font-semibold uppercase tracking-wide text-pine mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
