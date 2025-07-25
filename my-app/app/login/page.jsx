'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginSignupPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log('Login attempted with:', email, password);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      console.log('Signup attempted with:', name, email, password);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', name); // Save name
    }

    // For both login/signup, redirect to places
    router.push('/places');

    // Clear form
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[url('/bgimg.jpg')] bg-cover bg-center px-4 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur z-0"></div>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-10 w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          {isLogin ? 'Welcome Back, Trekker!' : 'Join the Adventure!'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

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
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          {isLogin ? (
            <>
              New to TrekTrails?{' '}
              <button onClick={() => setIsLogin(false)} className="text-green-700 hover:underline">
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="text-green-700 hover:underline">
                Log In
              </button>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
