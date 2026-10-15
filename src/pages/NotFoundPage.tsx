import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found (404) — Finance Guru"
        description="The requested page could not be located on Finance Guru."
        noindex={true}
      />

      <main className="max-w-3xl mx-auto px-6 py-28 text-center">
        <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-3">
          Error 404
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-normal text-[#171717]">
          Page Not Located
        </h1>
        <p className="mt-5 text-base text-[#66645F] max-w-md mx-auto leading-relaxed">
          The essay or URL you requested is not available. It may have been moved, renamed, or temporarily withdrawn for editorial revision.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#171717] hover:text-[#2E5A44] border-b border-[#171717] hover:border-[#2E5A44] py-1 transition-colors"
          >
            <ArrowLeft size={16} /> Return to Homepage
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2E5A44] hover:text-[#224333] border-b border-[#2E5A44] py-1 transition-colors"
          >
            Browse the Journal Archive
          </Link>
        </div>
      </main>
    </>
  );
}
