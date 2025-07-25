'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../about/components/AddressBar';

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
    <div className="relative min-h-screen p-6 bg-gradient-to-br pt-30 bg-cover bg-center bg-[url('/bgimg.jpg')] background-blur-sm bg-white">
        <Navbar />
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-md">
        Trekking States of India
      </h1>
      {error && <p className="text-red-600 text-center font-medium">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {states.map((state, idx) => (
          <Link href={`/places/${state.name.toLowerCase().replace(/ /g, '-')}`} key={idx}>
            <div
              className="relative rounded-4xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out group "
            >
              <img
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
  );
};

export default Places;