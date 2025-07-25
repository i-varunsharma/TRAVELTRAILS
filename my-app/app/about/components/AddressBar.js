'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initials, setInitials] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    const name = localStorage.getItem('userName');
    if (name) {
      const nameParts = name.trim().split(' ');
      const first = nameParts[0]?.charAt(0) || '';
      const last = nameParts[1]?.charAt(0) || '';
      setInitials((first + last).toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setInitials('');
    router.push('/login');
  };

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Places', path: '/places' },
    { name: 'Contact', path: '../contact' }
  ];

  return (
    <header className='fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1000px] px-4 py-2 sm:py-3 rounded-2xl shadow-xl bg-white/90 backdrop-blur-md text-zinc-800'>
      <nav className='flex items-center justify-between'>
        <Link href='/' className='text-lg sm:text-2xl md:text-3xl font-extrabold text-green-700'>
          TrekTrails
        </Link>

        <div className='flex items-center gap-3 sm:gap-5'>
          <ul className='flex items-center gap-3 sm:gap-5'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className='text-xs sm:text-sm md:text-base font-medium uppercase hover:text-green-500 transition-all duration-200'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-3">
                <div className="bg-green-700 text-white font-bold rounded-full w-9 h-9 flex items-center justify-center">
                  {initials}
                </div>
                <button
                  onClick={handleLogout}
                  className='bg-red-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-red-500 transition duration-300'
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link href='/login'>
              <button className='bg-green-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-green-600 transition duration-300'>
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
