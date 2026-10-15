import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, BookOpen, Calculator, Folder, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { useRouter } from '../context/RouterContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { articles: [], categories: [], calculators: [] };

    const matchedArticles = ARTICLES.filter((art) => {
      return (
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.primaryKeyword.toLowerCase().includes(q) ||
        art.secondaryKeywords.some((k) => k.toLowerCase().includes(q)) ||
        art.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    const matchedCategories = CATEGORIES.filter((cat) => {
      return (
        cat.name.toLowerCase().includes(q) ||
        cat.shortDescription.toLowerCase().includes(q) ||
        cat.primaryKeyword.toLowerCase().includes(q)
      );
    });

    const calculators = [
      {
        id: 'compound-calc',
        name: 'Compound Interest Growth Simulator',
        description: 'Simulate annual and monthly compounding over 10-40 years with regular deposits.',
        url: '/financial-calculators/#compound',
      },
      {
        id: 'budget-calc',
        name: '50/30/20 Monthly Budget Planner',
        description: 'Divide take-home pay into Needs, Wants, and Savings with real-time adjustments.',
        url: '/financial-calculators/#budget',
      },
      {
        id: 'fee-calc',
        name: 'Investment Fee Drag & Expense Ratio Calculator',
        description: 'Measure the exact 30-year dollar cost difference between 0.1% and 1.0% fund fees.',
        url: '/financial-calculators/#fees',
      },
      {
        id: 'retirement-calc',
        name: 'Retirement 25x Nest Egg Estimator',
        description: 'Calculate your target financial independence number using the 4% rule.',
        url: '/financial-calculators/#retirement',
      },
    ].filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));

    return { articles: matchedArticles, categories: matchedCategories, calculators };
  }, [query]);

  if (!isOpen) return null;

  const totalResults = results.articles.length + results.categories.length + results.calculators.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-[#F7F6F2] rounded-lg border border-[#D9D7D0] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Search Finance Guru"
      >
        {/* Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#D9D7D0] bg-[#FAF9F5]">
          <Search size={20} className="text-[#66645F] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, compound interest, credit scores, 50/30/20, taxes..."
            className="w-full bg-transparent text-[#171717] placeholder-[#66645F] text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#66645F] hover:text-[#171717] mr-2 px-1.5 py-0.5 rounded bg-[#EFECE6]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#66645F] hover:text-[#171717] p-1 rounded hover:bg-[#EFECE6] transition-colors"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 text-left">
          {query.trim() === '' ? (
            <div className="py-6 text-center text-sm text-[#66645F]">
              <p className="font-serif text-base text-[#171717] mb-2">Instant Financial Education Search</p>
              <p className="max-w-md mx-auto text-xs leading-relaxed">
                Type keywords like <span className="font-mono text-[#2E5A44]">"compound interest"</span>, <span className="font-mono text-[#2E5A44]">"budget"</span>, <span className="font-mono text-[#2E5A44]">"credit score"</span>, or <span className="font-mono text-[#2E5A44]">"term life"</span> to find structured guides and calculators.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-sm text-[#66645F]">
              <p className="font-serif text-lg text-[#171717] mb-1">No direct matching resources found</p>
              <p className="text-xs">Try searching for broader terms like "investing", "saving", "fees", or "debt".</p>
            </div>
          ) : (
            <>
              {/* Calculators Results */}
              {results.calculators.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#2E5A44] font-medium mb-2 flex items-center gap-1.5">
                    <Calculator size={13} /> Financial Calculators ({results.calculators.length})
                  </div>
                  <div className="space-y-1.5">
                    {results.calculators.map((calc) => (
                      <button
                        key={calc.id}
                        onClick={() => {
                          onClose();
                          navigate(calc.url);
                        }}
                        className="w-full text-left p-3 rounded hover:bg-[#EFECE6] transition-colors flex items-center justify-between group border border-transparent hover:border-[#D9D7D0]"
                      >
                        <div>
                          <p className="font-medium text-sm text-[#171717] group-hover:text-[#2E5A44]">
                            {calc.name}
                          </p>
                          <p className="text-xs text-[#66645F] mt-0.5">{calc.description}</p>
                        </div>
                        <ArrowRight size={14} className="text-[#66645F] group-hover:text-[#2E5A44] shrink-0 ml-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Categories */}
              {results.categories.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#2E5A44] font-medium mb-2 flex items-center gap-1.5">
                    <Folder size={13} /> Learning Categories ({results.categories.length})
                  </div>
                  <div className="space-y-1.5">
                    {results.categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onClose();
                          navigate(`/${cat.slug}/`);
                        }}
                        className="w-full text-left p-3 rounded hover:bg-[#EFECE6] transition-colors flex items-center justify-between group border border-transparent hover:border-[#D9D7D0]"
                      >
                        <div>
                          <p className="font-medium text-sm text-[#171717] group-hover:text-[#2E5A44]">
                            {cat.name}
                          </p>
                          <p className="text-xs text-[#66645F] mt-0.5">{cat.shortDescription}</p>
                        </div>
                        <ArrowRight size={14} className="text-[#66645F] group-hover:text-[#2E5A44] shrink-0 ml-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Results */}
              {results.articles.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#2E5A44] font-medium mb-2 flex items-center gap-1.5">
                    <BookOpen size={13} /> Educational Guides ({results.articles.length})
                  </div>
                  <div className="space-y-2">
                    {results.articles.map((art) => (
                      <button
                        key={art.slug}
                        onClick={() => {
                          onClose();
                          navigate(`/${art.categorySlug}/${art.slug}/`);
                        }}
                        className="w-full text-left p-3 rounded hover:bg-[#EFECE6] transition-colors group border border-transparent hover:border-[#D9D7D0]"
                      >
                        <div className="flex items-center gap-2 text-[11px] text-[#2E5A44] font-medium uppercase tracking-wider mb-1">
                          <span>{art.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#66645F]">{art.readingTime}</span>
                        </div>
                        <p className="font-serif text-base text-[#171717] group-hover:text-[#2E5A44] transition-colors">
                          {art.title}
                        </p>
                        <p className="text-xs text-[#66645F] line-clamp-2 mt-1 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#FAF9F5] border-t border-[#D9D7D0] flex items-center justify-between text-[11px] text-[#66645F]">
          <span>Tip: Use <kbd className="px-1.5 py-0.5 bg-[#EFECE6] rounded border border-[#D9D7D0] font-mono text-[10px]">Esc</kbd> to exit</span>
          <span>{totalResults} resources available</span>
        </div>
      </div>
    </div>
  );
}
