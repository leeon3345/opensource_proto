import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#070303]/80 backdrop-blur-md border-b text-white border-white/10 shadow-sm'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight">ComplianceOps</span>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#products" className="text-sm font-medium hover:text-white/70 transition-colors">
            Products
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-white/70 transition-colors">
            Pricing
          </a>
          <a href="#docs" className="text-sm font-medium hover:text-white/70 transition-colors">
            Docs
          </a>
          <a href="#blog" className="text-sm font-medium hover:text-white/70 transition-colors">
            Blog
          </a>
        </div>

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-sm font-medium hover:text-white/70 transition-colors">
            Log in
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-white/70 transition-colors focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#070303] border-b border-white/10 px-6 py-4 flex flex-col space-y-4">
          <a href="#products" className="text-sm font-medium text-white hover:text-white/70 transition-colors">
            Products
          </a>
          <a href="#pricing" className="text-sm font-medium text-white hover:text-white/70 transition-colors">
            Pricing
          </a>
          <a href="#docs" className="text-sm font-medium text-white hover:text-white/70 transition-colors">
            Docs
          </a>
          <a href="#blog" className="text-sm font-medium text-white hover:text-white/70 transition-colors">
            Blog
          </a>
          <hr className="border-white/10" />
          <button className="text-sm font-medium text-white hover:text-white/70 transition-colors text-left">
            Log in
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors w-fit">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
