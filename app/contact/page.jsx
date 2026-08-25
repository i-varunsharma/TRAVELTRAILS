'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setFormData({ name: '', email: '', message: '' });
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
        <h1 className="font-display uppercase text-4xl sm:text-5xl text-pine mb-3">Contact TrekTrails</h1>
        <p className="text-gray-600 mb-12">
          Planning your next adventure? Reach out and let's help you make it unforgettable.
        </p>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center bg-pine bg-contours rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3 text-cream">
              <Phone className="text-rust shrink-0" size={20} />
              <span>+91 9729605399</span>
            </div>
            <div className="flex items-center gap-3 text-cream">
              <Mail className="text-rust shrink-0" size={20} />
              <span>contact@trektrails.in</span>
            </div>
            <div className="flex items-center gap-3 text-cream">
              <MapPin className="text-rust shrink-0" size={20} />
              <span>New Delhi, India</span>
            </div>
            <div className="border-t border-cream/20 pt-6 text-sm text-cream/70">
              We typically reply within 24 hours, Monday to Saturday.
            </div>

            {popupVisible && (
              <div className="flex items-center gap-2 bg-cream/10 border border-cream/30 rounded-lg p-3 text-cream text-sm">
                <CheckCircle2 size={16} className="text-rust" /> Message sent successfully!
              </div>
            )}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            <div>
              <label className="block mb-1.5 text-sm font-semibold uppercase tracking-wide text-pine">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-pine/15 px-4 py-2.5 rounded-lg focus:outline-none focus:border-rust transition-colors"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-semibold uppercase tracking-wide text-pine">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-2 border-pine/15 px-4 py-2.5 rounded-lg focus:outline-none focus:border-rust transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-semibold uppercase tracking-wide text-pine">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border-2 border-pine/15 px-4 py-3 rounded-lg focus:outline-none focus:border-rust transition-colors"
                rows="5"
                placeholder="Tell us about your trekking needs..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="flex items-center justify-center gap-2 bg-rust hover:bg-rust-dark text-cream font-semibold py-3 px-6 rounded-full transition-colors w-full disabled:opacity-50"
            >
              <Send size={16} />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
