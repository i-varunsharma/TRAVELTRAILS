import React from 'react'
import Navbar from '../about/components/AddressBar';

const Gallery = () => {
  return (
  <div className="relative min-h-screen">
      {/* Background image - moved to separate element */}
      <div className="fixed inset-0 bg-[url('/bgimg.jpg')] bg-cover bg-center"></div>
      
      {/* Your existing overlay with reduced opacity */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      {/* Content container - added relative positioning */}
      <div className="relative pt-20">
        <Navbar/>
      </div>
    </div>
  )
}

export default Gallery