'use client';
import React, { useState } from 'react';
import Navbar from '../about/components/AddressBar';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopupVisible(true);

    // Clear form fields
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Hide popup after 3 seconds
    setTimeout(() => setPopupVisible(false), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-[url('/bgimg.jpg')] bg-cover bg-center pt-30">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">
            <h1 className="text-5xl font-extrabold text-white text-center mb-6 tracking-wide">Contact TrekTrails</h1>
            <p className="text-center text-gray-200 mb-10 text-lg">
              Planning your next adventure? Reach out and let's help you make it unforgettable!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact Info Section */}
              <div className="text-white space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="text-green-400" />
                  <span className="text-lg">+91 9729605399</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-green-400" />
                  <span className="text-lg">contact@trektrails.in</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-green-400" />
                  <span className="text-lg">New Delhi, India</span>
                </div>
              </div>

              {/* Form Section */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-1 font-semibold text-white">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/70 px-4 py-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-white">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/70 px-4 py-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-white">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/70 px-4 py-4 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
                    rows="5"
                    placeholder="Tell us about your trekking needs..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition duration-300 shadow-md hover:shadow-xl w-full"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Success Popup */}
            {popupVisible && (
              <div className="center bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
                Message sent successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
