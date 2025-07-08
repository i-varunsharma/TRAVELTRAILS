'use client';
import Navbar from '../about/components/AddressBar';
// app/login/page.js or app/login/page.jsx
 // Needed if you’re handling state/events on client side

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)
    console.log('Login attempted with:', email, password);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[url('/bgimg.jpg')] bg-cover bg-center px-4">
        <div className="absolute inset-0 bg-black/ backdrop-blur z-0"></div>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Welcome Back, Trekker!</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          New to TrekTrails? <a href="/signup" className="text-green-700 hover:underline">Create an account</a>
        </p>
      </div>
    </section>
  );
}
