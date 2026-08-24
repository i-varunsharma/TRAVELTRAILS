'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser, logout } from '@/lib/auth-client';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Places', path: '/places' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const isLoggedIn = Boolean(user);

  // Every page mounts its own Navbar, so this runs fresh on every navigation
  // and always reflects the current session.
  useEffect(() => {
    fetchCurrentUser().then(setUser);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/');
  };

  // If someone who isn't logged in clicks a protected link, send them to
  // /login instead of letting the click go through (middleware.js would
  // redirect them anyway, but this skips the extra round trip).
  const handleProtectedClick = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push(`/login?returnUrl=${path}`);
    }
  };

  return (
    <header className='fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1000px] px-4 py-2 sm:py-3 rounded-2xl shadow-xl bg-white/90 backdrop-blur-md text-zinc-800'>
      <nav className='flex items-center justify-between'>
        <Link href='/' className='text-lg sm:text-2xl md:text-3xl font-extrabold text-green-700'>
          TrekTrails
        </Link>

        <div className='flex items-center gap-3 sm:gap-5'>
          <ul className='flex items-center gap-3 sm:gap-5'>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  onClick={(e) => handleProtectedClick(e, link.path)}
                  className='text-xs sm:text-sm md:text-base font-medium uppercase hover:text-green-500 transition-all duration-200'
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {user?.role === 'admin' && (
              <li>
                <Link
                  href='/admin'
                  className='text-xs sm:text-sm md:text-base font-medium uppercase text-green-700 hover:text-green-500 transition-all duration-200'
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {!isLoggedIn ? (
            <Link
              href='/login'
              className='bg-green-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-green-600 transition duration-300'
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className='bg-red-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-red-500 transition duration-300'
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
