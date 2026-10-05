import { useState } from 'react';
import { Link, useRouter } from '../context/RouterContext';
import { Menu, X } from 'lucide-react';

export function Header() {
  const { path } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (targetPath: string) => {
    if (targetPath === '/' && path === '/') return true;
    if (targetPath !== '/' && path.startsWith(targetPath)) return true;
    return false;
  };

  return (
    <header className="w-full border-b border-[#D9D7D0] bg-[#F7F6F2] sticky top-0 z-30 transition-colors">
      <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single text wordmark brand */}
        <Link 
          to="/" 
          className="text-xl font-serif font-medium tracking-tight text-[#171717] hover:text-[#2E5A44] transition-colors focus-visible:outline-none"
        >
          Finance Guru
        </Link>

        {/* Zone 2: Desktop clean text navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#66645F]">
          <Link
            to="/blog"
            className={`transition-colors py-1 ${
              isActive('/blog') ? 'text-[#171717] border-b-2 border-[#171717]' : 'hover:text-[#171717]'
            }`}
          >
            Journal
          </Link>
          <Link
            to="/about"
            className={`transition-colors py-1 ${
              isActive('/about') ? 'text-[#171717] border-b-2 border-[#171717]' : 'hover:text-[#171717]'
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`transition-colors py-1 ${
              isActive('/contact') ? 'text-[#171717] border-b-2 border-[#171717]' : 'hover:text-[#171717]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Zone 3: Subtle minimal action */}
        <div className="hidden md:flex items-center">
          <Link
            to="/blog"
            className="text-xs uppercase tracking-wider font-medium text-[#2E5A44] hover:text-[#224333] transition-colors"
          >
            Latest Essays →
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#171717] hover:text-[#2E5A44] focus-visible:outline-none"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D9D7D0] bg-[#F7F6F2] px-6 py-5">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-4 text-base font-medium text-[#171717]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#2E5A44]"
            >
              Home
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#2E5A44]"
            >
              Journal
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#2E5A44]"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#2E5A44]"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
