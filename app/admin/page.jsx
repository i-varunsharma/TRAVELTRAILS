'use client';
import React, { useEffect, useState } from 'react';
import { CalendarCheck, Mail, ShieldAlert } from 'lucide-react';
import Navbar from '@/components/Navbar';

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
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-[url('/bgimg.jpg')] bg-cover bg-center" />
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative">
        <Navbar />

        <div className="max-w-6xl mx-auto pt-28 pb-16 px-6 space-y-10">
          <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>

          {loading && <p className="text-gray-300">Loading...</p>}

          {forbidden && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
              <ShieldAlert className="shrink-0" size={20} />
              <p className="font-medium">
                You don't have access to this page. Only admin accounts can view bookings and messages.
              </p>
            </div>
          )}

          {!loading && !forbidden && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 bg-white/10 border border-white/15 rounded-2xl p-5">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <CalendarCheck className="text-green-400" size={22} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{bookings.length}</p>
                    <p className="text-sm text-gray-300">Trek Bookings</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/10 border border-white/15 rounded-2xl p-5">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <Mail className="text-green-400" size={22} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{messages.length}</p>
                    <p className="text-sm text-gray-300">Contact Messages</p>
                  </div>
                </div>
              </div>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">Trek Bookings</h2>
                <div className="overflow-x-auto rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl">
                  <table className="w-full text-left text-sm text-gray-100">
                    <thead className="bg-white/10 text-gray-300 uppercase text-xs tracking-wide">
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
                        <tr key={b._id} className="border-t border-white/10 hover:bg-white/5">
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
                        <tr><td className="p-3 text-gray-400" colSpan={7}>No bookings yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4">Contact Messages</h2>
                <div className="overflow-x-auto rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl">
                  <table className="w-full text-left text-sm text-gray-100">
                    <thead className="bg-white/10 text-gray-300 uppercase text-xs tracking-wide">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((m) => (
                        <tr key={m._id} className="border-t border-white/10 hover:bg-white/5">
                          <td className="p-3">{m.name}</td>
                          <td className="p-3">{m.email}</td>
                          <td className="p-3">{m.message}</td>
                        </tr>
                      ))}
                      {messages.length === 0 && (
                        <tr><td className="p-3 text-gray-400" colSpan={3}>No messages yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
