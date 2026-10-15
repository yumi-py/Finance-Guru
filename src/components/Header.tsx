import { useState, useEffect } from 'react';
import { Link, useRouter } from '../context/RouterContext';
import { CATEGORIES } from '../data/categories';
import { SearchModal } from './SearchModal';
import { SeoAuditInspector } from './SeoAuditInspector';
import { Search, Menu, X, ChevronDown, Sliders, Calculator, BookOpen } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const { path } = useRouter();

  // Keyboard shortcut for search (Cmd+K / Ctrl+K) and Inspector (Ctrl+Shift+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setInspectorOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  }, [path]);

  return (
    <>
      <header className="border-b border-[#D9D7D0] bg-[#FAF9F5]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex flex-col group focus-visible:outline-none">
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#171717] group-hover:text-[#2E5A44] transition-colors leading-none">
              Finance Guru
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#2E5A44] font-medium mt-1">
              Financial Education &amp; Literacy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-mono font-medium text-[#66645F]">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                className="hover:text-[#171717] transition-colors flex items-center gap-1 focus-visible:outline-none py-2"
                aria-expanded={categoriesDropdownOpen}
              >
                <span>Categories</span>
                <ChevronDown size={13} className={`transition-transform ${categoriesDropdownOpen ? 'rotate-180 text-[#2E5A44]' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-64 bg-[#FAF9F5] border border-[#D9D7D0] rounded-lg shadow-xl py-2 z-50 text-left normal-case font-sans"
                >
                  <div className="px-3 py-1.5 border-b border-[#D9D7D0]/60 text-[10px] font-mono uppercase tracking-wider text-[#2E5A44] font-semibold">
                    8 Learning Pathways
                  </div>
                  <div className="max-h-80 overflow-y-auto py-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/${cat.slug}/`}
                        className="block px-3.5 py-2 text-xs text-[#171717] hover:bg-[#EFECE6] hover:text-[#2E5A44] transition-colors"
                      >
                        <span className="font-medium block">{cat.name}</span>
                        <span className="text-[10px] text-[#66645F] line-clamp-1">{cat.shortDescription}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="px-3 py-2 border-t border-[#D9D7D0]/60 bg-[#EFECE6]/50">
                    <Link
                      to="/categories/"
                      className="text-[11px] font-semibold text-[#2E5A44] hover:underline flex items-center justify-between"
                    >
                      <span>View All Categories Hub</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/financial-calculators/"
              className={`hover:text-[#171717] transition-colors flex items-center gap-1.5 ${
                path.startsWith('/financial-calculators') ? 'text-[#171717] font-semibold' : ''
              }`}
            >
              <Calculator size={13} className="text-[#2E5A44]" />
              Calculators
            </Link>

            <Link
              to="/blog/"
              className={`hover:text-[#171717] transition-colors ${
                path === '/blog' || path.startsWith('/blog/') ? 'text-[#171717] font-semibold' : ''
              }`}
            >
              All Guides
            </Link>

            <Link
              to="/about/"
              className={`hover:text-[#171717] transition-colors ${
                path === '/about' ? 'text-[#171717] font-semibold' : ''
              }`}
            >
              About
            </Link>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9D7D0] bg-white hover:bg-[#EFECE6] text-[#66645F] hover:text-[#171717] text-xs transition-colors shadow-2xs"
              aria-label="Search financial education articles"
            >
              <Search size={14} className="text-[#2E5A44]" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block font-mono text-[10px] text-[#66645F] bg-[#FAF9F5] px-1.5 py-0.5 rounded border border-[#D9D7D0]">
                ⌘K
              </kbd>
            </button>

            {/* SEO & Editorial Inspector Toggle */}
            <button
              onClick={() => setInspectorOpen(true)}
              className="p-2 rounded-full text-[#66645F] hover:text-[#2E5A44] hover:bg-[#EFECE6] transition-colors"
              title="Content Quality & Technical SEO Inspector (Ctrl+Shift+S)"
              aria-label="Open Technical SEO Inspector"
            >
              <Sliders size={16} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#171717] hover:bg-[#EFECE6] rounded transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#D9D7D0] bg-[#FAF9F5] px-6 py-6 space-y-5 text-left animate-fade-in shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E5A44] font-semibold block mb-2">
                Core Portals
              </span>
              <Link to="/" className="block py-1.5 text-sm font-medium text-[#171717]">
                Homepage
              </Link>
              <Link to="/categories/" className="block py-1.5 text-sm font-medium text-[#171717]">
                Categories Hub
              </Link>
              <Link to="/financial-calculators/" className="block py-1.5 text-sm font-medium text-[#2E5A44] font-semibold">
                Financial Calculators Suite
              </Link>
              <Link to="/blog/" className="block py-1.5 text-sm font-medium text-[#171717]">
                All Educational Guides
              </Link>
            </div>

            <div className="pt-4 border-t border-[#D9D7D0]/60 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E5A44] font-semibold block mb-2">
                Learning Pathways
              </span>
              <div className="grid grid-cols-1 gap-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/${cat.slug}/`}
                    className="block py-1 text-xs text-[#66645F] hover:text-[#2E5A44]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9D7D0]/60 flex items-center justify-between text-xs text-[#66645F]">
              <Link to="/about/" className="hover:text-[#171717]">About</Link>
              <Link to="/editorial-policy/" className="hover:text-[#171717]">Editorial Policy</Link>
              <Link to="/contact/" className="hover:text-[#171717]">Contact</Link>
              <Link to="/sitemap/" className="hover:text-[#171717]">Sitemap</Link>
            </div>
          </div>
        )}
      </header>

      {/* Instant Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Editorial Quality & Technical SEO Inspector Drawer */}
      <SeoAuditInspector isOpen={inspectorOpen} onClose={() => setInspectorOpen(false)} />
    </>
  );
}
