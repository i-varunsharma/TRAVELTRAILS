'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, CalendarDays, Users, User, Phone, CheckCircle2 } from 'lucide-react';
import FilterChips from './FilterChips';

const PICKUP_OPTIONS = [
  { label: "I'll reach the base camp myself", value: 'self' },
  { label: 'Pick me up from the nearest station', value: 'station' },
  { label: 'Pick me up from the state capital', value: 'capital' },
];

// Bookings can only start 2 days from now at the earliest.
function getMinDate() {
  const today = new Date();
  today.setDate(today.getDate() + 2);
  return today.toISOString().split('T')[0];
}

// The "Enquire Now" popup shown from a trek card. Submits the enquiry to
// the server, where it's saved so you (the admin) can see it in /admin.
//
// Accessibility: closes on a backdrop click or Escape, and traps Tab focus
// inside the panel while it's open so keyboard users can't tab out to the
// page underneath.
function TrekBookingForm({ trek, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    people: '',
    name: '',
    whatsapp: '',
    pickup: '',
  });

  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          trekName: trek.name,
          stateName: trek.state,
          date: formData.date,
          people: formData.people,
          contactName: formData.name,
          whatsapp: formData.whatsapp,
          pickup: formData.pickup,
        }),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-ink/70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Book ${trek.name}`}
        className="relative bg-card text-stone-900 rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-rust/10 flex items-center justify-center">
              <CheckCircle2 className="text-rust" size={26} />
            </div>
            <h2 className="font-display uppercase text-2xl text-ink mb-2">Enquiry Sent</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              We'll reply on WhatsApp within 4 hours with next steps and payment details.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 text-sm font-semibold px-5 py-2.5 rounded-full bg-rust text-cream hover:bg-rust-dark transition-colors"
            >
              Back to treks
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-ink -m-6 mb-5 px-6 py-4 rounded-t-2xl flex items-start justify-between gap-4">
              <h2 className="font-display uppercase text-2xl text-cream leading-tight">Book {trek.name}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 text-cream/70 hover:text-cream transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-ink/70">Preferred Date</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4.5 h-4.5 pointer-events-none" />
                  <input
                    ref={firstFieldRef}
                    type="date"
                    name="date"
                    min={getMinDate()}
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-ink/15 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-rust transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-ink/70">Number of People</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4.5 h-4.5 pointer-events-none" />
                  <input
                    type="number"
                    name="people"
                    placeholder="e.g. 2"
                    value={formData.people}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-ink/15 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-rust transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-ink/70">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4.5 h-4.5 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-ink/15 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-rust transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-ink/70">WhatsApp Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4.5 h-4.5 pointer-events-none" />
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-ink/15 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-rust transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wide text-ink/70">Pickup Point</label>
                <FilterChips options={PICKUP_OPTIONS} value={formData.pickup} onChange={(pickup) => setFormData({ ...formData, pickup })} />
              </div>

              <p className="text-xs text-stone-500 leading-relaxed bg-ink/5 rounded-lg p-3">
                A trek coordinator will check your last trek and fitness level before confirming your slot.
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm font-semibold px-4 py-2 rounded-full text-ink hover:bg-ink/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="text-sm font-semibold px-5 py-2 rounded-full bg-rust text-cream hover:bg-rust-dark disabled:opacity-50"
                >
                  {sending ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default TrekBookingForm;
