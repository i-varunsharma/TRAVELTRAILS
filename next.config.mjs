/** @type {import('next').NextConfig} */
const nextConfig = {
  // The dev-mode indicator badge (the floating circle with the Next.js
  // logo) sits fixed in a corner and can end up overlapping real page
  // content, especially on narrow/mobile viewports. It never shows up in
  // a production build either way, so there's no reason to keep it on
  // during local development.
  devIndicators: false,
  serverExternalPackages: ['mongoose'],
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET
  }
};

export default nextConfig;
