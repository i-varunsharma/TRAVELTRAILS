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
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10">
          Trekking States of India
        </h1>
        {error && <p className="text-red-600 text-center font-medium">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {states.map((state) => (
            <Link href={`/places/${toSlug(state.name)}`} key={state.name} className="group">
              <div className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <TrekImage
                  src={state.imgUrl}
                  alt={state.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-gray-900">{state.name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {state.treks.length} trek spots
                  </p>
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
