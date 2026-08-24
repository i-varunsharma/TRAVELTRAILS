import Navbar from '@/components/Navbar';
import { Compass, Sparkles } from 'lucide-react';

const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '200+', label: 'Trekking Destinations' },
  { value: '10K+', label: 'Happy Trekkers' },
  { value: '99%', label: 'Customer Satisfaction' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '100%', label: 'Safety Record' },
];

const About = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-6">
          Discover the Spirit of Adventure with TrekTrails
        </h1>

        <p className="text-lg text-gray-600 text-center mb-16 leading-relaxed">
          At <span className="font-semibold text-gray-900">TrekTrails</span>, we believe every mountain has a story and every trekker deserves to be part of it. With over a decade of experience guiding thrill-seekers across India's breathtaking trails, we're here to turn your hiking dreams into unforgettable journeys.
        </p>

        <div className="grid sm:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
              <Compass className="w-5 h-5 text-green-700" /> Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To promote responsible trekking, empower local communities, and make adventure tourism safe, accessible, and life-changing for everyone — from beginners to seasoned hikers.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
              <Sparkles className="w-5 h-5 text-green-700" /> Why Choose Us?
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

        <div className="border-t border-gray-200 pt-12 mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Join TrekTrails and become a part of India's fastest-growing trekking community. Whether you're aiming for the snowy Himalayas or the tropical Western Ghats, we're here to guide you, protect you, and help you explore with confidence.
          </p>
          <p className="mt-4 font-semibold text-gray-900">
            Adventure Awaits. Let's Trek Together.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
