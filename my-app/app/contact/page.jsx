
import React from 'react';
import Navbar from '../about/components/AddressBar';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">Get in Touch</h1>
          <p className="text-center text-gray-600 mb-8">
            We’d love to hear from you! Fill out the form and we’ll get back to you as soon as possible.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Message</label>
              <textarea
                className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="5"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
