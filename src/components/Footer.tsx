import { Link } from '../context/RouterContext';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#D9D7D0] bg-[#F7F6F2] py-14 mt-auto">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-[#D9D7D0]/60">
          <div className="max-w-md">
            <Link to="/" className="text-lg font-serif font-medium text-[#171717] hover:text-[#2E5A44] transition-colors">
              Finance Guru
            </Link>
            <p className="mt-2 text-sm text-[#66645F] leading-relaxed">
              Clear, evidence-based ideas for saving, investing, spending, and building long-term financial independence.
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#66645F]">
            <Link to="/blog" className="hover:text-[#171717] transition-colors">
              Journal
            </Link>
            <Link to="/about" className="hover:text-[#171717] transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-[#171717] transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-[#171717] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#171717] transition-colors">
              Terms
            </Link>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#66645F]">
          <p>© {currentYear} Finance Guru. All rights reserved.</p>
          <p className="text-[11px] max-w-lg leading-normal text-[#66645F]/80">
            Editorial Notice: Content published by Finance Guru is intended solely for educational and informational purposes and does not constitute certified legal, tax, or investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
