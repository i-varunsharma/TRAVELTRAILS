import React from 'react'
import Navbar from '@/app/components/Navbar';

// Placeholder page: the photo gallery itself hasn't been built yet, this
// just sets up the background and navbar so the route doesn't 404.
const Gallery = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-[url('/bgimg.jpg')] bg-cover bg-center"></div>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative pt-20">
        <Navbar />
      </div>
    </div>
  )
}

export default Gallery