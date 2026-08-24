import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative h-[85vh] bg-cover bg-center bg-[url('/bgimg.jpg')] overflow-hidden">
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-xl">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
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
