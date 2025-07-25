'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/app/about/components/AddressBar';

const StatePage = () => {
  const { state: stateName } = useParams();
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    people: '',
    pickup: '',
    name: '',
    address: '',
    whatsapp: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('/trekkingdata.json');
        const data = await res.json();
        const formattedName = stateName.replace(/-/g, ' ').toLowerCase();
        const match = data.find(state => state.name.toLowerCase() === formattedName);
        if (match) {
          setStateData(match);
        } else {
          setError('State not found');
        }
      } catch (err) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };
    if (stateName) getData();
  }, [stateName]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2); // +2 days
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.people) <= 0) {
      alert('Number of people must be greater than 0');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setShowPopup(false);
      setSubmitted(false);
      setFormData({
        date: '',
        people: '',
        pickup: '',
        name: '',
        address: '',
        whatsapp: '',
      });
    }, 3000);
  };

  if (loading) return <div className="text-center py-10 text-lg text-blue-600 animate-pulse">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="relative min-h-screen p-6">
      <div className="absolute inset-0 bg-[url('/bgimg.jpg')] bg-cover bg-center blur-sm z-0" />

      <div className="relative z-10">
        <Navbar />
        <div className="mt-20 space-y-14">
          {stateData.trekData.map((trek, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/20 hover:scale-[1.01] transition duration-300"
            >
              <img
                src={trek.image_url}
                alt={trek.name}
                className="w-full md:w-[42%] h-64 md:h-[340px] object-cover object-center rounded-3xl md:rounded-r-none shadow-lg"
              />
              <div className="p-6 md:w-[58%] text-left space-y-3 text-gray-100">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text">
                  {trek.name}
                </h2>
                <p><span className="font-semibold text-indigo-300">Height:</span> {trek.height}</p>
                <p><span className="font-semibold text-green-300">Duration:</span> {trek.duration}</p>
                <p><span className="font-semibold text-yellow-300">Cost per person:</span> {trek.cost}+ 5% GST</p>
                <p><span className="font-semibold text-pink-300">Distance:</span> {trek.distance}</p>
                <p><span className="font-semibold text-purple-300">Best Time:</span> {trek.best_time}</p>
                <button
                  onClick={() => setShowPopup(true)}
                  className="mt-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-blue-700 px-6 py-2 text-white font-bold rounded-full shadow-md hover:shadow-2xl transition duration-300 cursor-pointer hover:scale-[1.01]"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
          <div className="bg-white/50 text-black p-6 rounded-2xl w-[90%] max-w-md shadow-xl animate-fade-in">
            {submitted ? (
              <div className="text-center text-lg font-semibold text-green-600">
                Thanks for showing interest! Details and prodecure will be shared on your WhatsApp soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 ">
                <h2 className="text-xl font-bold mb-2 text-center text-black-100">Trek Booking Details</h2>

                <input
                  type="date"
                  name="date"
                  min={getMinDate()}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="people"
                  placeholder="Number of People"
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {/* <input
                  type="text"
                  name="pickup"
                  placeholder="Pickup Place"
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                /> */}
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {/* <input
                  type="text"
                  name="address"
                  placeholder="Your Address"
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                /> */}
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-end gap-4 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="text-sm font-semibold px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatePage;
