'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import TrekImage from '@/components/TrekImage';
import { toSlug } from '@/lib/utils/slug';

const Places = () => {
  const [states, setStates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch('/trekkingdata.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setStates(result);
      } catch (err) {
        console.error('Failed to fetch trekking data:', err);
        setError('Failed to load trekking data.');
      }
    };
    dataFetch();
  }, []);
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-[url('/bgimg.jpg')] bg-cover bg-center"></div>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative p-6 pt-30">
        <Navbar />
        <h1 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-md">
          Trekking States of India
        </h1>
        {error && <p className="text-red-400 text-center font-medium">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {states.map((state) => (
            <Link href={`/places/${toSlug(state.name)}`} key={state.name}>
              <div
                className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out group"
              >
                <TrekImage
                  src={state.imgUrl}
                  alt={state.name}
                  className="w-full h-64 object-cover group-hover:brightness-90 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end items-center">
                  <h2 className="text-white text-2xl font-bold text-center drop-shadow-sm">
                    {state.name}
                  </h2>
                  <p className="text-sm text-gray-200 mt-1">
                    Trek Spots: {state.treks.length}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Places;