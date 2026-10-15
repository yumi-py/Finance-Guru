import { Link } from '../context/RouterContext';
import { CATEGORIES } from '../data/categories';
import { ShieldCheck, Map, Calculator, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-[#D9D7D0] bg-[#FAF9F5] text-left pt-16 pb-12 mt-auto">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-14 border-b border-[#D9D7D0]">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-medium tracking-tight text-[#171717]">
                Finance Guru
              </span>
            </Link>
            <p className="text-xs text-[#66645F] leading-relaxed">
              An independent financial education platform providing transparent, evidence-based guidance on saving, investing, debt payoff, taxes, and wealth creation.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EFECE6] rounded text-[11px] font-mono text-[#2E5A44] font-medium">
                <ShieldCheck size={13} /> Zero Affiliate Bounties
              </span>
            </div>
          </div>

          {/* 8 Learning Categories */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#171717] font-semibold">
              Learning Pathways
            </h3>
            <ul className="space-y-2 text-xs text-[#66645F]">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/${cat.slug}/`} className="hover:text-[#2E5A44] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              {CATEGORIES.slice(4).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/${cat.slug}/`} className="hover:text-[#2E5A44] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/categories/" className="text-[#2E5A44] font-semibold hover:underline">
                  All 8 Categories Hub →
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools & Resources */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#171717] font-semibold">
              Calculators &amp; Resources
            </h3>
            <ul className="space-y-2 text-xs text-[#66645F]">
              <li>
                <Link to="/financial-calculators/" className="hover:text-[#2E5A44] transition-colors">
                  Compound Interest Simulator
                </Link>
              </li>
              <li>
                <Link to="/financial-calculators/" className="hover:text-[#2E5A44] transition-colors">
                  50/30/20 Monthly Budget Planner
                </Link>
              </li>
              <li>
                <Link to="/financial-calculators/" className="hover:text-[#2E5A44] transition-colors">
                  1% Fee Drag Impact Model
                </Link>
              </li>
              <li>
                <Link to="/financial-calculators/" className="hover:text-[#2E5A44] transition-colors">
                  4% Retirement Nest Egg Estimator
                </Link>
              </li>
              <li>
                <Link to="/blog/" className="hover:text-[#2E5A44] transition-colors">
                  All Educational Guides Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Trust Standards */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#171717] font-semibold">
              Trust &amp; Governance
            </h3>
            <ul className="space-y-2 text-xs text-[#66645F]">
              <li>
                <Link to="/about/" className="hover:text-[#2E5A44] transition-colors">
                  About Finance Guru
                </Link>
              </li>
              <li>
                <Link to="/editorial-policy/" className="hover:text-[#2E5A44] transition-colors">
                  Editorial &amp; Verification Policy
                </Link>
              </li>
              <li>
                <Link to="/financial-disclaimer/" className="hover:text-[#2E5A44] transition-colors">
                  Financial Education Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="hover:text-[#2E5A44] transition-colors">
                  Contact Editorial Desk
                </Link>
              </li>
              <li>
                <Link to="/privacy/" className="hover:text-[#2E5A44] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms/" className="hover:text-[#2E5A44] transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/sitemap/" className="hover:text-[#2E5A44] transition-colors flex items-center gap-1">
                  <Map size={12} /> HTML Website Sitemap
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2E5A44] transition-colors flex items-center gap-1 font-mono text-[11px]"
                >
                  Raw XML Sitemap <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Regulatory Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#66645F]">
          <p>© {currentYear} Finance Guru. All rights reserved.</p>
          <p className="text-[11px] max-w-2xl leading-normal text-[#66645F]/90">
            Educational Notice: Content published by Finance Guru is created solely for general educational and informational literacy. It does not constitute certified personal financial, legal, tax, or investment advice. Always consult a licensed CFP® or CPA before executing major financial decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
