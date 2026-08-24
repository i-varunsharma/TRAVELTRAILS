import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative h-screen bg-cover bg-center bg-[url('/bgimg.jpg')] overflow-hidden">
        {/* Dark overlay for better contrast, stronger toward the bottom where the copy sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        <div className="absolute inset-x-0 bottom-16 sm:bottom-20 px-6 sm:px-10">
          <div className="max-w-2xl ml-auto text-right animate-fade-in">
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-sm">
              It's not the mountain we conquer,
              <br />
              but ourselves.
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-200 font-medium tracking-wide">
              Trek the unbeaten paths. Find your limits. Reconnect with nature.
            </p>

            <Link
              href="/places"
              className="mt-8 inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:gap-3"
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
