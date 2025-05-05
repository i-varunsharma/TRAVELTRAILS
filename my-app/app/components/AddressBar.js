import Link from 'next/link'
import React from 'react'

function Navbar() {
  // 1️⃣ Array of link objects
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Places', path: '/Places' },
    { name: 'Contact', path: '/contact' },
    // { name: 'Packages', path: '/packages' },
    { name: 'Gallery', path: '/gallery' },
    // { name: 'Blog', path: '/blog' },
    // { name: 'FAQ', path: '/faq' }
  ];

  return (
    <>
      <header className='px-5 py-4 shadow-lg text-gray-800'>
        <nav className='flex items-center justify-between'>
          <h1 className='text-3xl font-extrabold text-green-700'>TrekTrails</h1>
          
          <div className='flex items-center gap-9'>
            <ul className='flex items-center gap-8'>
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className='text-xl font-medium hover:text-green-700 hover:underline underline-offset-4 transition-all duration-300'
                >
                  {link.name}
                </Link>
              ))}
            </ul>

            <Link href={'/login'}>
              <button className='bg-green-700 text-white px-5 py-2 rounded-15 hover:bg-green-600 transition-all duration-300 shadow-md'>
                Login
              </button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
