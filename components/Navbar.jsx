'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser, logout } from '@/lib/client/auth-client';

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
    <header className='sticky top-0 z-50 bg-pine'>
      <nav className='max-w-6xl mx-auto flex items-center justify-between px-6 py-4'>
        <Link href='/' className='font-display text-3xl text-cream'>
          TrekTrails
        </Link>

        <div className='flex items-center gap-6 sm:gap-8'>
          <ul className='hidden sm:flex items-center gap-6 sm:gap-8'>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  onClick={(e) => handleProtectedClick(e, link.path)}
                  className='text-sm font-semibold uppercase tracking-wide text-cream/80 hover:text-cream transition-colors'
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {user?.role === 'admin' && (
              <li>
                <Link
                  href='/admin'
                  className='text-sm font-semibold uppercase tracking-wide text-rust hover:text-rust-dark transition-colors'
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {!isLoggedIn ? (
            <Link
              href='/login'
              className='bg-rust text-cream text-sm font-semibold px-5 py-2 rounded-full hover:bg-rust-dark transition-colors'
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className='text-sm font-semibold text-cream/80 border border-cream/30 px-5 py-2 rounded-full hover:bg-pine-light transition-colors'
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
