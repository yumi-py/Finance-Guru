import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';

interface ArticleHeadingProps {
  id: string;
  level: 2 | 3;
  children: React.ReactNode;
  className?: string;
}

export function ArticleHeading({ id, level, children, className = '' }: ArticleHeadingProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Construct full shareable section URL
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#${id}`
      : `#${id}`;

    let success = false;
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch {
        // Fallback below
      }
    }

    if (!success && typeof document !== 'undefined') {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        success = false;
      }
    }

    // Update browser address bar without jump
    if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${id}`);
    }

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const HeadingTag = level === 2 ? 'h2' : 'h3';
  const defaultSizeClass = level === 2
    ? 'text-2xl sm:text-3xl font-normal mt-12 mb-4'
    : 'text-xl sm:text-2xl font-medium mt-8 mb-3';

  return (
    <HeadingTag
      id={id}
      className={`group relative scroll-mt-28 font-serif text-[#171717] flex items-baseline justify-between gap-3 ${defaultSizeClass} ${className}`}
    >
      <span className="flex-1 text-balance">
        {children}
      </span>

      {/* Shareable Section Link Button */}
      <span className="relative inline-flex items-center shrink-0 self-center">
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={`Copy link to section: ${typeof children === 'string' ? children : id}`}
          title={copied ? 'Section link copied!' : 'Copy link to this section'}
          className="p-1.5 rounded text-[#66645F] hover:text-[#2E5A44] hover:bg-[#EFECE6] focus-visible:outline-2 focus-visible:outline-[#2E5A44] transition-all opacity-40 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
        >
          {copied ? (
            <Check size={16} className="text-[#2E5A44] animate-in zoom-in-75 duration-150" aria-hidden="true" />
          ) : (
            <Link2 size={16} aria-hidden="true" />
          )}
        </button>

        {/* Transient feedback tooltip */}
        {copied && (
          <span
            role="status"
            aria-live="polite"
            className="absolute right-0 bottom-full mb-1.5 px-2.5 py-1 text-[11px] font-sans font-medium text-white bg-[#171717] rounded shadow-md whitespace-nowrap z-30 pointer-events-none animate-in fade-in slide-in-from-bottom-1 duration-150"
          >
            Section link copied
          </span>
        )}
      </span>
    </HeadingTag>
  );
}
