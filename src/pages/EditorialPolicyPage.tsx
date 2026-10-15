import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';
import { ShieldCheck, CheckCircle2, FileText, Scale, ExternalLink } from 'lucide-react';

export function EditorialPolicyPage() {
  const editorialSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Finance Guru Editorial Policy & Fact-Checking Protocol',
    description: 'Our four-tier verification protocol, strict independence from sponsors, and regulatory primary source citations.',
    publisher: {
      '@type': 'Organization',
      name: 'Finance Guru',
      url: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app',
    },
  };

  return (
    <>
      <SEOHead
        title="Editorial Policy & Fact-Checking Charter — Finance Guru"
        description="Read the Finance Guru Editorial Policy: our four-tier verification protocol, strict independence from sponsors, and regulatory primary source citations."
        canonicalPath="/editorial-policy/"
        schema={editorialSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-left">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#66645F] flex items-center gap-2">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#171717] font-medium">Editorial Policy</span>
        </nav>

        {/* Header */}
        <header className="max-w-[760px] pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-3 flex items-center gap-1.5">
            <ShieldCheck size={15} /> Trust &amp; Integrity Charter
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            Editorial Policy &amp; Standards
          </h1>
          <p className="mt-5 text-lg text-[#66645F] leading-relaxed">
            Our mission is to provide accurate, transparent, and approachable financial education. Because personal finance decisions impact livelihoods, our publication operates under strict editorial independence.
          </p>
        </header>

        {/* Editorial Standards Body */}
        <div className="max-w-[760px] pt-12 space-y-12 text-[#171717]">
          {/* Pillar 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-medium text-[#171717] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#2E5A44] text-white flex items-center justify-center text-xs font-mono font-bold">1</span>
              Four-Stage Fact-Checking Protocol
            </h2>
            <p className="text-sm sm:text-base text-[#66645F] leading-relaxed">
              Every educational guide published on Finance Guru undergoes a multi-layer verification workflow before publication:
            </p>
            <div className="space-y-3 p-5 bg-white rounded-lg border border-[#D9D7D0]">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 size={16} className="text-[#2E5A44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717]">Primary Source Grounding:</strong> Data, tax rules, and legal frameworks are grounded directly in official regulatory bodies (SEC, FINRA, IRS, CFPB, Federal Reserve, and RBI).
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 size={16} className="text-[#2E5A44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717]">Quantitative Math Verification:</strong> All calculations, expense ratio models, and compounding simulations are mathematically verified with reproducible equations.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 size={16} className="text-[#2E5A44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717]">Peer Editorial Review:</strong> Articles are reviewed by credentialed practitioners (CFAs, CFPs, or economists) to ensure conceptual clarity and practical utility.
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 size={16} className="text-[#2E5A44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717]">Regular Maintenance Audits:</strong> Because interest rates, contribution limits, and tax brackets change annually, our library is continuously reviewed and marked with last-updated dates.
                </div>
              </div>
            </div>
          </section>

          {/* Pillar 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-medium text-[#171717] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#2E5A44] text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
              Strict Commercial Independence
            </h2>
            <p className="text-sm sm:text-base text-[#66645F] leading-relaxed">
              Mainstream financial media is frequently compromised by affiliate bounty commissions from predatory lenders, high-fee brokerages, and speculative trading platforms.
            </p>
            <p className="text-sm sm:text-base text-[#66645F] leading-relaxed">
              Finance Guru maintains a firewall between editorial judgment and commercial influence:
            </p>
            <ul className="list-disc pl-5 text-sm sm:text-base text-[#66645F] space-y-2">
              <li>We never accept payment or incentives to endorse specific funds, stocks, or credit cards.</li>
              <li>We do not promote speculative trading, high-frequency gambling, or unregulated tokens.</li>
              <li>When low-cost index funds are discussed, examples are chosen solely for empirical cost-efficiency (e.g. total market index funds with &lt;0.05% expense ratios).</li>
            </ul>
          </section>

          {/* Pillar 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-medium text-[#171717] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#2E5A44] text-white flex items-center justify-center text-xs font-mono font-bold">3</span>
              Corrections &amp; Feedback Policy
            </h2>
            <p className="text-sm sm:text-base text-[#66645F] leading-relaxed">
              We welcome reader scrutiny and analytical corrections. If you detect a numerical discrepancy, outdated statutory figure, or ambiguous explanation, contact our editorial desk via our{' '}
              <Link to="/contact/" className="text-[#2E5A44] underline font-medium">
                contact page
              </Link>.
              Verified corrections are promptly amended with transparency notes.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
