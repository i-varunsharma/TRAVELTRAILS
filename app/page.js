import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative h-[85vh] bg-cover bg-center bg-[url('/bgimg.jpg')] overflow-hidden">
        {/* Scrim covers the whole frame — strongest at top where the
            headline sits, but never fades to fully transparent, so the
            paragraph and button stay legible wherever the copy block ends
            up relative to the hiker in the photo. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/25" />

        <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-start pt-20 sm:pt-24">
          <div className="max-w-xl">
            <h1 className="font-display uppercase text-cream text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
              It's not the mountain we conquer, but ourselves.
            </h1>

            <p className="mt-5 text-lg text-cream/90">
              Trek the unbeaten paths. Find your limits. Reconnect with nature.
            </p>

            <Link
              href="/places"
              className="mt-7 inline-flex items-center gap-2 bg-rust text-cream font-semibold px-7 py-3.5 rounded-full hover:bg-rust-dark transition-colors"
            >
              Explore Treks
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
