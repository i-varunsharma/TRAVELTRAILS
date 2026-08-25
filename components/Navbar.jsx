'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { fetchCurrentUser, logout } from '@/lib/client/auth-client';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Places', path: '/places' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = Boolean(user);

  // Every page mounts its own Navbar, so this runs fresh on every navigation
  // and always reflects the current session.
  useEffect(() => {
    fetchCurrentUser().then(setUser);
  }, []);

  // The drawer should never still be open after a navigation happened
  // underneath it (e.g. a link click already routed away).
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Let Escape close the drawer, same as the booking modal does.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setDrawerOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Bebas Neue's line-height leaves more empty space below the
            letters than above them, so a plain `items-center` leaves the
            wordmark sitting visibly higher than the nav text next to it —
            this small nudge down corrects for that. */}
        <Link href="/" className="font-display text-3xl text-cream inline-block translate-y-0.5">
          TrekTrails
        </Link>

        <div className="hidden sm:flex items-center gap-6 sm:gap-8">
          <ul className="flex items-center gap-6 sm:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`relative text-sm font-semibold uppercase tracking-wide transition-colors ${
                      isActive ? 'text-cream' : 'text-cream/80 hover:text-cream'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-rust rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
            {user?.role === 'admin' && (
              <li>
                <Link
                  href="/admin"
                  className="text-sm font-semibold uppercase tracking-wide text-rust hover:text-rust-dark transition-colors"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-cream/80 border border-cream/30 px-5 py-2 rounded-full hover:bg-ink-light transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="text-sm font-semibold text-cream/80 border border-cream/30 px-5 py-2 rounded-full hover:bg-ink-light transition-colors"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/places"
              className="bg-rust text-cream text-sm font-semibold px-5 py-2 rounded-full hover:bg-rust-dark transition-colors"
            >
              Book a Trek
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="sm:hidden text-cream"
        >
          <Menu size={26} />
        </button>
      </nav>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-ink/70" onClick={() => setDrawerOpen(false)} />

            <motion.div
              className="absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-ink bg-contours p-6 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="self-end text-cream/80 hover:text-cream"
              >
                <X size={24} />
              </button>

              <ul className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`text-lg font-display uppercase tracking-wide ${
                        pathname === link.path ? 'text-rust' : 'text-cream'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                {user?.role === 'admin' && (
                  <li>
                    <Link href="/admin" className="text-lg font-display uppercase tracking-wide text-rust">
                      Admin
                    </Link>
                  </li>
                )}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-cream/80 border border-cream/30 px-5 py-2.5 rounded-full text-center"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-cream/80 border border-cream/30 px-5 py-2.5 rounded-full text-center"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  href="/places"
                  className="bg-rust text-cream text-sm font-semibold px-5 py-2.5 rounded-full text-center hover:bg-rust-dark transition-colors"
                >
                  Book a Trek
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
