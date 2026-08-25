'use client';
import React, { useEffect, useState } from 'react';
import { Mountain } from 'lucide-react';

const LOAD_TIMEOUT_MS = 6000;

// Some trek photos are hotlinked from third-party sites and occasionally go
// dead — a clean 404, or worse, a request that just hangs and never fires
// `onError` at all (some hosts do this for blocked/rate-limited requests).
// Either way, this swaps in an on-brand placeholder — matching the
// ink/contours/rust treatment used elsewhere (e.g. the login page's
// mountain mark) — instead of leaving a broken-image icon on screen.
function TrekImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  // If the image hasn't loaded (or errored) within a few seconds, treat it
  // as failed too, so a stalled request can never get stuck forever.
  useEffect(() => {
    setFailed(false);
    const timer = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [src]);

  if (failed) {
    return (
      <div className={`${className} bg-ink bg-contours flex flex-col items-center justify-center gap-2 text-center p-3`}>
        <Mountain className="w-6 h-6 text-rust" strokeWidth={1.75} />
        <span className="font-display uppercase text-cream/90 text-lg leading-tight">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={() => setFailed(false)}
      onError={() => setFailed(true)}
    />
  );
}

export default TrekImage;
