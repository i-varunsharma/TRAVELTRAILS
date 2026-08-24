import React from 'react'
import Link from 'next/link';
import { Images, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Placeholder page: the photo gallery itself hasn't been built yet, this
// gives it an intentional "coming soon" state instead of a blank screen.
const Gallery = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-[url('/bgimg.jpg')] bg-cover bg-center"></div>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative">
        <Navbar />

        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="bg-white/10 border border-white/20 rounded-full p-5 mb-6">
            <Images className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            The Gallery Is Coming Soon
          </h1>
          <p className="text-gray-300 max-w-md mb-8">
            We're putting together photos from treks across India. In the meantime, browse the trails themselves.
          </p>
          <Link
            href="/places"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:gap-3"
          >
            Explore Treks
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Gallery
