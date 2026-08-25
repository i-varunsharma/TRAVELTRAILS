'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Mountain, Clock, Route, CalendarDays } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrekImage from '@/components/TrekImage';
import TrekBookingForm from '@/components/TrekBookingForm';
import { fromSlug } from '@/lib/utils/slug';

const ease = [0.16, 1, 0.3, 1];

const StatePage = () => {
  const { state: stateSlug } = useParams();
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingTrek, setBookingTrek] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('/trekkingdata.json');
        const data = await res.json();
        const stateName = fromSlug(stateSlug);
        const match = data.find((state) => state.name.toLowerCase() === stateName);
        if (match) {
          setStateData(match);
        } else {
          setError('State not found');
        }
      } catch (err) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };
    if (stateSlug) getData();
  }, [stateSlug]);

  if (loading) return <div className="text-center py-10 text-stone-500">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600 font-semibold">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="bg-ink bg-contours px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/places"
            className="inline-flex items-center gap-1.5 text-sm text-cream/70 hover:text-cream transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back to states
          </Link>

          <h1 className="font-display uppercase text-cream text-5xl sm:text-6xl">{stateData.name}</h1>
          <p className="text-cream/70 mt-1">{stateData.trekData.length} treks to choose from</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {stateData.trekData.map((trek, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.05, ease }}
              key={idx}
              className="group flex flex-col rounded-xl overflow-hidden border border-ink/10 bg-white shadow-sm hover:shadow-lg hover:border-rust transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <TrekImage
                  src={trek.image_url}
                  alt={trek.name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
              </div>
              <div className="p-5 flex flex-col gap-3 grow">
                <h2 className="font-display uppercase text-xl text-ink">
                  {trek.name}
                </h2>

                <div className="grid grid-cols-2 gap-y-1.5 text-sm text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <Mountain size={14} className="text-rust shrink-0" /> {trek.height}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-rust shrink-0" /> {trek.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Route size={14} className="text-rust shrink-0" /> {trek.distance}
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <CalendarDays size={14} className="text-rust shrink-0" /> {trek.best_time}
                  </div>
                </div>

                <div className="font-display text-2xl text-ink mt-1">
                  {trek.cost} <span className="text-xs font-sans font-normal text-stone-400">+ 5% GST</span>
                </div>

                <button
                  onClick={() => setBookingTrek(trek)}
                  className="mt-auto bg-rust hover:bg-rust-dark px-5 py-2.5 text-cream font-semibold rounded-full transition-colors cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {bookingTrek && (
          <TrekBookingForm
            trek={{ name: bookingTrek.name, state: stateData.name }}
            onClose={() => setBookingTrek(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default StatePage;
