'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';

// Simple read-only view for the site owner: everyone who submitted a trek
// booking or a contact message. The API routes this calls (/api/admin/*)
// check independently that the logged-in user has role "admin" — this page
// just reflects whatever they say.
const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [bookingsRes, messagesRes] = await Promise.all([
        fetch('/api/admin/bookings'),
        fetch('/api/admin/messages'),
      ]);

      if (bookingsRes.status === 403 || messagesRes.status === 403) {
        setForbidden(true);
        setLoading(false);
        return;
      }

      const bookingsData = await bookingsRes.json();
      const messagesData = await messagesRes.json();
      setBookings(bookingsData.bookings || []);
      setMessages(messagesData.messages || []);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="relative min-h-screen p-6 bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto pt-24 space-y-12">
        <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>

        {loading && <p className="text-gray-600">Loading...</p>}

        {forbidden && (
          <p className="text-red-600 font-semibold">
            You don't have access to this page. Only admin accounts can view bookings and messages.
          </p>
        )}

        {!loading && !forbidden && (
          <>
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Trek Bookings ({bookings.length})</h2>
              <div className="overflow-x-auto rounded-xl shadow bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th className="p-3">Trek</th>
                      <th className="p-3">State</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">People</th>
                      <th className="p-3">Contact Name</th>
                      <th className="p-3">WhatsApp</th>
                      <th className="p-3">Booked By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id} className="border-t border-gray-200">
                        <td className="p-3">{b.trekName}</td>
                        <td className="p-3">{b.stateName}</td>
                        <td className="p-3">{b.date}</td>
                        <td className="p-3">{b.people}</td>
                        <td className="p-3">{b.contactName}</td>
                        <td className="p-3">{b.whatsapp}</td>
                        <td className="p-3">{b.userEmail}</td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr><td className="p-3 text-gray-500" colSpan={7}>No bookings yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Messages ({messages.length})</h2>
              <div className="overflow-x-auto rounded-xl shadow bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((m) => (
                      <tr key={m._id} className="border-t border-gray-200">
                        <td className="p-3">{m.name}</td>
                        <td className="p-3">{m.email}</td>
                        <td className="p-3">{m.message}</td>
                      </tr>
                    ))}
                    {messages.length === 0 && (
                      <tr><td className="p-3 text-gray-500" colSpan={3}>No messages yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
