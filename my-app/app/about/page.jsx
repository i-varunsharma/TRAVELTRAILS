import Navbar from './components/AddressBar';

const About = () => {
  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-[url('/bgimg.jpg')] bg-cover bg-center pt-20">
        {/* Dark blur overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-5xl mx-auto py-20 px-6 text-white">
          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-center mb-8">Discover the Spirit of Adventure with TrekTrails</h1>

          {/* Intro */}
          <p className="text-lg text-center mb-10">
            At <span className="font-semibold text-yellow-400">TrekTrails</span>, we believe every mountain has a story and every trekker deserves to be part of it. With over a decade of experience guiding thrill-seekers across India’s breathtaking trails, we're here to turn your hiking dreams into unforgettable journeys.
          </p>

          {/* Mission + Why Choose Us */}
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">🌄 Our Mission</h2>
              <p className="text-md leading-relaxed">
                To promote responsible trekking, empower local communities, and make adventure tourism safe, accessible, and life-changing for everyone — from beginners to seasoned hikers.
              </p>
            </div>

            <div className='pl-23'>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">🌟 Why Choose Us?</h2>
              <ul className="list-disc list-inside space-y-2 text-md">
                <li>Certified and experienced trek leaders</li>
                <li>Customizable trek packages for all fitness levels</li>
                <li>Eco-friendly and sustainable trekking practices</li>
                <li>24/7 support and safety-first approach</li>
                <li>1000+ 5-star reviews from happy trekkers</li>
              </ul>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-yellow-100/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl mb-12">
            <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6">🏆 Our Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center text-lg font-medium">
              <div>
                <p className="text-4xl font-bold text-white">15+</p>
                <p>Years of Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">200+</p>
                <p>Trekking Destinations</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">10K+</p>
                <p>Happy Trekkers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">99%</p>
                <p>Customer Satisfaction</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">4.9★</p>
                <p>Average Rating</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">100%</p>
                <p>Safety Record</p>
              </div>
            </div>
          </div>

          {/* CEO Details */}
          <div className="bg-yellow-100/20 rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">🌟 Meet Our CEO: Varun Sharma</h2>

            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden mb-6 md:mb-0 shadow-xl">
                {/* CEO Image */}
                <img src="ceo.jpg" alt="Varun Sharma, CEO" className="w-full h-full object-cover" />
              </div>

              <div className="ml-0 md:ml-8 text-center md:text-left">
                <p className="text-lg mb-4">
                  <span className="font-semibold text-yellow-300">Varun Sharma</span>, aged 19, is the visionary founder and CEO of <span className="font-semibold text-yellow-300">TrekTrails</span>. Currently pursuing a BTech degree at Newton School of Technology, Varun is passionate about making trekking more accessible and enjoyable for everyone.
                </p>
                <p className="mb-4">
                  Under Varun's leadership, TrekTrails has quickly grown into one of India's leading trekking companies, earning the trust of thousands of trekkers. His forward-thinking approach, combined with a dedication to safety and sustainability, has helped shape TrekTrails into the company it is today.
                </p>
                <p>
                  Join us at TrekTrails, where Varun’s passion for adventure and commitment to excellence drive every journey.
                </p>
              </div>
            </div>
          </div>

          {/* Trust message */}
          <div className="text-center text-lg mt-12">
            <p>
              Join <span className="text-yellow-300 font-semibold">TrekTrails</span> and become a part of India’s fastest-growing trekking community. Whether you're aiming for the snowy Himalayas or the tropical Western Ghats, we’re here to guide you, protect you, and help you explore with confidence.
            </p>
            <p className="mt-6 font-bold text-xl text-yellow-400">Adventure Awaits. Let's Trek Together! 🥾</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
