'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
    <div className="relative min-h-screen p-6">
      <div className="absolute inset-0 bg-[url('/bgimg.jpg')] bg-cover bg-center blur-sm z-0" />

      <div className="relative z-10">
        <Navbar />
        <div className="mt-20 space-y-14">
          {stateData.trekData.map((trek, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/20 hover:scale-[1.01] transition duration-300"
            >
              <TrekImage
                src={trek.image_url}
                alt={trek.name}
                className="w-full md:w-[42%] h-64 md:h-[340px] object-cover object-center rounded-3xl md:rounded-r-none shadow-lg"
              />
              <div className="p-6 md:w-[58%] text-left space-y-3 text-gray-100">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text">
                  {trek.name}
                </h2>
                <p><span className="font-semibold text-indigo-300">Height:</span> {trek.height}</p>
                <p><span className="font-semibold text-green-300">Duration:</span> {trek.duration}</p>
                <p><span className="font-semibold text-yellow-300">Cost per person:</span> {trek.cost}+ 5% GST</p>
                <p><span className="font-semibold text-pink-300">Distance:</span> {trek.distance}</p>
                <p><span className="font-semibold text-purple-300">Best Time:</span> {trek.best_time}</p>
                <button
                  onClick={() => setBookingTrek(trek)}
                  className="mt-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-blue-700 px-6 py-2 text-white font-bold rounded-full shadow-md hover:shadow-2xl transition duration-300 cursor-pointer hover:scale-[1.01]"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
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
