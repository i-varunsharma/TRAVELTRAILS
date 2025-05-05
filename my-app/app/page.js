export default function Home() {
  return (
    <>
      <div className="relative h-[calc(100vh-4.5rem)] bg-cover bg-center bg-[url('/bgimg.jpg')] overflow-hidden">
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-12 right-8 max-w-2xl text-right animate-fade-in bg-grey-100/100">

          {/* Main Heading */}
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight ">
            It's not the mountain we conquer,
            <br />
            but ourselves.
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-lg sm:text-xl text-gray-300 font-medium tracking-wider ">
            Trek the unbeaten paths. Find your limits. Reconnect with nature.
          </p>
        </div>
      </div>

      {/* Tailwind animation (include this in your global CSS or index.css) */}
      <style>
        {`
          @tailwind base;
          @tailwind components;
          @tailwind utilities;

          @layer utilities {
            .animate-fade-in {
              animation: fadeIn 1.2s ease-out forwards;
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          }
        `}
      </style>
    </>
  );
}
