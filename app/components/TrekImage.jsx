'use client';
import React, { useState } from 'react';

// Some trek photos are hotlinked from third-party sites and occasionally go
// dead (404s, expired links). Instead of showing a broken-image icon, this
// swaps in a plain gradient placeholder when that happens.
function TrekImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`${className} bg-gradient-to-br from-green-800 to-zinc-800 flex items-center justify-center text-white/70 text-sm text-center p-2`}>
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export default TrekImage;
