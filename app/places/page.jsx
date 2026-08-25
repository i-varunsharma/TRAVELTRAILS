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
    <>
      <Navbar />
      <div className="bg-pine bg-contours px-6 py-14 text-center">
        <h1 className="font-display uppercase text-cream text-5xl sm:text-6xl">
          Trekking States of India
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {error && <p className="text-red-600 text-center font-medium">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {states.map((state) => (
            <Link href={`/places/${toSlug(state.name)}`} key={state.name} className="group">
              <div className="rounded-xl overflow-hidden border-2 border-pine/10 hover:border-rust transition-colors bg-white">
                <div className="relative">
                  <TrekImage
                    src={state.imgUrl}
                    alt={state.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-rust text-cream text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    {state.treks.length} {state.treks.length === 1 ? 'trek' : 'treks'}
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="font-display uppercase text-xl text-pine">{state.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Places;
