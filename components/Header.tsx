'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'top-0 bg-white shadow-md' : 'top-9 bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-red-600' : 'text-white'}`}>
              QUANG MINH
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { label: 'Trang Chủ', href: '#' },
              { label: 'Giới Thiệu', href: '#about' },
              { label: 'Sản Phẩm', href: '#solutions' },
              { label: 'Dự Án', href: '#projects' },
              { label: 'Tin Tức', href: '#news' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`font-medium transition-colors hover:text-red-600 ${scrolled ? 'text-gray-800' : 'text-white'}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Liên Hệ
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <svg className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white rounded-xl mt-2 shadow-xl">
            <div className="flex flex-col space-y-1 p-4">
              {[
                { label: 'Trang Chủ', href: '#' },
                { label: 'Giới Thiệu', href: '#about' },
                { label: 'Sản Phẩm', href: '#solutions' },
                { label: 'Dự Án', href: '#projects' },
                { label: 'Tin Tức', href: '#news' },
                { label: 'Liên Hệ', href: '#contact' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 px-4 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
