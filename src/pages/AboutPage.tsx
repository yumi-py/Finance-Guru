import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';
import { AUTHORS } from '../data/authors';
import { ShieldCheck, Award, ArrowRight, BookOpen } from 'lucide-react';

export function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Finance Guru',
    description: 'Our educational charter, investment principles, and commitment to independent, evidence-based financial literacy.',
    publisher: {
      '@type': 'Organization',
      name: 'Finance Guru',
      url: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app',
    },
  };

  return (
    <>
      <SEOHead
        title="About Finance Guru — Editorial Mission & Standards"
        description="Our educational charter, investment principles, and commitment to independent, evidence-based personal finance literacy."
        canonicalPath="/about/"
        schema={aboutSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium">About</span>
        </nav>

        <header className="max-w-[760px] pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-mono font-medium mb-4">
            Mission &amp; Governance
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Empowering Lifelong Financial Independence
          </h1>
          <p className="mt-6 text-xl text-[#66645F] leading-relaxed font-sans">
            Finance Guru was founded to demystify personal finance, budgeting, index investing, and taxes. We provide everyday learners with accessible, reproducible mathematical guidance without commercial sponsorship.
          </p>
        </header>

        <div className="max-w-[760px] pt-12 space-y-12 editorial-prose">
          <section>
            <h2 className="text-2xl font-serif font-medium text-[#171717]">The Problem with Modern Financial Media</h2>
            <p className="text-[#66645F] leading-relaxed">
              Mainstream personal finance websites are predominantly engineered for transaction velocity. Search results are congested with credit card referral lists, predatory debt consolidation lead-forms, and sensational forecasts designed to induce impulsive trading.
            </p>
            <p className="text-[#66645F] leading-relaxed">
              When financial media monetizes consumer borrowing and trading fees, the reader’s long-term solvency takes a back seat. We reject this broken model.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-medium text-[#171717]">Our Foundational Principles</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#66645F]">
              <li><strong>Solvency Before Yield:</strong> An airtight cash reserve in high-yield savings must always precede risk-asset allocations.</li>
              <li><strong>Broad-Market Compounding:</strong> Low-cost, passive index compounding mathematically outperforms speculative active picking over multi-decade horizons.</li>
              <li><strong>Behavioral Immunity:</strong> Emotional composure, resisting lifestyle inflation, and steady automated deposits matter far more than predicting interest rate cycles.</li>
              <li><strong>Radical Transparency:</strong> Absolute independence from secret commercial sponsorships or product placement.</li>
            </ul>
          </section>

          {/* Author Board Section */}
          <section className="pt-6 border-t border-[#D9D7D0]">
            <h2 className="text-2xl font-serif font-medium text-[#171717] mb-6">
              Our Editorial &amp; Analytical Contributors
            </h2>
            <p className="text-[#66645F] leading-relaxed mb-8">
              All guides and calculators on Finance Guru are researched, authored, and reviewed by credentialed practitioners who prioritize mathematical truth:
            </p>

            <div className="space-y-6">
              {Object.values(AUTHORS).map((author) => (
                <div
                  key={author.id}
                  className="p-6 bg-white border border-[#D9D7D0] rounded-lg shadow-xs flex flex-col sm:flex-row items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#2E5A44]/15 text-[#2E5A44] flex items-center justify-center font-serif text-lg font-bold shrink-0">
                    {author.name.charAt(0)}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-lg font-serif font-medium text-[#171717]">
                      <Link to={`/authors/${author.slug}/`} className="hover:text-[#2E5A44] underline underline-offset-2">
                        {author.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#2E5A44] font-medium">{author.role}</p>
                    <p className="text-xs text-[#66645F] leading-relaxed pt-1">{author.bio}</p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#66645F]">
                        {author.credentials[0]}
                      </span>
                      <Link
                        to={`/authors/${author.slug}/`}
                        className="text-xs font-semibold text-[#2E5A44] hover:underline inline-flex items-center gap-1"
                      >
                        Profile &amp; Articles <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Governance Links */}
          <section className="pt-6 border-t border-[#D9D7D0]">
            <h2 className="text-xl font-serif font-medium text-[#171717]">Our Editorial Governance</h2>
            <p className="text-sm text-[#66645F] leading-relaxed">
              Read our complete four-stage fact-checking protocol in our{' '}
              <Link to="/editorial-policy/" className="text-[#2E5A44] underline font-medium">
                Editorial Policy
              </Link>{' '}
              and inspect our regulatory boundaries in the{' '}
              <Link to="/financial-disclaimer/" className="text-[#2E5A44] underline font-medium">
                Financial Education Notice
              </Link>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
