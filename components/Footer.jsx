import Link from 'next/link';
import { Mail, Phone, MapPin, Mountain } from 'lucide-react';

const exploreLinks = [
  { name: 'About', path: '/about' },
  { name: 'Places', path: '/places' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

function Footer() {
  return (
    <footer className="bg-ink bg-contours">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2">
            <Mountain className="w-6 h-6 text-rust" strokeWidth={1.75} />
            <span className="font-display text-2xl text-cream">TrekTrails</span>
          </div>
          <p className="mt-4 text-sm text-cream/65 leading-relaxed max-w-xs">
            Trek the unbeaten paths. Find your limits. Reconnect with nature — across India's breathtaking trails.
          </p>
        </div>

        <div>
          <h3 className="font-display uppercase tracking-wide text-sm text-cream/50 mb-4">Explore</h3>
          <ul className="space-y-2.5">
            {exploreLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className="text-sm text-cream/80 hover:text-cream transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display uppercase tracking-wide text-sm text-cream/50 mb-4">Get in Touch</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-rust shrink-0" /> +91 9729605399
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-rust shrink-0" /> contact@trektrails.in
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={15} className="text-rust shrink-0" /> New Delhi, India
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/40">
          <span>&copy; {new Date().getFullYear()} TrekTrails. All rights reserved.</span>
          <span>Made for those who'd rather be outside.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
