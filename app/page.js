import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative h-[85vh] bg-cover bg-center bg-[url('/bgimg.jpg')] overflow-hidden">
        {/* Scrim only over the top third, where the copy sits — keeps the
            rest of the photo (and the hiker) clear and unobstructed. */}
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black/55 via-black/15 to-transparent" />

        <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-start pt-20 sm:pt-28">
          <div className="max-w-xl">
            <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
              It's not the mountain we conquer, but ourselves.
            </h1>

            <p className="mt-5 text-lg text-gray-100">
              Trek the unbeaten paths. Find your limits. Reconnect with nature.
            </p>

            <Link
              href="/places"
              className="mt-8 inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
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
