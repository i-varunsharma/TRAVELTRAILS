import React from 'react'
import Link from 'next/link';
import { Images, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Placeholder page: the photo gallery itself hasn't been built yet, this
// gives it an intentional "coming soon" state instead of a blank screen.
const Gallery = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-73px)] bg-pine bg-contours flex flex-col items-center justify-center text-center px-6">
        <div className="bg-rust/15 rounded-full p-5 mb-6">
          <Images className="w-8 h-8 text-rust" />
        </div>
        <h1 className="font-display uppercase text-4xl sm:text-5xl text-cream mb-2">
          The Gallery Is Coming Soon
        </h1>
        <p className="text-cream/70 max-w-md mb-8">
          We're putting together photos from treks across India. In the meantime, browse the trails themselves.
        </p>
        <Link
          href="/places"
          className="inline-flex items-center gap-2 bg-rust hover:bg-rust-dark text-cream font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Explore Treks
          <ArrowRight size={16} />
        </Link>
      </div>
    </>
  )
}

export default Gallery
