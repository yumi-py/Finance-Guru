import React, { useState, useEffect } from 'react';
import { TocItem } from '../types/content';
import { ListTree, ChevronDown } from 'lucide-react';

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  // Mobile collapsible state: collapsed by default on small screens to save viewport space
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  // Track active heading as user scrolls using IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !items || items.length === 0) return;

    const headingElements: HTMLElement[] = [];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) headingElements.push(el);
    });

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible headings
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Select topmost visible heading
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: [0, 1],
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // We let the native anchor jump occur, or handle smooth scroll
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash for sharing, back/forward history
      if (typeof window !== 'undefined' && window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
      setActiveId(id);
      // Move focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className={`my-10 p-5 sm:p-6 bg-[#FAF9F5] border border-[#D9D7D0] rounded-lg text-left shadow-2xs ${className}`}
    >
      {/* Header with Title and Mobile Toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ListTree size={16} className="text-[#2E5A44]" aria-hidden="true" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#2E5A44] font-semibold">
            Table of Contents
          </h2>
          <span className="text-[11px] font-mono text-[#66645F] hidden sm:inline">
            ({items.length} {items.length === 1 ? 'section' : 'sections'})
          </span>
        </div>

        {/* Mobile Collapsible Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="md:hidden flex items-center gap-1.5 text-xs font-mono text-[#2E5A44] hover:text-[#171717] px-2.5 py-1 rounded border border-[#D9D7D0] bg-[#EFECE6]/50 focus-visible:outline-2 focus-visible:outline-[#2E5A44] transition-colors"
          aria-expanded={isMobileExpanded}
          aria-controls="toc-list"
          aria-label={isMobileExpanded ? 'Collapse Table of Contents' : 'Expand Table of Contents'}
        >
          <span>{isMobileExpanded ? 'Hide' : 'Show'}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isMobileExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* TOC Items List (collapsible on mobile, always visible on md+) */}
      <div
        id="toc-list"
        className={`mt-4 pt-3 border-t border-[#D9D7D0]/60 ${
          isMobileExpanded ? 'block' : 'hidden md:block'
        }`}
      >
        <ol className="space-y-1.5 text-sm list-none p-0 m-0">
          {items.map((item, idx) => {
            const isActive = activeId === item.id;
            const isSubheading = item.level === 3;

            return (
              <li
                key={`${item.id}-${idx}`}
                className={`${
                  isSubheading
                    ? 'pl-5 sm:pl-6 border-l border-[#D9D7D0] ml-2 text-xs sm:text-[13px]'
                    : 'text-sm'
                }`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`group inline-flex items-baseline gap-2 py-1 transition-colors leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5A44] rounded px-1 -mx-1 ${
                    isActive
                      ? 'text-[#2E5A44] font-medium'
                      : 'text-[#171717] hover:text-[#2E5A44]'
                  }`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span
                    className={`font-mono text-[11px] select-none transition-colors ${
                      isActive ? 'text-[#2E5A44] font-bold' : 'text-[#66645F] group-hover:text-[#2E5A44]'
                    }`}
                    aria-hidden="true"
                  >
                    {isSubheading ? '↳' : `${idx + 1}.`}
                  </span>
                  <span className="hover:underline underline-offset-4 decoration-[#2E5A44]/40">
                    {item.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
