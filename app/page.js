'use client';
import { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";
import FilterChips from "@/components/FilterChips";
import TrekCard from "@/components/TrekCard";
import TrekBookingForm from "@/components/TrekBookingForm";
import { months, getTreksForMonth } from "@/data/months";
import { getTrekBySlug } from "@/data/treks";

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "200+", label: "Trekking Destinations" },
  { value: "10K+", label: "Happy Trekkers" },
  { value: "4.9", label: "Average Rating", icon: Star },
];

// A fixed default rather than `new Date().getMonth()` — September is the
// best all-round trekking window, and picking a fixed value keeps the
// server-rendered HTML and the client's first render identical (using the
// real current date here could differ by a day across a month boundary and
// trip a React hydration mismatch).
const DEFAULT_MONTH = 8; // September

const FEATURED_SLUGS = ['valley-of-flowers-trek', 'dzongri-trek', 'kudremukh-trek'];

const ease = [0.16, 1, 0.3, 1];

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState(DEFAULT_MONTH);
  const [bookingTrek, setBookingTrek] = useState(null);

  const monthOptions = months.map((month, index) => ({ label: month.short, value: index }));
  const activeMonth = months[selectedMonth];
  const treksInMonth = getTreksForMonth(selectedMonth);
  const featuredTreks = FEATURED_SLUGS.map(getTrekBySlug).filter(Boolean);

  return (
    <>
      <Navbar />
      <div className="relative h-[85vh] bg-cream overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-[url('/bgimg.jpg')]"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5, ease }}
        />

        {/* Scrim covers the whole frame — strongest at the bottom-right,
            where the headline now sits, but never fades to fully
            transparent, so the paragraph and button stay legible against
            the hiker in the photo. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-end items-end pb-16 sm:pb-20">
          <div className="max-w-md text-right">
            <motion.h1
              className="font-display uppercase text-cream text-3xl sm:text-4xl md:text-5xl leading-[0.95]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              It's not the mountain<br className="md:hidden" />{' '}
              we conquer, but ourselves.
            </motion.h1>

            <motion.p
              className="mt-4 text-base text-cream/90 text-balance"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
            >
              Trek the unbeaten paths. Find your limits. Reconnect with nature.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap items-center justify-end gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease }}
            >
              <Link
                href="/places"
                className="inline-flex items-center gap-2 bg-rust text-cream font-semibold px-6 py-3 rounded-full hover:bg-rust-dark transition-colors"
              >
                Explore Treks
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-cream/40 text-cream font-semibold px-6 py-3 rounded-full hover:bg-cream/10 transition-colors"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-cream-dark px-6 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="flex items-center gap-2 font-display text-5xl text-rust">
                <AnimatedCounter value={stat.value} />
                {stat.icon && <stat.icon className="w-7 h-7 fill-rust mb-1" />}
              </p>
              <p className="text-sm font-semibold uppercase tracking-wide text-ink mt-1">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="bg-ink bg-contours px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl mb-2">Plan Around the Season</h2>
          <p className="text-cream/70 mb-6 max-w-xl">
            Pick a month to see which treks are actually in season, and what conditions really look like.
          </p>

          <FilterChips options={monthOptions} value={selectedMonth} onChange={setSelectedMonth} />

          <div className="mt-6 bg-ink-light rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div>
              <p className="font-display text-4xl text-rust">{treksInMonth.length}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-cream/60 mt-1">
                {treksInMonth.length === 1 ? 'trek in season' : 'treks in season'} in {activeMonth.label}
              </p>
            </div>
            <p className="text-cream/85 text-sm leading-relaxed sm:border-l sm:border-cream/15 sm:pl-8">
              {activeMonth.note}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-cream px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display uppercase text-ink text-3xl sm:text-4xl mb-8">Featured Treks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTreks.map((trek, i) => (
              <Reveal key={trek.slug} delay={i * 0.08}>
                <TrekCard trek={trek} onBook={setBookingTrek} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {bookingTrek && <TrekBookingForm trek={bookingTrek} onClose={() => setBookingTrek(null)} />}
      </AnimatePresence>

      <Footer />
    </>
  );
}
