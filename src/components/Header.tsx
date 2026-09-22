import React, { useState } from 'react';

interface HeaderProps {
  showCta: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showCta }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-apple-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Left Spacer for layout symmetry */}
        <div className="w-8 md:w-0"></div>

        {/* Centered Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-8 text-[15px] font-medium text-apple-darkBg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          <a href="#why-ai" className="whitespace-nowrap hover:text-apple-accent transition-colors">Why Speed & AI</a>
          <a href="#challenge" className="whitespace-nowrap hover:text-apple-accent transition-colors">The Challenge</a>
          <a href="#solution" className="whitespace-nowrap hover:text-apple-accent transition-colors">How It Works</a>
          <a href="#demo" className="whitespace-nowrap hover:text-apple-accent transition-colors">Demo</a>
          <a href="#industries" className="whitespace-nowrap hover:text-apple-accent transition-colors">Industries</a>
          <a href="#dashboard" className="whitespace-nowrap hover:text-apple-accent transition-colors">Dashboard</a>
          <a href="#faq" className="whitespace-nowrap hover:text-apple-accent transition-colors">FAQ</a>
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center space-x-4 ml-auto">
          <a
            id="nav-cta-btn"
            href="#contact"
            className={`hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-apple-accent hover:bg-apple-accentHover text-white text-sm font-medium transition-all duration-300 shadow-sm whitespace-nowrap ${
              showCta
                ? 'opacity-100 pointer-events-auto translate-y-0'
                : 'opacity-0 pointer-events-none translate-y-1'
            }`}
          >
            Book Consultation
          </a>
          <button
            id="menu-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-apple-darkBg p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-b border-apple-border px-4 pt-2 pb-6 space-y-3`}
      >
        <a href="#why-ai" onClick={closeMenu} className="block text-sm font-medium text-apple-darkBg py-2">Why Speed & AI</a>
        <a href="#challenge" onClick={closeMenu} className="block text-sm font-medium text-apple-darkBg py-2">The Challenge</a>
        <a href="#solution" onClick={closeMenu} className="block text-sm font-medium text-apple-darkBg py-2">How It Works</a>
        <a href="#demo" onClick={closeMenu} className="block text-sm font-medium text-apple-darkBg py-2">Demo</a>
        <a href="#industries" onClick={closeMenu} className="block text-sm font-medium text-apple-darkBg py-2">Industries</a>
        <a href="#dashboard" onClick={closeMenu} className="block text-sm font-medium text-apple-darkBg py-2">Dashboard</a>
        <a href="#faq" onClick={closeMenu} className="block text-sm font-medium text-apple-darkBg py-2">FAQ</a>
        <a href="#contact" onClick={closeMenu} className="block text-center w-full py-3 rounded-full bg-apple-accent text-white text-sm font-medium">Book Consultation</a>
      </div>
    </header>
  );
};
