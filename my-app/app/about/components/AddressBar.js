'use client'; // Important if used inside app router
import Link from 'next/link';
import React from 'react';

function Navbar() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Places', path: '/places' },
    { name: 'Contact', path: '/contact' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <header className='absolute z-10 translate-x-[-50%] translate-y-[-50%] left-1/2 mt-3 rounded-2xl top-10 w-350 px-5 py-4 shadow-2xl inset-shadow-2xs inset-ring inset-ring-green-700/50 text-zinc-800'>
      <nav className='flex items-center justify-between'>
        <Link href='/' className='text-3xl font-extrabold text-green-700'>
          TrekTrails
        </Link>

        <div className='flex items-center gap-9'>
          <ul className='flex items-center gap-8'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className='text-lg font-base uppercase hover:text-green-700 transition-all duration-300'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link href='/login'>
            <button className='bg-green-700 text-white px-5 py-2 rounded-2xl hover:bg-green-600 transition-all duration-300 shadow-md'>
              Login
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;


