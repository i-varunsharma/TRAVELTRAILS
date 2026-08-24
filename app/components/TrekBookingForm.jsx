'use client';
import React, { useState } from 'react';

// The "Enquire Now" popup on a trek's page. Submits the booking request to
// the server, where it's saved so you (the admin) can see it in /admin.
function TrekBookingForm({ trekName, stateName, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    people: '',
    name: '',
    whatsapp: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Bookings can only start 2 days from now at the earliest.
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(formData.people) <= 0) {
      setError('Number of people must be greater than 0');
      return;
    }

    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trekName,
          stateName,
          date: formData.date,
          people: formData.people,
          contactName: formData.name,
          whatsapp: formData.whatsapp,
        }),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setSubmitted(true);
      setTimeout(onClose, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
      <div className="bg-white/50 text-black p-6 rounded-2xl w-[90%] max-w-md shadow-xl animate-fade-in">
        {submitted ? (
          <div className="text-center text-lg font-semibold text-green-600">
            Thanks for showing interest! Details and procedure will be shared on your WhatsApp soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-2 text-center text-black-100">Book {trekName}</h2>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <input
              type="date"
              name="date"
              min={getMinDate()}
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="people"
              placeholder="Number of People"
              value={formData.people}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={formData.whatsapp}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-4 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending}
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {sending ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default TrekBookingForm;
