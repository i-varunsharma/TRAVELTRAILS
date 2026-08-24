'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mountain, Clock, Tag, Route, CalendarDays } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TrekImage from '@/components/TrekImage';
import TrekBookingForm from '@/components/TrekBookingForm';
import { fromSlug } from '@/lib/utils/slug';

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

  if (loading) return <div className="text-center py-10 text-lg text-blue-600 animate-pulse">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-[url('/bgimg.jpg')] bg-cover bg-center blur-sm" />
      <div className="fixed inset-0 bg-black/55" />

      <div className="relative">
        <Navbar />

        <div className="pt-28 pb-16 px-6 max-w-7xl mx-auto">
          <Link
            href="/places"
            className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back to states
          </Link>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stateData.name}</h1>
          <p className="text-gray-300 mb-10">{stateData.trekData.length} treks to choose from</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {stateData.trekData.map((trek, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/15 hover:border-white/30 hover:-translate-y-1 transition-all duration-300"
              >
                <TrekImage
                  src={trek.image_url}
                  alt={trek.name}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-5 flex flex-col gap-3 text-gray-100 grow">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {trek.name}
                  </h2>

                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <Mountain size={14} className="text-green-400 shrink-0" /> {trek.height}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <Clock size={14} className="text-green-400 shrink-0" /> {trek.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <Route size={14} className="text-green-400 shrink-0" /> {trek.distance}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-300 col-span-2">
                      <CalendarDays size={14} className="text-green-400 shrink-0" /> {trek.best_time}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-lg font-bold text-yellow-400 mt-1">
                    <Tag size={16} /> {trek.cost} <span className="text-xs font-normal text-gray-400">+ 5% GST</span>
                  </div>

                  <button
                    onClick={() => setBookingTrek(trek)}
                    className="mt-auto bg-green-600 hover:bg-green-500 px-5 py-2.5 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {bookingTrek && (
        <TrekBookingForm
          trekName={bookingTrek.name}
          stateName={stateData.name}
          onClose={() => setBookingTrek(null)}
        />
      )}
    </div>
  );
};

export default StatePage;
