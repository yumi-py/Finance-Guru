import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';

export function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Finance Guru',
    description: 'Our editorial charter, investment principles, and commitment to independent personal finance analysis.',
    publisher: {
      '@type': 'Organization',
      name: 'Finance Guru',
      url: 'https://ais-pre-qowgo7orkvzlqgbj7a32o3-472407255379.asia-east1.run.app',
    },
  };

  return (
    <>
      <SEOHead
        title="About — Finance Guru"
        description="Our editorial charter, investment principles, and commitment to independent, evidence-based personal finance analysis."
        canonicalPath="/about"
        schema={aboutSchema}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <header className="max-w-[740px] mx-auto pb-12 border-b border-[#D9D7D0]">
          <div className="text-xs uppercase tracking-widest text-[#2E5A44] font-medium mb-4">
            Mission &amp; Methodology
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#171717]">
            An independent journal on wealth and reason.
          </h1>
          <p className="mt-6 text-xl text-[#66645F] leading-relaxed font-sans">
            We publish long-form research, empirical analyses, and thoughtful essays to help readers build durable financial autonomy without panic or speculative hype.
          </p>
        </header>

        <div className="max-w-[740px] mx-auto pt-12 editorial-prose">
          <h2>The Problem with Modern Financial Media</h2>
          <p>
            The mainstream financial web is engineered for velocity and agitation. Algorithms prioritize dramatic market forecasts, speculative asset pumps, and sensational headlines designed to induce fear or euphoria. The underlying business model relies on affiliate commissions from credit card issuers, personal loans, and speculative brokerages.
          </p>
          <p>
            When financial information is monetized through trading volume and consumer debt generation, the consumer’s long-term solvency is compromised.
          </p>

          <h2>Our Foundational Thesis</h2>
          <p>
            Finance Guru was founded on a contrary conviction: durable wealth creation is quiet, mathematically straightforward, and profoundly psychological. It requires neither esoteric algorithms nor constant portfolio intervention.
          </p>
          <p>
            We focus exclusively on first principles:
          </p>
          <ul className="list-disc">
            <li><strong>Solvency Before Yield:</strong> Cash reserves and structural liquidity must always precede risk-asset allocations.</li>
            <li><strong>Broad-Market Indexing:</strong> The mathematical certainty of low-cost compounding beats active speculation over thirty-year horizons.</li>
            <li><strong>Behavioral Immunity:</strong> Managing lifestyle creep, envy, and emotional loss aversion matters far more than forecasting interest rates.</li>
            <li><strong>Radical Transparency:</strong> Total independence from undisclosed commercial sponsors or product placement.</li>
          </ul>

          <blockquote>
            True wealth is not measured in luxury display; it is measured in the unhurried autonomy of your daily hours.
          </blockquote>

          <h2>Our Editorial Standards</h2>
          <p>
            Every essay published on this site undergoes a three-stage verification process:
          </p>
          <ol className="list-decimal">
            <li><strong>Mathematical Verification:</strong> All calculations, expense ratio models, and compound tables are calculated with reproducible Python scripts and cited against peer-reviewed economic literature.</li>
            <li><strong>Historical Grounding:</strong> Claims regarding asset class returns, drawdowns, and market behavior are cross-referenced with long-term databases (including CRSP, FRED, and Kenneth French Data Library).</li>
            <li><strong>Conflict-of-Interest Scrutiny:</strong> Writers do not accept compensation from companies or funds reviewed.</li>
          </ol>

          <h2>Who Writes Finance Guru</h2>
          <p>
            Our essays are authored by experienced chartered financial analysts, behavioral economists, and long-term private practitioners who favor quiet reason over financial punditry.
          </p>
          <p>
            To submit an inquiry, propose an academic collaboration, or report a correction, please visit our{' '}
            <Link to="/contact" className="text-[#2E5A44] underline underline-offset-4 font-medium">
              contact page
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
