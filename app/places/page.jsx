'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrekImage from '@/components/TrekImage';
import { toSlug } from '@/lib/utils/slug';

const ease = [0.16, 1, 0.3, 1];

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
      <div className="bg-ink bg-contours px-6 py-14 text-center">
        <h1 className="font-display uppercase text-cream text-5xl sm:text-6xl">
          Trekking States of India
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {error && <p className="text-red-600 text-center font-medium">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {states.map((state, i) => (
            <motion.div
              key={state.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06, ease }}
            >
              <Link href={`/places/${toSlug(state.name)}`} className="group block">
                <div className="rounded-xl overflow-hidden border border-ink/10 bg-white shadow-sm hover:shadow-lg hover:border-rust transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <TrekImage
                      src={state.imgUrl}
                      alt={state.name}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                    <span className="absolute top-3 right-3 bg-rust text-cream text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                      {state.treks.length} {state.treks.length === 1 ? 'trek' : 'treks'}
                    </span>
                  </div>
                  <div className="p-4">
                    <h2 className="font-display uppercase text-xl text-ink">{state.name}</h2>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Places;
