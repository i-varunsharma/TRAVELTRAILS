import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative h-screen bg-cover bg-center bg-[url('/bgimg.jpg')] overflow-hidden">
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-12 right-8 max-w-2xl text-right animate-fade-in bg-grey-100/100">
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight ">
            It's not the mountain we conquer,
            <br />
            but ourselves.
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-gray-300 font-medium tracking-wider ">
            Trek the unbeaten paths. Find your limits. Reconnect with nature.
          </p>
        </div>
      </div>
    </>
  );
}
